import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../shared/api/client';
import { toast } from 'sonner';

export const useCmsGallery = () => {
  const queryClient = useQueryClient();

  const addPhotosMutation = useMutation({
    mutationFn: async ({ season, photos }: { season: string; photos: File[] }) => {
      const formData = new FormData();
      photos.forEach((photo) => formData.append('photos', photo));
      const response = await api.post(`/add/gallery/${season}`, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      toast.success('Photos added successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add photos');
    },
  });

  const deletePhotoMutation = useMutation({
    mutationFn: async ({ season, photoKey }: { season: string; photoKey: string }) => {
      // The API expects the photo parameter to be the key or URL
      // According to backend: apiRouter.post("/delete/gallery/:season/:photo", verify, handleGalleryDelete);
      // We need to encode the key if it contains slashes
      const encodedKey = encodeURIComponent(photoKey);
      const response = await api.post(`/delete/gallery/${season}/${encodedKey}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      toast.success('Photo deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete photo');
    },
  });

  return {
    addPhotos: addPhotosMutation.mutateAsync,
    isAdding: addPhotosMutation.isPending,
    deletePhoto: deletePhotoMutation.mutateAsync,
    isDeleting: deletePhotoMutation.isPending,
  };
};
