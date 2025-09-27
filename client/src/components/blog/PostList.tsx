import { useState, useEffect } from "react";
import { BlogPost } from "@/types/blog";
import { getBlogPosts } from "@/lib/mockData";
import PostCard from "./PostCard";
import { Button } from "../../components/ui/button";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Loader2 } from "lucide-react";

interface PostListProps {
  searchQuery?: string;
  selectedTags?: string[];
}

const PostList = ({ searchQuery, selectedTags }: PostListProps) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0
  });

  const loadPosts = async (page: number = 1, append: boolean = false) => {
    if (page === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      const response = await getBlogPosts({
        search: searchQuery,
        tags: selectedTags,
        page,
        limit: 6
      });

      if (append) {
        setPosts(prev => [...prev, ...response.data]);
      } else {
        setPosts(response.data);
      }
      
      setPagination({
        page: response.page,
        totalPages: response.totalPages,
        total: response.total
      });
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadPosts(1, false);
  }, [searchQuery, selectedTags]);

  const handleLoadMore = () => {
    if (pagination.page < pagination.totalPages && !loadingMore) {
      loadPosts(pagination.page + 1, true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-muted">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">No posts found</h3>
          <p className="text-muted-foreground">
            {searchQuery || selectedTags?.length 
              ? "Try adjusting your search or filters to find more content."
              : "No blog posts are available at the moment."}
          </p>
        </div>
      </div>
    );
  }

  const [featuredPost, ...regularPosts] = posts;

  return (
    <div className="space-y-8">
      {/* Featured Post - Only on first page without search/filters */}
      {pagination.page === 1 && !searchQuery && !selectedTags?.length && featuredPost && (
        <section>
          <h2 className="mb-6 text-2xl font-bold">Featured Post</h2>
          <PostCard post={featuredPost} featured />
        </section>
      )}

      {/* Regular Posts Grid */}
      {(regularPosts.length > 0 || (searchQuery || selectedTags?.length)) && (
        <section>
          {pagination.page === 1 && !searchQuery && !selectedTags?.length && (
            <h2 className="mb-6 text-2xl font-bold">Latest Posts</h2>
          )}
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(searchQuery || selectedTags?.length ? posts : regularPosts).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Load More Button */}
      {pagination.page < pagination.totalPages && (
        <div className="flex justify-center pt-8">
          <Button
            onClick={handleLoadMore}
            disabled={loadingMore}
            variant="outline"
            size="lg"
            className="min-w-32"
          >
            {loadingMore && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {loadingMore ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

      {/* Results Summary */}
      <div className="pt-4 text-sm text-center text-muted-foreground">
        Showing {posts.length} of {pagination.total} posts
      </div>
    </div>
  );
};

export default PostList;