import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, Eye, Upload, X } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { BlogPost } from "@/types/blog";
import { getBlogPost, createBlogPost, updateBlogPost, isAuthenticated } from "@/lib/mockData"; // Add these imports
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

interface PostFormProps {
  mode: 'create' | 'edit';
}

const PostForm = ({ mode }: PostFormProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(mode === 'edit');
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [published, setPublished] = useState(false);
  const [authorName, setAuthorName] = useState("Admin User");

  // Load existing post if editing
  useEffect(() => {
    if (mode === 'edit' && id) {
      const loadPost = async () => {
        try {
          // For editing, we need to get the post by ID
          // Since our mock data uses slug for public API, we need to handle this differently
          // Let's assume the ID in the URL is actually the slug for now
          const post = await getBlogPost(id);
          if (post) {
            setTitle(post.title);
            setSlug(post.slug);
            setExcerpt(post.excerpt);
            setContent(post.content);
            setCoverImage(post.coverImage || "");
            setImages(post.images || []);
            setTags(post.tags);
            setPublished(post.published);
            setAuthorName(post.author.name);
          } else {
            toast({
              title: "Error",
              description: "Post not found",
              variant: "destructive",
            });
            navigate("/admin");
          }
        } catch (error) {
          console.error("Error loading post:", error);
          toast({
            title: "Error",
            description: "Failed to load post",
            variant: "destructive",
          });
          navigate("/admin");
        } finally {
          setLoading(false);
        }
      };
      loadPost();
    } else {
      setLoading(false);
    }
  }, [mode, id, toast, navigate]);

  // Auto-generate slug from title
  useEffect(() => {
    if (mode === 'create' && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generatedSlug);
    }
  }, [title, mode]);

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddImage = () => {
    const url = prompt("Enter image URL:");
    if (url && !images.includes(url)) {
      setImages([...images, url]);
    }
  };

  const handleRemoveImage = (imageToRemove: string) => {
    setImages(images.filter(image => image !== imageToRemove));
  };

  const handleSave = async (saveAs: 'draft' | 'publish') => {
    // Check authentication
    if (!isAuthenticated()) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create posts",
        variant: "destructive",
      });
      navigate('/admin/login');
      return;
    }

    setSaving(true);
    
    try {
      // Validate required fields
      if (!title.trim() || !content.trim() || !slug.trim()) {
        toast({
          title: "Validation Error",
          description: "Title, slug, and content are required",
          variant: "destructive",
        });
        return;
      }

      // Check if slug is unique (for new posts)
      if (mode === 'create') {
        const existingPost = await getBlogPost(slug.trim());
        if (existingPost) {
          toast({
            title: "Validation Error",
            description: "A post with this slug already exists",
            variant: "destructive",
          });
          return;
        }
      }

      const postData = {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        coverImage: coverImage.trim(),
        images,
        tags,
        published: saveAs === 'publish',
        author: {
          name: authorName.trim(),
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        },
        readTime: Math.ceil(content.split(/\s+/).length / 200), // Better word count
      };

      let savedPost;
      if (mode === 'create') {
        savedPost = await createBlogPost(postData);
        toast({
          title: "Success",
          description: `Post ${saveAs === 'publish' ? 'published' : 'saved as draft'} successfully`,
        });
      } else if (mode === 'edit' && id) {
        savedPost = await updateBlogPost(id, { ...postData, published: saveAs === 'publish' });
        toast({
          title: "Success",
          description: "Post updated successfully",
        });
      }

      console.log("Saved post:", savedPost);
      navigate("/admin");

    } catch (error: any) {
      console.error("Error saving post:", error);
      toast({
        title: "Error", 
        description: error.message || "Failed to save post",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">
            {mode === 'create' ? 'Create New Post' : 'Edit Post'}
          </h1>
          <p className="text-muted-foreground">
            {mode === 'create' ? 'Write a new blog post' : 'Update your blog post'}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => handleSave('draft')}
            disabled={saving}
          >
            {saving ? <LoadingSpinner size="sm" className="mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            Save Draft
          </Button>
          <Button 
            onClick={() => handleSave('publish')}
            disabled={saving}
            className="bg-blog-gradient hover:opacity-90"
          >
            {saving ? <LoadingSpinner size="sm" className="mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="text-lg"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="post-url-slug"
            />
            <p className="text-sm text-muted-foreground">
              This will be used in the URL: yourblog.com/post/<strong>{slug || 'post-url-slug'}</strong>
            </p>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of the post..."
              rows={3}
            />
          </div>

          {/* Content Editor */}
          <div className="space-y-2">
            <Label>Content *</Label>
            <div className="overflow-hidden border rounded-lg">
              <MDEditor
                value={content}
                onChange={(value) => setContent(value || "")}
                preview="edit"
                height={400}
                data-color-mode="light"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Estimated read time: {Math.ceil(content.split(/\s+/).length / 200)} minutes
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="published" className="text-sm font-normal">
                  Published
                </Label>
                <Switch
                  id="published"
                  checked={published}
                  onCheckedChange={setPublished}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card>
            <CardHeader>
              <CardTitle>Cover Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Enter image URL..."
              />
              {coverImage && (
                <div className="overflow-hidden rounded-lg aspect-video">
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleAddTag} className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag..."
                  className="flex-1"
                />
                <Button type="submit" size="sm" variant="outline">
                  Add
                </Button>
              </form>
              
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveTag(tag)}
                      className="h-auto p-0 hover:bg-transparent"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Images */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleAddImage}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Add Image
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Additional ${index + 1}`}
                      className="object-cover w-full rounded-lg aspect-square"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveImage(image)}
                      className="absolute opacity-0 top-1 right-1 group-hover:opacity-100 blog-transition"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostForm;