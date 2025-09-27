import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PostList from "@/components/blog/PostList";
import SearchBar from "@/components/blog/SearchBar";
import { Sparkles, TrendingUp, Users, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <Layout onSearch={setSearchQuery}>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden text-white bg-blog-hero-gradient">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="absolute inset-0">
          <img 
            src={heroImage}
            alt="Modern web development workspace"
            className="object-cover w-full h-full opacity-20"
          />
          <div className="absolute inset-0 bg-blog-hero-gradient/80" />
        </div>
        <div className="container relative px-4 mx-auto">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-white/10 backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                Welcome to the future of development
              </div>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
                Master Modern
                <br />
                <span className="text-transparent bg-gradient-to-r from-white to-blue-200 bg-clip-text">
                  Web Development
                </span>
              </h1>
              <p className="max-w-3xl mx-auto text-xl leading-relaxed md:text-2xl text-white/90">
                Discover cutting-edge techniques, best practices, and insights from industry experts. 
                Stay ahead with our comprehensive guides and tutorials.
              </p>
            </div>
            
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a 
                href="#posts" 
                className="inline-flex items-center justify-center px-8 py-4 font-semibold bg-white text-blog-primary rounded-xl hover:bg-white/90 blog-transition blog-shadow-lg"
              >
                Start Reading
              </a>
              <a 
                href="/admin" 
                className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white border bg-white/10 backdrop-blur-sm rounded-xl border-white/20 hover:bg-white/20 blog-transition"
              >
                Write a Post
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
            <div className="space-y-3 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blog-accent-gradient rounded-2xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">50+</h3>
              <p className="text-muted-foreground">In-depth Articles</p>
            </div>
            <div className="space-y-3 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blog-gradient rounded-2xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">10K+</h3>
              <p className="text-muted-foreground">Active Readers</p>
            </div>
            <div className="space-y-3 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blog-accent-gradient rounded-2xl">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">95%</h3>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="posts" className="py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Latest Articles</h2>
              <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
                Explore our collection of tutorials, guides, and insights to level up your development skills.
              </p>
            </div>
            
            <SearchBar
              onSearch={setSearchQuery}
              onTagsChange={setSelectedTags}
              searchQuery={searchQuery}
              selectedTags={selectedTags}
            />
            
            <PostList
              searchQuery={searchQuery}
              selectedTags={selectedTags}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;