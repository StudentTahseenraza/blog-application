import { useState } from "react";
import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllTags } from "@/lib/mockData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onTagsChange: (tags: string[]) => void;
  searchQuery?: string;
  selectedTags?: string[];
}

const SearchBar = ({ onSearch, onTagsChange, searchQuery = "", selectedTags = [] }: SearchBarProps) => {
  const [query, setQuery] = useState(searchQuery);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const availableTags = getAllTags();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClearSearch = () => {
    setQuery("");
    onSearch("");
  };

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onTagsChange(newTags);
  };

  const clearAllTags = () => {
    onTagsChange([]);
  };

  return (
    <div className="space-y-4">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search blog posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 pl-12 pr-10 text-base"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClearSearch}
              className="absolute h-auto p-1 transform -translate-y-1/2 right-2 top-1/2"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        <Popover open={isTagsOpen} onOpenChange={setIsTagsOpen}>
          <PopoverTrigger asChild>
            <Button 
              type="button" 
              variant="outline" 
              size="lg" 
              className="relative h-12"
            >
              <Filter className="w-4 h-4 mr-2" />
              Tags
              {selectedTags.length > 0 && (
                <Badge 
                  variant="secondary" 
                  className="ml-2 px-1.5 py-0.5 text-xs min-w-5 h-5 rounded-full"
                >
                  {selectedTags.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-4 w-80" align="end">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Filter by Tags</h4>
                {selectedTags.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllTags}
                    className="h-auto p-1 text-xs"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTag(tag)}
                    className="h-8 text-xs"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button type="submit" size="lg" className="h-12 px-8">
          Search
        </Button>
      </form>

      {/* Active Filters */}
      {(searchQuery || selectedTags.length > 0) && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
          
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: "{searchQuery}"
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSearch("")}
                className="h-auto p-0 ml-1 hover:bg-transparent"
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
          
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleTag(tag)}
                className="h-auto p-0 ml-1 hover:bg-transparent"
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
          
          {(searchQuery || selectedTags.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onSearch("");
                onTagsChange([]);
              }}
              className="text-xs"
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;