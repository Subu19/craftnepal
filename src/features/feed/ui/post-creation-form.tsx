import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, X, Send } from "lucide-react";
import { useCreatePost } from "../hooks/use-feed";
import { useAuth } from "../../../shared/providers/auth-provider";

// shadcn components
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

interface PostCreationFormProps {
  onSuccess?: () => void;
}

const PostCreationForm: React.FC<PostCreationFormProps> = ({ onSuccess }) => {
  const { user, login } = useAuth();
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const createPostMutation = useCreatePost();

  if (!user) {
    return (
      <Card className="bg-white/5 border-white/5 overflow-hidden rounded-2xl">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-accent-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent-400">
            <Send size={32} />
          </div>
          <h3
            className="text-xl font-bold text-white mb-2"
            style={{ fontFamily: "'Geist Variable', sans-serif" }}
          >
            Join the Community
          </h3>
          <p className="text-gray-400 mb-6 max-w-xs mx-auto text-sm">
            Log in with Discord to share your adventures and moments with other
            players.
          </p>
          <Button
            onClick={login}
            className="px-8 rounded-xl font-bold h-11 bg-accent-500 hover:bg-accent-600 text-white"
          >
            Login with Discord
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    if (!content.trim()) return;

    const formData = new FormData();
    formData.append("caption", content);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    createPostMutation.mutate(formData as any, {
      onSuccess: () => {
        setContent("");
        setSelectedImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        onSuccess?.();
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="bg-white/5 border-white/5 overflow-hidden shadow-xl rounded-2xl hover:border-white/10 transition-all">
        <CardContent className="p-4 sm:p-6 pb-2">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border border-white/10">
              <AvatarImage
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
                alt={user.username}
              />
              <AvatarFallback className="bg-accent-500 text-white font-bold">
                {user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind, adventurer?"
                className="min-h-[100px] bg-primary-900/30 border-white/5 text-white placeholder-gray-500 focus:border-accent-500/30 resize-none transition-all rounded-xl p-4 text-[15px]"
              />
            </div>
          </div>

          {/* Image Preview */}
          <AnimatePresence>
            {imagePreview && (
              <motion.div
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                className="mt-4 relative group"
              >
                <div className="relative rounded-xl overflow-hidden border border-white/5">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-h-[300px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-lg bg-black/50 border-white/10 hover:bg-red-500/80 hover:text-white"
                >
                  <X size={16} />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <CardFooter className="px-6 py-4 flex justify-between items-center bg-white/[0.02] border-t border-white/5 rounded-b-2xl mt-2">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-400 hover:text-white hover:bg-white/10 rounded-xl h-10 w-10 transition-all"
              title="Add Image"
            >
              <ImageIcon size={20} />
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>

          <Button
            disabled={!content.trim() || createPostMutation.isPending}
            onClick={handleSubmit}
            className="px-6 rounded-xl font-bold h-10 shadow-lg shadow-accent-500/20 flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white transition-all duration-300"
          >
            {createPostMutation.isPending ? (
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send size={16} />
            )}
            <span className="uppercase tracking-wider text-[11px] font-black">
              Post
            </span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PostCreationForm;
