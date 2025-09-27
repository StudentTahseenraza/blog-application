import { BlogPost } from "@/types/blog";

// Mock data - In production, this would come from your database
export let mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Modern Web Development",
    slug: "getting-started-modern-web-development",
    content: `# Getting Started with Modern Web Development

Web development has evolved significantly over the past decade. Today's developers have access to powerful tools and frameworks that make building complex applications more accessible than ever.

## The Current Landscape

Modern web development is characterized by:

- **Component-based architectures** that promote reusability
- **Static site generation** for improved performance
- **API-first approaches** that separate frontend and backend concerns
- **Modern tooling** that streamlines development workflows

## Key Technologies

### Frontend Frameworks
- **React**: The most popular library for building user interfaces
- **Vue.js**: A progressive framework that's easy to adopt
- **Angular**: A full-featured framework for enterprise applications

### Backend Technologies
- **Node.js**: JavaScript runtime for server-side development
- **Python**: Versatile language with frameworks like Django and FastAPI
- **Go**: Fast and efficient language for microservices

## Best Practices

1. **Write clean, maintainable code**
2. **Use version control effectively**
3. **Implement proper testing strategies**
4. **Focus on performance optimization**
5. **Ensure accessibility compliance**

The future of web development looks bright with emerging technologies like WebAssembly, edge computing, and AI-powered development tools.`,
    excerpt: "Explore the current landscape of modern web development, key technologies, and best practices for building scalable applications.",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&h=300&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=300&fit=crop"
    ],
    tags: ["Web Development", "JavaScript", "React", "Frontend"],
    publishedAt: "2024-09-25T10:00:00Z",
    updatedAt: "2024-09-25T10:00:00Z",
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b540?w=100&h=100&fit=crop&crop=face"
    },
    readTime: 8,
    published: true
  },
  {
    id: "2", 
    title: "The Art of Database Design",
    slug: "art-of-database-design",
    content: `# The Art of Database Design

Database design is both a science and an art. A well-designed database serves as the foundation for any successful application, while a poorly designed one can become a bottleneck that limits growth and performance.

## Fundamental Principles

### Normalization
Database normalization is the process of organizing data to minimize redundancy and dependency. The most commonly applied normal forms are:

- **First Normal Form (1NF)**: Eliminate duplicate columns
- **Second Normal Form (2NF)**: Remove partial dependencies  
- **Third Normal Form (3NF)**: Remove transitive dependencies

### Entity Relationship Modeling
Before writing any code, it's crucial to model your data relationships:

1. **Identify entities** and their attributes
2. **Define relationships** between entities
3. **Establish cardinality** (one-to-one, one-to-many, many-to-many)
4. **Create an ERD** (Entity Relationship Diagram)

## Modern Database Approaches

### SQL vs NoSQL
The choice between SQL and NoSQL databases depends on your specific requirements:

**SQL Databases (PostgreSQL, MySQL)**
- ACID compliance
- Strong consistency
- Complex queries with JOINs
- Mature ecosystem

**NoSQL Databases (MongoDB, DynamoDB)**
- Horizontal scaling
- Flexible schema
- Better for unstructured data
- High performance for simple queries

### Cloud-Native Solutions
Modern applications increasingly leverage cloud-native database solutions:

- **Database as a Service** (DBaaS) offerings
- **Serverless databases** that scale automatically
- **Multi-region replication** for global applications

## Performance Optimization

Effective database performance requires attention to:

1. **Indexing strategies** for query optimization
2. **Query optimization** and execution plan analysis
3. **Connection pooling** to manage database connections
4. **Caching layers** to reduce database load

Remember: premature optimization is the root of all evil, but planning for scale is essential.`,
    excerpt: "Learn the fundamental principles of database design, from normalization to modern cloud-native approaches.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop"
    ],
    tags: ["Database", "SQL", "NoSQL", "Backend"],
    publishedAt: "2024-09-20T14:30:00Z",
    updatedAt: "2024-09-20T14:30:00Z",
    author: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    readTime: 12,
    published: true
  },
  {
    id: "3",
    title: "Building Responsive Design Systems",
    slug: "building-responsive-design-systems", 
    content: `# Building Responsive Design Systems

A design system is more than just a collection of UI components. It's a comprehensive guide that enables teams to build cohesive, accessible, and scalable user interfaces.

## What Makes a Great Design System?

### Consistency
- **Color palettes** that work across all platforms
- **Typography scales** that maintain hierarchy
- **Spacing systems** based on mathematical principles
- **Component variants** for different use cases

### Accessibility First
Every design system should prioritize accessibility:

- **Color contrast ratios** that meet WCAG guidelines
- **Keyboard navigation** patterns
- **Screen reader compatibility**
- **Focus management** strategies

## Component Architecture

### Atomic Design Methodology
Brad Frost's Atomic Design provides a mental model for thinking about design systems:

1. **Atoms**: Basic HTML elements (buttons, inputs, labels)
2. **Molecules**: Simple combinations of atoms (search form, card header)
3. **Organisms**: Complex combinations (header, footer, product grid)
4. **Templates**: Page layouts with placeholder content
5. **Pages**: Specific instances of templates

### Design Tokens
Design tokens are the single source of truth for design decisions:

\`\`\`css
/* Color tokens */
--primary-50: hsl(217, 91%, 95%);
--primary-100: hsl(217, 91%, 85%);
--primary-500: hsl(217, 91%, 60%);
--primary-900: hsl(217, 91%, 15%);

/* Typography tokens */
--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.125rem;
\`\`\`

## Implementation Strategies

### CSS-in-JS vs CSS Modules
Different approaches have different trade-offs:

**CSS-in-JS (styled-components, emotion)**
- Dynamic styling based on props
- Automatic vendor prefixing
- Component-scoped styles
- Runtime overhead

**CSS Modules & CSS Variables**
- Better performance
- Framework agnostic
- Great browser support
- Less dynamic capabilities

## Documentation and Adoption

A design system is only as good as its documentation:

- **Live component examples** with code snippets
- **Usage guidelines** and best practices
- **Accessibility notes** for each component
- **Migration guides** for updates

The key to successful adoption is making the design system easier to use than building components from scratch.`,
    excerpt: "Discover how to create scalable design systems that promote consistency and accessibility across your applications.",
    coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=600&h=300&fit=crop"
    ],
    tags: ["Design Systems", "CSS", "UI/UX", "Frontend"],
    publishedAt: "2024-09-15T09:15:00Z",
    updatedAt: "2024-09-15T09:15:00Z",
    author: {
      name: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    readTime: 15,
    published: true
  }
];

