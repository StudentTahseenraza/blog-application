import { Link } from "react-router-dom";
import { Clock, Calendar, User, ArrowRight } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
}

const PostCard = ({ post, featured = false }: PostCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (featured) {
    return (
      <article className="relative overflow-hidden border group rounded-2xl bg-card blog-shadow hover:shadow-blog-xl blog-transition">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="object-cover w-full h-full blog-transition group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <div className="space-y-4 text-white">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-white bg-white/20 border-white/30 hover:bg-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div>
              <h2 className="mb-3 text-2xl font-bold leading-tight md:text-4xl group-hover:text-blog-accent-light blog-transition">
                <Link to={`/post/${post.slug}`} className="stretched-link">
                  {post.title}
                </Link>
              </h2>
              <p className="text-lg text-white/90 line-clamp-2">
                {post.excerpt}
              </p>
            </div>
            
            <div className="flex items-center justify-between text-sm text-white/80">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="overflow-hidden border group bg-card rounded-xl blog-shadow hover:shadow-blog-xl blog-transition">
      {post.coverImage && (
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="object-cover w-full h-full blog-transition group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-bold leading-tight group-hover:text-blog-accent blog-transition">
            <Link to={`/post/${post.slug}`} className="stretched-link">
              {post.title}
            </Link>
          </h3>
          <p className="leading-relaxed text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback className="text-xs">{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{post.author.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{post.readTime} min</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;