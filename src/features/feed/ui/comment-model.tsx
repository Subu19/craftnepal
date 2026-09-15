import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Trash2, MessageCircle, LogIn } from "lucide-react";
import { useSocket } from "../../../shared/providers/socket-provider";
import { useAuth } from "../../../shared/providers/auth-provider";
import type { Post as PostType, Comment } from "../../../shared/types";
import { useAddComment, useDeleteComment } from "../hooks/use-feed";
import { toast } from "sonner";

// shadcn components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Input } from "@/shared/ui/input";

interface CommentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: PostType;
  currentUserId?: string;
}

const CommentModal: React.FC<CommentModalProps> = ({
  open,
  onOpenChange,
  post,
  currentUserId,
}) => {
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const { socket } = useSocket();
  const { user, login } = useAuth();

  const addCommentMutation = useAddComment();
  const deleteCommentMutation = useDeleteComment();

  // Get post ID (handle both _id and id)
  const postId = post._id || post.id;

  // Listen for comment updates via socket
  useEffect(() => {
    if (socket && postId) {
      const eventName = `updateComments:${postId}`;
      const handleCommentsUpdate = (data: { comments: Comment[] }) => {
        setComments(data.comments);
      };
      socket.on(eventName, handleCommentsUpdate);

      return () => {
        socket.off(eventName, handleCommentsUpdate);
      };
    }
  }, [socket, postId]);

  // Update local comments when post changes
  useEffect(() => {
    setComments(post.comments || []);
  }, [post.comments]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !postId) return;

    addCommentMutation.mutate(
      { postId: postId as string, content: newComment },
      {
        onSuccess: () => {
          setNewComment("");
          toast.success("Comment added");
          if (socket) {
            socket.emit("updateComments", {
              postId,
            });
          }
        },
        onError: () => {
          toast.error("Failed to add comment");
        },
      },
    );
  };

  const handleDeleteComment = (commentId: string) => {
    if (!postId) return;
    deleteCommentMutation.mutate(
      { postId: postId as string, commentId },
      {
        onSuccess: () => {
          toast.success("Comment deleted");
          if (socket) {
            socket.emit("updateComments", {
              postId,
            });
          }
        },
        onError: () => {
          toast.error("Failed to delete comment");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[85vh] flex flex-col p-0 bg-secondary-900/95 border-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-accent-500/10 rounded-lg text-accent-400">
              <MessageCircle size={20} />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-white tracking-tight">
                Comments
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Join the conversation on this adventure
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Separator className="bg-white/5" />

        <ScrollArea className="flex-1 px-6 py-4 overflow-y-auto">
          <div className="space-y-4 pr-3">
            <AnimatePresence initial={false}>
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <motion.div
                    key={comment.id || comment._id || index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex gap-4 group"
                  >
                    <Avatar className="h-9 w-9 border border-white/5 shrink-0">
                      <AvatarImage
                        src={`https://cdn.discordapp.com/avatars/${comment.discordId || comment.author?.id || ""}/${comment.profilePic || comment.author?.profilePic || ""}`}
                        alt={
                          comment.username ||
                          comment.author?.username ||
                          comment.author?.name ||
                          "User"
                        }
                      />
                      <AvatarFallback className="bg-accent-500 text-white font-bold text-xs">
                        {(
                          comment.username ||
                          comment.author?.username ||
                          comment.author?.name ||
                          "U"
                        )
                          .charAt(0)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0 bg-white/[0.03] p-3 rounded-2xl border border-white/5 group-hover:bg-white/[0.05] transition-colors">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-white text-sm">
                            {comment.username ||
                              comment.author?.username ||
                              comment.author?.name ||
                              "Unknown User"}
                          </p>
                          {comment.createdAt && (
                            <span className="text-xs text-gray-500 font-medium">
                              {new Intl.DateTimeFormat('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                              }).format(new Date(comment.createdAt))}
                            </span>
                          )}
                        </div>
                        {currentUserId ===
                          (comment.discordId ||
                            comment.author?.uuid ||
                            comment.author?.id) && (
                          <motion.button
                            whileHover={{ scale: 1.1, color: "#f87171" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              handleDeleteComment(
                                comment._id || comment.id || "",
                              )
                            }
                            className="text-gray-500 transition-colors opacity-0 group-hover:opacity-100"
                            disabled={deleteCommentMutation.isPending}
                          >
                            <Trash2 size={14} />
                          </motion.button>
                        )}
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed break-words">
                        {comment.content || comment.comment}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-600">
                    <MessageCircle size={24} />
                  </div>
                  <p className="text-gray-500 font-medium">
                    No comments yet. Start the discussion!
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        <div className="p-6 bg-white/[0.02] border-t border-white/5">
          {user ? (
            <form onSubmit={handleAddComment} className="relative">
              <Input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="pr-12 bg-secondary-900 border-white/10 text-white placeholder-gray-500 h-11 rounded-xl focus:border-accent-500/50 transition-all"
              />
              <Button
                type="submit"
                disabled={!newComment.trim() || addCommentMutation.isPending}
                size="icon"
                className="absolute right-1 top-1 h-9 w-9 rounded-lg"
              >
                <Send size={18} />
              </Button>
            </form>
          ) : (
            <Button
              onClick={login}
              variant="outline"
              className="w-full h-11 rounded-xl bg-white/5 border-white/10 hover:bg-white/10 text-white font-semibold gap-2"
            >
              <LogIn size={16} />
              Log in with Discord to comment
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal;
