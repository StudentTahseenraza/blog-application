import { Heart, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-muted/50">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">DevBlog</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A modern blog platform for developers to share knowledge, 
              insights, and best practices in web development.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground blog-transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground blog-transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground blog-transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground blog-transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground blog-transition">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground blog-transition">
                  Database
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground blog-transition">
                  Design Systems
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground blog-transition">
                  Backend
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold">Stay Connected</h4>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="flex items-center justify-center rounded-lg w-9 h-9 bg-muted hover:bg-blog-primary hover:text-white blog-transition"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="flex items-center justify-center rounded-lg w-9 h-9 bg-muted hover:bg-blog-accent hover:text-white blog-transition"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="flex items-center justify-center rounded-lg w-9 h-9 bg-muted hover:bg-blog-primary hover:text-white blog-transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              Follow us for the latest updates and tutorials.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between pt-8 mt-8 space-y-4 border-t md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>© {currentYear} DevBlog. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for developers</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Built with React, TypeScript & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;