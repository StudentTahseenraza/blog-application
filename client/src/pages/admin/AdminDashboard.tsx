import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, Eye, Clock, FileText, Users, TrendingUp, LogIn } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { getBlogPosts, getAdminBlogPosts, deleteBlogPost, isAuthenticated } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const admin = isAuthenticated();
        setIsAdmin(admin);

        if (admin) {
          // Use admin API if authenticated (shows all posts including drafts)
          const adminPosts = await getAdminBlogPosts();
          setPosts(adminPosts);
        } else {
          // Use public API if not authenticated (shows only published posts)
          const response = await getBlogPosts({ limit: 10 });
          setPosts(response.data);
        }
      } catch (error) {
        console.error('Error loading posts:', error);
        toast({
          title: "Error",
          description: "Failed to load posts",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [toast]);

  const handleDelete = async (postId: string) => {
    if (!isAdmin) {
      toast({
        title: "Authentication Required",
        description: "Please log in to delete posts",
        variant: "destructive",
      });
      navigate('/admin/login');
      return;
    }

    try {
      await deleteBlogPost(postId);
      setPosts(posts.filter(post => post.id !== postId));
      toast({
        title: "Post deleted",
        description: "The post has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (postId: string) => {
    if (!isAdmin) {
      toast({
        title: "Authentication Required",
        description: "Please log in to edit posts",
        variant: "destructive",
      });
      navigate('/admin/login');
      return;
    }
    navigate(`/admin/posts/${postId}/edit`);
  };

  const handleCreatePost = () => {
    if (!isAdmin) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create posts",
        variant: "destructive",
      });
      navigate('/admin/login');
      return;
    }
    navigate('/admin/posts/new');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  const stats = [
    {
      title: "Total Posts",
      value: isAdmin ? posts.length.toString() : posts.filter(p => p.published).length.toString(),
      icon: FileText,
      change: "+2 this week",
      changeType: "positive" as const
    },
    {
      title: "Published",
      value: posts.filter(p => p.published).length.toString(),
      icon: Eye,
      change: "+1 today",
      changeType: "positive" as const
    },
    {
      title: "Drafts",
      value: isAdmin ? posts.filter(p => !p.published).length.toString() : "0",
      icon: Clock,
      change: isAdmin ? "1 pending" : "Login to view",
      changeType: isAdmin ? "neutral" as const : "neutral" as const
    },
    {
      title: "Total Views",
      value: "12.4K",
      icon: TrendingUp,
      change: "+15.2%",
      changeType: "positive" as const
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            {isAdmin ? "Manage your blog posts and analytics" : "View blog posts - Login to manage"}
          </p>
          {!isAdmin && (
            <p className="mt-1 text-sm text-muted-foreground">
              You're viewing published posts. Login to create, edit, or delete posts.
            </p>
          )}
        </div>
        <Button 
          onClick={handleCreatePost}
          size="lg" 
          className="bg-blog-gradient hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          {isAdmin ? "New Post" : "Login to Create Post"}
        </Button>
      </div>

      {/* Login Prompt Banner for non-admin users */}
      {!isAdmin && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">Admin Access Available</h3>
                <p className="text-sm text-blue-700">Login to access full admin features</p>
              </div>
              <Button 
                onClick={() => navigate('/admin/login')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Admin Login
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="blog-transition hover:shadow-blog">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs mt-1 ${
                stat.changeType === 'positive' 
                  ? 'text-blog-success' 
                  : 'text-muted-foreground'
              }`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Posts {!isAdmin && "(Published)"}</CardTitle>
            <div className="flex items-center gap-2">
              {!isAdmin && (
                <span className="text-sm text-muted-foreground">Login to see all posts</span>
              )}
              <Button variant="outline" asChild>
                <Link to="/">View Public Blog</Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Author</TableHead>
                <TableHead className="hidden lg:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.slice(0, 5).map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium line-clamp-1">{post.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {post.excerpt}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback className="text-xs">{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{post.author.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(post.publishedAt)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/post/${post.slug}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEdit(post.id)}
                        disabled={!isAdmin}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        disabled={!isAdmin}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {posts.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              No posts found. {!isAdmin && "Login to create new posts."}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Admin Features Info */}
      {!isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Admin Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <h4 className="font-semibold">Create Posts</h4>
                <p className="text-sm text-muted-foreground">
                  Write and publish new blog posts with rich content editor
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Edit & Manage</h4>
                <p className="text-sm text-muted-foreground">
                  Update existing posts, manage drafts, and organize content
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  View post performance and reader engagement metrics
                </p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Button 
                onClick={() => navigate('/admin/login')}
                className="bg-blog-gradient hover:opacity-90"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login to Access Admin Features
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboard;