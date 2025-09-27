import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container px-4 py-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blog-gradient blog-transition group-hover:scale-110">
              <PenTool className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-transparent bg-gradient-to-r from-blog-primary to-blog-accent bg-clip-text">
              DevBlog
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-6 md:flex">
            <Link 
              to="/" 
              className="font-medium text-muted-foreground hover:text-foreground blog-transition"
            >
              Home
            </Link>
            <Link 
              to="/admin" 
              className="font-medium text-muted-foreground hover:text-foreground blog-transition"
            >
              Admin
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="items-center hidden w-full max-w-sm space-x-2 md:flex">
            <div className="relative flex-1">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" variant="outline" size="sm">
              Search
            </Button>
          </form>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="pt-4 pb-4 mt-4 border-t md:hidden">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="font-medium text-muted-foreground hover:text-foreground blog-transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/admin" 
                className="font-medium text-muted-foreground hover:text-foreground blog-transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" variant="outline" size="sm">
                  Search
                </Button>
              </form>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;