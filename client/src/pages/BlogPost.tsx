import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { BlogPost as BlogPostType } from "@/types/blog";
import { getBlogPost } from "@/lib/mockData";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { useToast } from "@/hooks/use-toast";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError("Post not found");
        setLoading(false);
        return;
      }

      try {
        const postData = await getBlogPost(slug);
        if (postData) {
          setPost(postData);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        setError("Failed to load post");
        console.error("Error loading post:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } catch (err) {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "The post URL has been copied to your clipboard.",
      });
    }
  };

  const handleBookmark = () => {
    toast({
      title: "Bookmarked!",
      description: "This post has been added to your bookmarks.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="container px-4 py-12 mx-auto">
          <div className="flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="container px-4 py-12 mx-auto">
          <ErrorMessage
            title="Post not found"
            message={error || "The post you're looking for doesn't exist."}
            className="text-center"
          />
          <div className="mt-6 text-center">
            <Button asChild variant="outline">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="py-8">
        {/* Header */}
        <header className="container px-4 mx-auto mb-8">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild className="mb-6 -ml-4">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Posts
              </Link>
            </Button>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              <p className="text-xl leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback className="text-lg">{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{post.author.name}</div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={handleBookmark}>
                    <Bookmark className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="container px-4 mx-auto mb-12">
            <div className="max-w-4xl mx-auto">
              <div className="aspect-[16/9] overflow-hidden rounded-2xl">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="prose-blog">
              <ReactMarkdown
                components={{
                  img: ({ src, alt }) => (
                    <div className="my-8">
                      <img
                        src={src}
                        alt={alt || ""}
                        className="w-full rounded-lg blog-shadow"
                      />
                      {alt && (
                        <p className="mt-2 text-sm italic text-center text-muted-foreground">
                          {alt}
                        </p>
                      )}
                    </div>
                  ),
                  h1: ({ children }) => (
                    <h1 className="mt-12 mb-6 text-3xl font-bold first:mt-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mt-10 mb-4 text-2xl font-bold">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mt-8 mb-3 text-xl font-bold">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 leading-relaxed text-foreground">
                      {children}
                    </p>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="pl-6 my-6 italic border-l-4 border-blog-accent text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children, className }) => {
                    const isBlock = className?.includes('language-');
                    if (isBlock) {
                      return (
                        <pre className="p-4 my-4 overflow-x-auto rounded-lg bg-muted">
                          <code className={className}>{children}</code>
                        </pre>
                      );
                    }
                    return (
                      <code className="px-2 py-1 text-sm rounded bg-muted">
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Additional Images */}
            {post.images && post.images.length > 0 && (
              <div className="mt-12 space-y-6">
                <h3 className="text-xl font-bold">Related Images</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {post.images.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                      <img
                        src={image}
                        alt={`Related image ${index + 1}`}
                        className="object-cover w-full h-48 blog-shadow"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="container px-4 mx-auto mt-16">
          <div className="max-w-3xl p-8 mx-auto text-center bg-muted/50 rounded-2xl">
            <h3 className="mb-4 text-2xl font-bold">Enjoyed this article?</h3>
            <p className="mb-6 text-muted-foreground">
              Subscribe to our newsletter for more insights and tutorials.
            </p>
            <div className="flex flex-col max-w-md gap-3 mx-auto sm:flex-row">
              <Button className="flex-1">Subscribe</Button>
              <Button variant="outline" onClick={handleShare}>
                Share this post
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;