// Mock admin user
export const mockAdminUser = {
  id: "1",
  username: "admin",
  password: "password123", // In real app, this should be hashed
  email: "admin@blog.com",
  name: "Admin User"
};

// JWT token simulation
let authToken: string | null = null;
let currentUser: typeof mockAdminUser | null = null;

// Authentication functions
export const login = async (username: string, password: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (username === mockAdminUser.username && password === mockAdminUser.password) {
    authToken = `mock-jwt-token-${Date.now()}`;
    currentUser = mockAdminUser;
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    return { success: true, user: currentUser, token: authToken };
  }
  
  return { success: false, error: "Invalid credentials" };
};

export const logout = () => {
  authToken = null;
  currentUser = null;
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
  if (!currentUser) {
    const storedUser = localStorage.getItem('currentUser');
    const storedToken = localStorage.getItem('authToken');
    if (storedUser && storedToken) {
      currentUser = JSON.parse(storedUser);
      authToken = storedToken;
    }
  }
  return currentUser;
};

export const isAuthenticated = () => {
  return !!getCurrentUser();
};

// Public API functions - Only show published posts
export const getBlogPosts = async (filters?: {
  search?: string;
  tags?: string[];
  page?: number;
  limit?: number;
}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Filter only published posts for public access
  let filteredPosts = mockBlogPosts.filter(post => post.published);
  
  // Apply search filter
  if (filters?.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  // Apply tag filter
  if (filters?.tags && filters.tags.length > 0) {
    filteredPosts = filteredPosts.filter(post =>
      filters.tags!.some(tag => post.tags.includes(tag))
    );
  }
  
  // Sort by publishedAt (newest first)
  filteredPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  
  // Apply pagination
  const page = filters?.page || 1;
  const limit = filters?.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    data: filteredPosts.slice(startIndex, endIndex),
    total: filteredPosts.length,
    page,
    limit,
    totalPages: Math.ceil(filteredPosts.length / limit)
  };
};

export const getBlogPost = async (slug: string) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  // Only return published posts for public access
  return mockBlogPosts.find(post => post.slug === slug && post.published);
};

export const getAllTags = () => {
  const tags = new Set<string>();
  mockBlogPosts.forEach(post => {
    if (post.published) { // Only include tags from published posts
      post.tags.forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags);
};

// Admin API functions - Require authentication
export const getAdminBlogPosts = async () => {
  if (!isAuthenticated()) {
    throw new Error("Unauthorized - Please log in as admin");
  }
  
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return all posts (including drafts) for admin
  return [...mockBlogPosts].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};

export const getAdminBlogPost = async (id: string) => {
  if (!isAuthenticated()) {
    throw new Error("Unauthorized - Please log in as admin");
  }
  
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockBlogPosts.find(post => post.id === id);
};

export const createBlogPost = async (postData: Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt'>) => {
  if (!isAuthenticated()) throw new Error("Unauthorized - Please log in as admin");
  
  await new Promise(resolve => setTimeout(resolve, 300));

  // Fix ID generation to handle empty array case
  const maxId = mockBlogPosts.length > 0 
    ? Math.max(...mockBlogPosts.map(p => parseInt(p.id))) 
    : 0;
  
  const newPost: BlogPost = {
    ...postData,
    id: (maxId + 1).toString(),
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockBlogPosts.unshift(newPost);
  return newPost;
};

export const updateBlogPost = async (id: string, postData: Partial<BlogPost>) => {
  if (!isAuthenticated()) {
    throw new Error("Unauthorized - Please log in as admin");
  }
  
  await new Promise(resolve => setTimeout(resolve, 300));

  const index = mockBlogPosts.findIndex(post => post.id === id);
  if (index === -1) throw new Error("Post not found");

  mockBlogPosts[index] = {
    ...mockBlogPosts[index],
    ...postData,
    updatedAt: new Date().toISOString(),
  };

  return mockBlogPosts[index];
};

export const deleteBlogPost = async (id: string) => {
  if (!isAuthenticated()) {
    throw new Error("Unauthorized - Please log in as admin");
  }
  
  await new Promise(resolve => setTimeout(resolve, 300));

  const index = mockBlogPosts.findIndex(post => post.id === id);
  if (index === -1) throw new Error("Post not found");

  mockBlogPosts.splice(index, 1);
  return true;
};

export const getAllAdminTags = () => {
  const tags = new Set<string>();
  mockBlogPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
};