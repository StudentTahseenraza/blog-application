# DevBlog - Modern Blog Platform

A fully functional blog platform built with React, TypeScript, and modern web technologies. This project demonstrates a complete blog system with admin functionality, rich text editing, search capabilities, and responsive design.

## 🚀 Features

### Core Features
- **Dynamic Blog Posts**: Database-driven content (not static markdown)
- **Homepage**: Lists all posts with title, description, and publish date
- **Individual Post Pages**: Accessible via dynamic routes (`/post/[slug]`)
- **Search & Filter**: Search by title/content and filter by tags
- **Responsive Design**: Optimized for all device sizes

### Bonus Features ⭐
- **Admin Panel**: Complete admin interface for post management
- **Rich Text Editor**: Markdown editor with live preview
- **Image Support**: Multiple images per post with cover image support
- **Tag System**: Categorize and filter posts by tags
- **User Authentication Ready**: Admin layout prepared for authentication
- **Modern UI**: Beautiful, accessible design with dark mode support

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui
- **Rich Text**: @uiw/react-md-editor for Markdown editing
- **Routing**: React Router v6
- **State Management**: React Hooks + TanStack Query
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devblog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🏗 Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/            # Layout components (Header, Footer)
│   ├── blog/              # Blog-specific components
│   ├── admin/             # Admin panel components
│   └── shared/            # Shared utility components
├── pages/                 # Route pages
│   ├── Index.tsx          # Homepage
│   ├── BlogPost.tsx       # Individual post page
│   └── admin/             # Admin pages
├── types/                 # TypeScript type definitions
├── lib/                   # Utilities and mock data
└── hooks/                 # Custom React hooks
```

## 📊 Database Schema

The application is designed to work with the following data structure:

### BlogPost Entity
```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;          // Markdown content
  excerpt: string;
  coverImage?: string;
  images: string[];         // Additional images
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    avatar?: string;
  };
  readTime: number;        // Estimated read time in minutes
  published: boolean;
}
```

## 🔧 Environment Setup

Currently uses mock data for demonstration. To connect to a real database:

1. **Set up Supabase** (recommended):
   - Create a new Supabase project
   - Set up the blog posts table with the schema above
   - Add Row Level Security (RLS) policies
   - Update API calls in `src/lib/mockData.ts`

2. **Environment Variables** (when using real API):
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## 🎨 Design System

The project includes a comprehensive design system with:

- **Custom color palette** with HSL values
- **Semantic design tokens** for consistent styling
- **Gradient system** for modern visual effects
- **Typography scale** with proper hierarchy
- **Component variants** for different use cases

## 📱 API Endpoints

The application is structured around these API patterns:

- `GET /api/blogs` - Get paginated blog posts
- `GET /api/blogs/[slug]` - Get individual post
- `POST /api/blogs` - Create new post (admin)
- `PUT /api/blogs/[id]` - Update post (admin)
- `DELETE /api/blogs/[id]` - Delete post (admin)

## 🚀 Deployment

### Using Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Using Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Using Other Platforms
The project builds to static files and can be deployed to any static hosting service.

## 🧪 Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## 📈 Performance Features

- **Lazy Loading**: Images load only when needed
- **Code Splitting**: Routes are loaded on demand
- **Optimized Images**: Responsive image handling
- **Fast Navigation**: Client-side routing with React Router
- **Efficient Queries**: Pagination and search optimization

## 🎯 SEO Optimized

- **Meta Tags**: Proper title and description tags
- **Semantic HTML**: Structured markup for better crawling
- **Open Graph**: Social media sharing optimization
- **Clean URLs**: SEO-friendly route structure
- **Performance**: Fast loading times for better rankings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Library
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Lucide](https://lucide.dev/) - Icons
- [Unsplash](https://unsplash.com/) - Demo Images

## 📞 Support

For questions or support, please:
1. Check the [Issues](../../issues) page
2. Create a new issue if your question isn't answered
3. Provide detailed information about your problem

---

Built with ❤️ using modern web technologies. This project demonstrates best practices for React development, TypeScript usage, and modern UI/UX design patterns.