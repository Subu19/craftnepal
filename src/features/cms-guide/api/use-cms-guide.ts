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
    mutationFn: async ({ id, header, data, image }: { id: string; header: string; data: any[]; image?: File }) => {
      const formData = new FormData();
      formData.append('header', header);
      formData.append('data', JSON.stringify(data));
      if (image) {
        formData.append('image', image);
      }

      const response = await api.post(`/guide/${id}`, formData);
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

  return {
    guides,
    isLoading,
    saveGuide: saveGuideMutation.mutateAsync,
    isSaving: saveGuideMutation.isPending,
  };
};
