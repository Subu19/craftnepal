import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useFeed, useLikePost, useUnlikePost } from "@/features/feed/hooks/use-feed";
import type { Post as PostType } from "@/shared/types";
import { useAuth } from "@/shared/providers/auth-provider";
import { useSocket } from "@/shared/providers/socket-provider";
import { Button } from "@/shared/ui/button";
import PostCreationForm from "@/features/feed/ui/post-creation-form";
import FeedSkeleton from "@/features/feed/ui/feed-skeleton";
import Post from "@/features/feed/ui/post";
import CommentModal from "@/features/feed/ui/comment-model";
import { FeedSidebar, FeedEmptyState } from "./ui";
import { queryClient } from "@/shared/config/queryClient";
import { toast } from "sonner";

const Feed = () => {
  const [limit, setLimit] = useState(20);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const { user } = useAuth();
  const { socket } = useSocket();

  const { data: feedData, isLoading, isFetching } = useFeed(1, limit);
  const likePostMutation = useLikePost();
  const unlikePostMutation = useUnlikePost();

  const currentUserId = user?.id;

  // Convert API response to array
  const posts = Array.isArray(feedData?.data) ? feedData.data : [];

  // Initialize likedPosts from feed data
  const [hasInitializedLikes, setHasInitializedLikes] = useState(false);
  useEffect(() => {
    if (posts.length > 0 && currentUserId && !hasInitializedLikes) {
      setLikedPosts((prev) => {
        const newSet = new Set(prev);
        posts.forEach((post) => {
          const pid = post._id || post.id;
          const isInitiallyLiked =
            Array.isArray(post.likes) &&
            post.likes.some(
              (l: any) => l.userId === currentUserId || l.id === currentUserId,
            );
          if (isInitiallyLiked) {
            newSet.add(pid as string);
          }
        });
        return newSet;
      });
      setHasInitializedLikes(true);
    }
  }, [posts, currentUserId, hasInitializedLikes]);

  // Re-sync liked state when feed data changes (after refetch)
  useEffect(() => {
    if (posts.length > 0 && currentUserId && hasInitializedLikes) {
      setLikedPosts(() => {
        const newSet = new Set<string>();
        posts.forEach((post) => {
          const pid = post._id || post.id;
          const isLiked =
            Array.isArray(post.likes) &&
            post.likes.some(
              (l: any) => l.userId === currentUserId || l.id === currentUserId,
            );
          if (isLiked) {
            newSet.add(pid as string);
          }
        });
        return newSet;
      });
    }
  }, [feedData]);

  // Listen for real-time events via socket
  useEffect(() => {
    if (!socket) return;

    const handleNewPost = () => {
      // Force refetch feed when a new post is created by anyone
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.refetchQueries({ queryKey: ['feed'] });
    };

    const handlePostDeleted = () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.refetchQueries({ queryKey: ['feed'] });
    };

    socket.on("newPost", handleNewPost);
    socket.on("postDeleted", handlePostDeleted);

    return () => {
      socket.off("newPost", handleNewPost);
      socket.off("postDeleted", handlePostDeleted);
    };
  }, [socket]);

  const handleLikePost = useCallback((postId: string) => {
    // Auth guard — must be logged in to like
    if (!currentUserId) {
      toast.error("Please log in to like posts");
      return;
    }

    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
      unlikePostMutation.mutate(postId, {
        onError: () => {
          // Revert on error
          setLikedPosts((prev) => new Set(prev).add(postId));
          toast.error("Failed to unlike post");
        },
      });
    } else {
      newLiked.add(postId);
      likePostMutation.mutate(postId, {
        onError: () => {
          // Revert on error
          setLikedPosts((prev) => {
            const reverted = new Set(prev);
            reverted.delete(postId);
            return reverted;
          });
          toast.error("Failed to like post");
        },
      });
    }
    setLikedPosts(newLiked);
  }, [currentUserId, likedPosts, likePostMutation, unlikePostMutation]);

  const handleCommentClick = (postId: string) => {
    if (!currentUserId) {
      toast.error("Please log in to comment");
      return;
    }
    const post = posts.find((p) => (p._id || p.id) === postId);
    if (post) {
      setSelectedPost(post);
      setCommentModalOpen(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 pt-32 px-6">
      {/* ── MAIN CONTENT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Feed Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Create Post Form */}
          <PostCreationForm
            onSuccess={() => {
              // Force immediate refetch
              queryClient.invalidateQueries({ queryKey: ['feed'] });
              queryClient.refetchQueries({ queryKey: ['feed'] });
              toast.success("Post created successfully!");
            }}
          />

          {/* Posts List */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <FeedSkeleton count={3} />
              ) : posts && posts.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {posts.map((post: PostType) => (
                    <Post
                      key={post._id || post.id}
                      post={post}
                      onLike={handleLikePost}
                      onComment={handleCommentClick}
                      likedPosts={likedPosts}
                      currentUserId={currentUserId}
                    />
                  ))}
                </motion.div>
              ) : (
                <FeedEmptyState />
              )}
            </AnimatePresence>

            {/* Loading indicator for pagination */}
            {isFetching && !isLoading && (
              <div className="flex justify-center py-12">
                <div className="h-10 w-10 border-4 border-accent-500/30 border-t-accent-500 rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Load More Button */}
          {posts && posts.length >= limit && !isFetching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center pt-4"
            >
              <Button
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white px-10 rounded-xl h-14 font-semibold transition-all duration-300"
                onClick={() => setLimit(limit + 20)}
              >
                Load More Adventures
              </Button>
            </motion.div>
          )}
        </div>

        {/* Sidebar Column */}
        <FeedSidebar />
      </div>

      {/* Comment Modal */}
      {selectedPost && (
        <CommentModal
          open={commentModalOpen}
          onOpenChange={setCommentModalOpen}
          post={selectedPost}
          currentUserId={currentUserId}
        />
      )}
    </div>
  );
};

export default Feed;
