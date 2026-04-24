import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../shared/api/client';
import { toast } from 'sonner';

export const useCmsGallery = () => {
  const queryClient = useQueryClient();

  const addPhotosMutation = useMutation({
    mutationFn: async ({ season, photos }: { season: string; photos: File[] }) => {
      const formData = new FormData();
      photos.forEach((photo) => formData.append('photos', photo));
      const response = await api.post(`/add/gallery/${encodeURIComponent(season)}`, formData);
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
      const response = await api.post(`/delete/gallery/${encodeURIComponent(season)}/${encodedKey}`);
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

  const createSeasonMutation = useMutation({
    mutationFn: async ({ season, cover }: { season: string; cover: File | null }) => {
      const formData = new FormData();
      formData.append('season', season);
      if (cover) {
        formData.append('cover', cover);
      }
      const response = await api.post('/gallery/season', formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      toast.success('Season created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create season');
    },
  });

  const deleteSeasonMutation = useMutation({
    mutationFn: async (season: string) => {
      const response = await api.delete(`/gallery/season/${encodeURIComponent(season)}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      toast.success('Season deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete season');
    },
  });

  const updateSeasonMutation = useMutation({
    mutationFn: async ({ oldSeason, newSeason, cover }: { oldSeason: string; newSeason?: string; cover?: File | null }) => {
      const formData = new FormData();
      if (newSeason) formData.append('season', newSeason);
      if (cover) formData.append('cover', cover);
      const response = await api.patch(`/gallery/season/${encodeURIComponent(oldSeason)}`, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      toast.success('Season updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update season');
    },
  });

  return {
    addPhotos: addPhotosMutation.mutateAsync,
    isAdding: addPhotosMutation.isPending,
    deletePhoto: deletePhotoMutation.mutateAsync,
    isDeleting: deletePhotoMutation.isPending,
    createSeason: createSeasonMutation.mutateAsync,
    isCreatingSeason: createSeasonMutation.isPending,
    deleteSeason: deleteSeasonMutation.mutateAsync,
    isDeletingSeason: deleteSeasonMutation.isPending,
    updateSeason: updateSeasonMutation.mutateAsync,
    isUpdatingSeason: updateSeasonMutation.isPending,
  };
};
