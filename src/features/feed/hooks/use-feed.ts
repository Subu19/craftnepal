import { useQuery, useMutation } from '@tanstack/react-query';
import type { UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { api } from '../../../shared/api/client';
import type { Post, PaginatedResponse } from '../../../shared/types';
import { queryClient } from '../../../shared/config/queryClient';

// Using legacy API endpoints: feed/{limit}
export const useFeed = (page = 1, limit = 20): UseQueryResult<PaginatedResponse<Post>, Error> => {
  return useQuery({
    queryKey: ['feed', page, limit],
    queryFn: async () => {
      const { data } = await api.get<PaginatedResponse<Post>>(`/feed/${limit}`);
      return data;
    },
    staleTime: 30000, // 30 seconds
  });
};

export const usePost = (postId: string): UseQueryResult<Post, Error> => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const { data } = await api.get<Post>(`/post/${postId}`);
      return data;
    },
    enabled: !!postId,
  });
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (content: FormData | { content: string; image?: string }) => {
      if (content instanceof FormData) {
        return api.post('/post', content, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      return api.post('/post', content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};

export const useLikePost = (): UseMutationResult<any, Error, string> => {
  return useMutation({
    mutationFn: (postId: string) =>
      api.post('/post/like', { postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};

export const useUnlikePost = (): UseMutationResult<any, Error, string> => {
  return useMutation({
    mutationFn: (postId: string) =>
      api.post('/post/unlike', { postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};

export const useDeletePost = (): UseMutationResult<any, Error, string> => {
  return useMutation({
    mutationFn: (postId: string) =>
      api.post(`/post/delete/${postId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};

export const useAddComment = () => {
  return useMutation({
    mutationFn: ({
      postId,
      content,
    }: {
      postId: string;
      content: string;
    }) =>
      api.post('/post/comment', { postId, comment: content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: ({
      postId,
      commentId,
    }: {
      postId: string;
      commentId: string;
    }) =>
      api.post(`/post/delete/${postId}/${commentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};

export const useLikeComment = () => {
  return useMutation({
    mutationFn: ({
      postId,
      commentId,
    }: {
      postId: string;
      commentId: string;
    }) =>
      api.post(`/post/like/${postId}/${commentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};
