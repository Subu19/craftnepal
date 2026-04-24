import React, { useState, useEffect, useRef } from 'react';
import { useCmsGuide } from '../api/use-cms-guide';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../shared/ui';
import { Plus, Trash2, Loader2, Save, FileImage } from 'lucide-react';
import type { GuideSection, GuideItem } from '@/shared/types';
import MDEditor from '@uiw/react-md-editor';
import { MarkdownContent } from '@/shared/ui/components/markdown-content';

export const GuideManager = () => {
  const { guides, isLoading, saveGuide, isSaving, deleteGuide, isDeleting } = useCmsGuide();
  const [selectedGuideId, setSelectedGuideId] = useState<string>('');
  const [editingGuide, setEditingGuide] = useState<Partial<GuideSection> | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  // File removal state
  const [removeImage, setRemoveImage] = useState(false);
  const [removeIcon, setRemoveIcon] = useState(false);

  // File input refs for resetting
  const imageInputRef = useRef<HTMLInputElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);

  // Deletion state
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState('');

  // Set initial guide
  useEffect(() => {
    if (guides && guides.length > 0 && !selectedGuideId) {
      setSelectedGuideId(guides[0].id);
    }
  }, [guides, selectedGuideId]);

  // Update editing guide when selection changes
  useEffect(() => {
    if (selectedGuideId && guides) {
      const guide = guides.find((g) => g.id === selectedGuideId);
      if (guide) {
        setEditingGuide({ ...guide });
      } else if (selectedGuideId === 'new') {
        setEditingGuide({
          id: '',
          header: '',
          data: [{ title: '', text: '' }],
        });
      }
      setSelectedImage(null);
      setImagePreview(null);
      setSelectedIcon(null);
      setIconPreview(null);
      setRemoveImage(false);
      setRemoveIcon(false);
      
      // Reset file inputs
      if (imageInputRef.current) imageInputRef.current.value = '';
      if (iconInputRef.current) iconInputRef.current.value = '';
    }
  }, [selectedGuideId, guides]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedIcon(file);
      setIconPreview(URL.createObjectURL(file));
    } else {
      setSelectedIcon(null);
      setIconPreview(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGuide || !editingGuide.id || !editingGuide.header) return;

    try {
      await saveGuide({
        id: editingGuide.id,
        header: editingGuide.header,
        data: editingGuide.data || [],
        image: selectedImage || undefined,
        icon: selectedIcon || undefined,
        removeImage,
        removeIcon,
      });
      
      // Reset removal flags after save
      setRemoveImage(false);
      setRemoveIcon(false);
      // Error is handled by hook
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleDelete = async () => {
    if (!selectedGuideId || selectedGuideId === 'new' || deleteConfirmInput !== selectedGuideId) return;

    try {
      await deleteGuide(selectedGuideId);
      setIsDeleteConfirmOpen(false);
      setDeleteConfirmInput('');
      setSelectedGuideId(guides?.[0]?.id || '');
    } catch (err) { }
  };

  const addDataItem = () => {
    if (!editingGuide) return;
    const newData = [...(editingGuide.data || []), { title: '', text: '' }];
    setEditingGuide({ ...editingGuide, data: newData });
  };

  const removeDataItem = (index: number) => {
    if (!editingGuide || !editingGuide.data) return;
    const newData = editingGuide.data.filter((_, i) => i !== index);
    setEditingGuide({ ...editingGuide, data: newData });
  };

  const updateDataItem = (index: number, field: keyof GuideItem, value: string) => {
    if (!editingGuide || !editingGuide.data) return;
    const newData = [...editingGuide.data];
    newData[index] = { ...newData[index], [field]: value };
    setEditingGuide({ ...editingGuide, data: newData });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Guide Management</h2>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Select value={selectedGuideId} onValueChange={setSelectedGuideId}>
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="Select a Guide" />
            </SelectTrigger>
            <SelectContent>
              {guides?.map((guide) => (
                <SelectItem key={guide.id} value={guide.id}>
                  {guide.id}
                </SelectItem>
              ))}
              <SelectItem value="new" className="text-accent-500 font-medium">
                + Create New Guide
              </SelectItem>
            </SelectContent>
          </Select>

          {selectedGuideId && selectedGuideId !== 'new' && (
            <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 size={18} />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0b1a1f] border-red-500/20 text-white sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-red-500">Delete Guide?</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-200">
                    Are you sure you want to delete <span className="font-bold text-white uppercase">"{selectedGuideId}"</span>? This action can be undone by an admin in the database, but it will be hidden from everyone else.
                  </div>

                  <div className="space-y-3">
                    <Label className="text-gray-300 text-sm">
                      Please type <span className="text-white font-bold">{selectedGuideId}</span> to confirm:
                    </Label>
                    <Input
                      placeholder="Enter guide ID"
                      value={deleteConfirmInput}
                      onChange={(e) => setDeleteConfirmInput(e.target.value)}
                      className="bg-white/5 border-white/10 text-white focus:border-red-500/50"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 bg-white/5 border-white/10" onClick={() => setIsDeleteConfirmOpen(false)}>Cancel</Button>
                    <Button
                      variant="destructive"
                      className="flex-1 bg-red-600 hover:bg-red-700"
                      disabled={deleteConfirmInput !== selectedGuideId || isDeleting}
                      onClick={handleDelete}
                    >
                      {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete Guide'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {!editingGuide ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-24 text-center">
            <FileImage className="h-12 w-12 text-muted-foreground opacity-20 mb-4" />
            <h3 className="text-xl font-bold text-gray-300">No Guide Selected</h3>
            <p className="text-gray-500 max-w-sm mt-2">
              Select a guide from the dropdown above to start editing, or create a new one.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          {/* EDITOR COLUMN */}
          <Card className="p-0 gap-0 border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
            <form onSubmit={handleSave}>
              <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 p-6 bg-white/5">
                <CardTitle className="text-xl">Editor</CardTitle>
                <Button type="submit" disabled={isSaving} size="sm">
                  {isSaving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Changes
                </Button>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guide-id">Guide ID (Unique Name)</Label>
                    <Input
                      id="guide-id"
                      value={editingGuide.id || ''}
                      onChange={(e) => setEditingGuide({ ...editingGuide, id: e.target.value })}
                      placeholder="e.g. Commands"
                      disabled={selectedGuideId !== 'new'}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="guide-image">Cover Image (Optional)</Label>
                      {(selectedImage || (editingGuide.image && !removeImage)) && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-xs text-red-400 hover:text-red-500 hover:bg-red-500/10"
                          onClick={() => {
                            if (selectedImage) {
                              setSelectedImage(null);
                              setImagePreview(null);
                              if (imageInputRef.current) imageInputRef.current.value = '';
                            } else {
                              setRemoveImage(true);
                            }
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <Input
                      id="guide-image"
                      type="file"
                      accept="image/*"
                      ref={imageInputRef}
                      onChange={handleImageChange}
                      className="cursor-pointer file:text-accent-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="guide-icon">Icon (Optional)</Label>
                      {(selectedIcon || (editingGuide.icon && !removeIcon)) && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-xs text-red-400 hover:text-red-500 hover:bg-red-500/10"
                          onClick={() => {
                            if (selectedIcon) {
                              setSelectedIcon(null);
                              setIconPreview(null);
                              if (iconInputRef.current) iconInputRef.current.value = '';
                            } else {
                              setRemoveIcon(true);
                            }
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <Input
                      id="guide-icon"
                      type="file"
                      accept="image/*"
                      ref={iconInputRef}
                      onChange={handleIconChange}
                      className="cursor-pointer file:text-accent-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Main Header (Intro Text)</Label>
                  <div data-color-mode="dark">
                    <MDEditor
                      value={editingGuide.header || ''}
                      onChange={(val) => setEditingGuide({ ...editingGuide, header: val || '' })}
                      preview="edit"
                      height={200}
                      className="bg-black/20 border-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-6">
                    <Label className="text-lg font-bold">Dropdown Items</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addDataItem}>
                      <Plus size={14} className="mr-2" /> Add Item
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {editingGuide.data?.map((item, index) => (
                      <div key={index} className="relative p-4 rounded-xl border border-white/10 bg-white/5 space-y-4">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-4 right-4 h-8 w-8 opacity-50 hover:opacity-100"
                          onClick={() => removeDataItem(index)}
                        >
                          <Trash2 size={14} />
                        </Button>

                        <div className="space-y-2 pr-12">
                          <Label>Title</Label>
                          <Input
                            value={item.title}
                            onChange={(e) => updateDataItem(index, 'title', e.target.value)}
                            placeholder="Dropdown Title"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Content (Markdown)</Label>
                          <div data-color-mode="dark">
                            <MDEditor
                              value={item.text}
                              onChange={(val) => updateDataItem(index, 'text', val || '')}
                              preview="edit"
                              height={150}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {editingGuide.data?.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4 italic">
                        No dropdown items added. Click "Add Item" above.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </form>
          </Card>

          {/* PREVIEW COLUMN */}
          <div className="xl:sticky top-6">
            <Card className="p-0 gap-0 border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
              <CardHeader className="border-b border-white/5 p-6 bg-white/5">
                <CardTitle className="text-xl flex items-center justify-between">
                  <span>Live Preview</span>
                  <div className="flex items-center gap-2">
                    {(iconPreview || (editingGuide.icon && !removeIcon)) ? (
                      <img
                        src={iconPreview || editingGuide.icon || ''}
                        alt="Icon"
                        className="w-6 h-6 object-contain"
                      />
                    ) : null}
                    <span className="text-xs font-normal text-muted-foreground bg-black/40 px-2 py-1 rounded-md">
                      Read-only
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>

              {/* This mimics the frontend guides-content.tsx layout styling */}
              <CardContent className="p-0 overflow-y-auto max-h-[calc(100vh-12rem)] custom-scrollbar">
                {/* Simulated frontend background/container */}
                <div className="bg-[#0b1a1f] p-6 sm:p-8 min-h-full">
                  <div className="bg-white/5 backdrop-blur-xl rounded-[32px] border border-white/5 p-6 sm:p-8">

                    {/* Header Preview */}
                    {(editingGuide.header || imagePreview || (editingGuide.image && !removeImage)) && (
                      <div className="mb-8 space-y-6">
                        {editingGuide.header && (
                          <MarkdownContent content={editingGuide.header} />
                        )}

                        {(imagePreview || (editingGuide.image && !removeImage)) && (
                          <img
                            src={imagePreview || editingGuide.image || ''}
                            alt="Cover"
                            className="rounded-xl border border-white/10 max-w-full h-auto shadow-lg"
                          />
                        )}
                      </div>
                    )}

                    {/* Dropdowns Preview */}
                    {editingGuide.data && editingGuide.data.length > 0 && (
                      <Accordion type="single" collapsible className="w-full space-y-4">
                        {editingGuide.data.map((item, i) => (
                          <AccordionItem
                            key={i}
                            value={`preview-${i}`}
                            className="border-white/10 px-6 rounded-2xl bg-white/5 hover:bg-white/[0.08] transition-colors border-none"
                          >
                            <AccordionTrigger className="text-white hover:no-underline font-bold py-6">
                              {item.title || 'Untitled Item'}
                            </AccordionTrigger>
                            <AccordionContent className="pb-6">
                              {item.text ? (
                                <MarkdownContent content={item.text} />
                              ) : (
                                <span className="text-gray-500 italic">No content</span>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      )}
    </div>
  );
};
