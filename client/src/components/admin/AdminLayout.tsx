import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Upload, 
  Settings, 
  ArrowLeft,
  PenTool,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logout, isAuthenticated } from "@/lib/mockData";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      current: location.pathname === "/admin"
    },
    {
      name: "Posts",
      href: "/admin/posts",
      icon: FileText,
      current: location.pathname.startsWith("/admin/posts")
    },
    {
      name: "Media",
      href: "/admin/uploads",
      icon: Upload,
      current: location.pathname === "/admin/uploads"
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      current: location.pathname === "/admin/settings"
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
            <div className="w-px h-6 bg-border" />
            <Link to="/admin" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blog-gradient">
                <PenTool className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold">Admin Panel</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated() && (
              <>
                <Button variant="outline" asChild>
                  <Link to="/admin/posts/new">
                    New Post
                  </Link>
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Only show if authenticated */}
        {isAuthenticated() && (
          <nav className="w-64 min-h-screen p-6 border-r bg-background">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium blog-transition",
                    item.current
                      ? "bg-blog-primary text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="p-4 mt-8 rounded-lg bg-muted/50">
              <h4 className="mb-3 text-sm font-medium">Quick Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Published</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Drafts</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Views</span>
                  <span className="font-medium">1.2K</span>
                </div>
              </div>
            </div>
          </nav>
        )}

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;