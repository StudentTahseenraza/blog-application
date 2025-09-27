export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  images: string[];
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    avatar?: string;
  };
  readTime: number;
  published: boolean;
}

export interface BlogFilter {
  search?: string;
  tags?: string[];
  sortBy?: 'publishedAt' | 'title' | 'readTime';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}