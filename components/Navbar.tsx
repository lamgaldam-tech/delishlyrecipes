import { useState } from "react";
import { Search, Menu, X } from "lucide-react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/recipes/", label: "All Recipes" },
    { to: "/about/", label: "About" },
    { to: "/contact/", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="/" className="flex items-center gap-2">
          <img
            src="/favicon-48x48.webp"
            alt="Delishly Recipes"
            title="Delishly Recipes"
            className="text-2xl rounded-full"
          />
          <span className="font-display text-xl font-bold text-foreground tracking-tight">
            Delishly Recipes
          </span>
        </a>

        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main Navigation"
        >
          {links.map((l) => (
            <a
              key={l.to}
              href={l.to}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/recipes/"
            className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Search className="w-4 h-4" />
            Search Recipes
          </a>
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t bg-card px-4 pb-4 pt-2 space-y-2">
          {links.map((l) => (
            <a
              key={l.to}
              href={l.to}
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
