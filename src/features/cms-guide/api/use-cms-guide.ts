import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../shared/api/client';
import { toast } from 'sonner';
export const useCmsGuide = () => {
  const queryClient = useQueryClient();

  const { data: guides, isLoading } = useQuery({
    queryKey: ['guides-all'],
    queryFn: async () => {
      const response = await api.get<{ data: any[] }>('/guides');
      return response.data.data;
    },
  });

  const saveGuideMutation = useMutation({
    mutationFn: async ({ 
      id, 
      header, 
      data, 
      image, 
      icon, 
      removeImage, 
      removeIcon 
    }: { 
      id: string; 
      header: string; 
      data: any[]; 
      image?: File; 
      icon?: File;
      removeImage?: boolean;
      removeIcon?: boolean;
    }) => {
      const formData = new FormData();
      formData.append('header', header);
      formData.append('data', JSON.stringify(data));
      if (image) {
        formData.append('image', image);
      }
      if (icon) {
        formData.append('icon', icon);
      }
      if (removeImage) {
        formData.append('removeImage', 'true');
      }
      if (removeIcon) {
        formData.append('removeIcon', 'true');
      }

      const response = await api.post(`/guide/${encodeURIComponent(id)}`, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guides-all'] });
      queryClient.invalidateQueries({ queryKey: ['guides'] });
      toast.success('Guide saved successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to save guide');
    },
  });

  const deleteGuideMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/guide/${encodeURIComponent(id)}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guides-all'] });
      queryClient.invalidateQueries({ queryKey: ['guides'] });
      toast.success('Guide deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete guide');
    },
  });

  return {
    guides,
    isLoading,
    saveGuide: saveGuideMutation.mutateAsync,
    isSaving: saveGuideMutation.isPending,
    deleteGuide: deleteGuideMutation.mutateAsync,
    isDeleting: deleteGuideMutation.isPending,
  };
};
