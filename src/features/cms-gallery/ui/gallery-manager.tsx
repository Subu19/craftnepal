import React, { useState } from 'react';
import { useGallery } from '../../gallery/api/use-gallery';
import { useCmsGallery } from '../api/use-cms-gallery';
import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Skeleton,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../shared/ui';
import { Trash2, Image as ImageIcon, Loader2, UploadCloud, Folder } from 'lucide-react';

export const GalleryManager = () => {
  const { data: gallery, isLoading } = useGallery();
  const { addPhotos, isAdding, deletePhoto, isDeleting } = useCmsGallery();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentSeason, setCurrentSeason] = useState<string>('');

  const handleAddPhotos = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFiles || !currentSeason) return;

    try {
      await addPhotos({ 
        season: currentSeason, 
        photos: Array.from(selectedFiles) 
      });
      setIsAddDialogOpen(false);
      setSelectedFiles(null);
    } catch (err) {
      // Error handled by hook toast
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-6">
        <Skeleton className="h-[300px] w-full rounded-2xl bg-white/5" />
        <Skeleton className="h-[300px] w-full rounded-2xl bg-white/5" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
        <div className="text-gray-400">
          <span className="text-white font-bold">{gallery?.reduce((acc, curr) => acc + curr.photos.length, 0) || 0}</span> Total Photos Uploaded
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 shadow-lg shadow-accent-500/20">
              <UploadCloud size={16} /> Upload Photos
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0b1a1f] border-white/10 text-white sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Upload Photos</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddPhotos} className="space-y-6 py-4">
              <div className="space-y-3">
                <Label htmlFor="season" className="text-gray-300">Select Season</Label>
                <Select value={currentSeason} onValueChange={setCurrentSeason} required>
                  <SelectTrigger id="season" className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Choose a season" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0b1a1f] border-white/10 text-white">
                    {gallery?.map(s => (
                      <SelectItem key={s.title} value={s.title} className="focus:bg-white/10 focus:text-white">
                        {s.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="photos" className="text-gray-300">Choose Images</Label>
                <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer relative">
                  <Input 
                    id="photos" 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={(e) => setSelectedFiles(e.target.files)}
                    required
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <ImageIcon className="mx-auto h-10 w-10 text-accent-500 mb-3" />
                  <p className="text-sm text-gray-300 font-medium">Click to browse or drag & drop</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedFiles ? `${selectedFiles.length} files selected` : "PNG, JPG, WEBP up to 10MB"}
                  </p>
                </div>
              </div>
              
              <Button type="submit" className="w-full h-12 text-base" disabled={isAdding}>
                {isAdding ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Uploading...</> : 'Confirm Upload'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-8">
        {gallery?.map((season) => (
          <Card key={season.title} className="p-0 gap-0 border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="bg-accent-500/20 p-2 rounded-lg">
                  <Folder className="text-accent-400 h-5 w-5" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight text-white">{season.title}</CardTitle>
              </div>
              <div className="px-3 py-1 rounded-full bg-white/10 text-sm font-medium text-gray-300 border border-white/5">
                {season.photos.length} photos
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {season.photos.map((photo) => (
                  <div key={photo.key} className="relative group/item aspect-square rounded-xl overflow-hidden border border-white/10 shadow-lg">
                    <img 
                      src={photo.url} 
                      alt={photo.name} 
                      className="object-cover w-full h-full transition-transform duration-500 group-hover/item:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="w-full backdrop-blur-md bg-red-500/80 hover:bg-red-500"
                        onClick={() => deletePhoto({ season: season.title, photoKey: photo.key })}
                        disabled={isDeleting}
                      >
                        <Trash2 size={14} className="mr-2" /> Delete
                      </Button>
                    </div>
                  </div>
                ))}
                {season.photos.length === 0 && (
                  <div className="col-span-full py-16 text-center border-2 border-dashed border-white/10 rounded-xl text-muted-foreground bg-white/5">
                    <ImageIcon className="mx-auto h-12 w-12 opacity-20 mb-3" />
                    <p className="text-lg text-gray-400">No photos in {season.title} yet.</p>
                    <p className="text-sm text-gray-500 mt-1">Upload some to see them here.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {gallery?.length === 0 && (
          <div className="py-24 text-center border-2 border-dashed border-white/10 rounded-2xl bg-black/40 backdrop-blur-xl">
             <Folder className="mx-auto h-16 w-16 opacity-20 mb-4 text-white" />
             <h3 className="text-2xl font-bold text-gray-300">No Seasons Found</h3>
             <p className="text-gray-500 max-w-sm mx-auto mt-2">
               The gallery structure is empty. Make sure seasons are created in the backend.
             </p>
          </div>
        )}
      </div>
    </div>
  );
};
