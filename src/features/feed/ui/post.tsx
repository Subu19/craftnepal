import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Trash2,
  Clock,
} from "lucide-react";
import { useSocket } from "../../../shared/providers/socket-provider";
import { timeAgo } from "../../../shared/utils/helpers";
import type { Post as PostType } from "../../../shared/types";
import { useDeletePost } from "../hooks/use-feed";

// shadcn components
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";

interface PostProps {
  post: PostType;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  likedPosts: Set<string>;
  currentUserId?: string;
}

const Post: React.FC<PostProps> = ({
  post,
  onLike,
  onComment,
  likedPosts,
  currentUserId,
}) => {
  const [localPost, setLocalPost] = useState(post);
  const { socket } = useSocket();
  const deletePostMutation = useDeletePost();

  // Get post ID (handle both _id and id)
  const postId = post._id || post.id;

  // Listen for post updates via socket
  useEffect(() => {
    if (socket && postId) {
      const eventName = `updatePost:${postId}`;
      socket.on(eventName, (data: { post: PostType }) => {
        setLocalPost(data.post);
      });

      return () => {
        socket.off(eventName);
      };
    }
  }, [socket, postId]);

  const handleDelete = () => {
    if (postId) {
      deletePostMutation.mutate(postId as string);
    }
  };

  const isAuthor =
    currentUserId === post.author.uuid || currentUserId === post.author.id;

  // Get likes count (handle both formats)
  const likesCount = Array.isArray(localPost.likes)
    ? (localPost.likes as any[]).length
    : (localPost.likes as number) || 0;

  // Get content (handle both caption and content)
  const content = localPost.content || localPost.caption || "";

  // Get image (handle both image and postImage)
  const image = localPost.image || localPost.postImage;

  // Get timestamp for display
  const getPostTime = (): string => {
    if (localPost.createdAt) {
      return timeAgo(localPost.createdAt);
    }
    if (typeof post.id === "number") {
      return timeAgo(new Date(post.id));
    }
    return "just now";
  };

  // Check if current user has liked this post
  const isLiked = likedPosts.has(postId as string);

  const handleLikeClick = () => {
    if (!postId) return;
    onLike(postId as string);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="bg-white/5 border-white/5 gap-0 overflow-hidden hover:border-white/10 transition-all duration-500 group rounded-2xl">
        {/* Post Header */}
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border border-white/10 group-hover:border-accent-500/30 transition-colors">
                <AvatarImage
                  src={`https://cdn.discordapp.com/avatars/${post.author.id}/${post.author.profilePic}`}
                  alt={post.author.username || post.author.name}
                />
                <AvatarFallback className="bg-accent-500 text-white font-bold">
                  {(post.author.username || post.author.name)
                    .charAt(0)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h3
                  className="font-bold text-white text-base sm:text-lg truncate tracking-tight"
                  style={{ fontFamily: "'Geist Variable', sans-serif" }}
                >
                  {post.author.username || post.author.name}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-500 text-xs sm:text-sm font-medium">
                  <Clock size={12} className="text-gray-500" />
                  <span>{getPostTime()}</span>
                </div>
              </div>
            </div>

            {isAuthor && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-white hover:bg-white/10 rounded-full"
                  >
                    <MoreHorizontal size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-primary-900 border-white/10 backdrop-blur-md"
                >
                  <DropdownMenuItem
                    className="text-red-400 hover:bg-red-400 cursor-pointer flex items-center gap-2"
                    onClick={handleDelete}
                    disabled={deletePostMutation.isPending}
                  >
                    <Trash2 size={16} />
                    <span>Delete Post</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Post Content */}
          <p className="text-gray-300 mb-6 leading-relaxed whitespace-pre-wrap text-[15px] px-6">
            {content}
          </p>

          {/* Post Image */}
          <AnimatePresence>
            {image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative overflow-hidden border border-white/5 bg-primary-900/20"
              >
                <img
                  src={image}
                  alt="Post content"
                  className="w-full object-cover max-h-[500px] hover:scale-[1.01] transition-transform duration-700 cursor-zoom-in"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <CardFooter className="px-6 py-4 flex justify-between items-center  bg-white/[0.02] border-t border-white/5">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLikeClick}
              className={`flex items-center gap-2 px-4 py-2 h-10 rounded-xl transition-all duration-300 ${isLiked
                ? "text-accent-400 bg-accent-400/10 hover:bg-accent-400/20"
                : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
            >
              <motion.div
                animate={
                  isLiked
                    ? { scale: [1, 1.4, 1], rotate: [0, -15, 15, 0] }
                    : undefined
                }
                transition={{ duration: 0.4 }}
              >
                <Heart
                  size={18}
                  strokeWidth={2.5}
                  className={isLiked ? "fill-accent-400" : ""}
                />
              </motion.div>
              <span className="text-sm font-semibold">{likesCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => postId && onComment(postId as string)}
              className="flex items-center gap-2 px-4 py-2 h-10 text-gray-400 hover:text-white hover:bg-white/10 transition-all rounded-xl"
            >
              <MessageCircle size={18} strokeWidth={2.5} />
              <span className="text-sm font-semibold">
                {(localPost.comments || []).length}
              </span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 px-4 py-2 h-10 text-gray-500 hover:text-white hover:bg-white/10 transition-all rounded-xl"
          >
            <Share2 size={18} strokeWidth={2.5} />
            <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
              Share
            </span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default Post;
