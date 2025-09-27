import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BlogPost from "./pages/BlogPost";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PostForm from "./components/admin/PostForm";
import AdminLayout from "./components/admin/AdminLayout";
import NotFound from "./pages/NotFound";
import LoginForm from "./components/auth/LoginForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/post/:slug" element={<BlogPost />} />
          
          {/* Auth Routes */}
          <Route path="/admin/login" element={<LoginForm />} />
          
          {/* Admin Routes - No automatic protection */}
          <Route 
            path="/admin" 
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            } 
          />
          <Route 
            path="/admin/posts/new" 
            element={
              <AdminLayout>
                <PostForm mode="create" />
              </AdminLayout>
            } 
          />
          <Route 
            path="/admin/posts/:id/edit" 
            element={
              <AdminLayout>
                <PostForm mode="edit" />
              </AdminLayout>
            } 
          />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;