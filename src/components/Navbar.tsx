import { useState } from "react";
import { Search, Menu, X } from "lucide-react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/recipes/", label: "Recipes" },
    { to: "/about/", label: "About" },
    { to: "/contact/", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <button
          onClick={() => (window.location.href = "/")}
          className="flex items-center gap-2"
        >
          <span className="text-2xl">🍽️</span>
          <span className="font-display text-xl font-bold text-foreground tracking-tight">
            Delishly Recipes
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.to}
              onClick={() => (window.location.href = l.to)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => (window.location.href = "/recipes/")}
            className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
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
            <button
              key={l.to}
              onClick={() => (window.location.href = l.to)}
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {l.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};
