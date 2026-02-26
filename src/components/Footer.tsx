export const Footer = () => (
  <footer className="bg-foreground text-background/80 mt-20">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <button
            onClick={() => (window.location.href = "/")}
            className="flex items-center gap-2 mb-4"
          >
            <span className="text-2xl">🍽️</span>
            <span className="font-display text-xl font-bold text-background">
              Delishly Recipes
            </span>
          </button>
          <p className="text-sm leading-relaxed text-background/60">
            Discover easy, delicious, and tested recipes for every occasion.
            Made with love.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-background mb-4">
            Explore
          </h4>
          <ul className="space-y-2 text-sm">
            {["Recipes", "Categories", "30-Minute Meals", "Trending"].map(
              (item) => (
                <li key={item}>
                  <button
                    onClick={() => (window.location.href = "/recipes/")}
                    className="hover:text-primary transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-background mb-4">
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: "About", to: "/about/" },
              { label: "Contact", to: "/contact/" },
              { label: "Privacy Policy", to: "/" },
              { label: "Terms of Service", to: "/" },
            ].map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => (window.location.href = item.to)}
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-background mb-4">
            Stay Connected
          </h4>
          <p className="text-sm text-background/60 mb-3">
            Follow us for daily recipe inspiration.
          </p>
          <div className="flex gap-3">
            {["Instagram", "Pinterest", "YouTube"].map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1.5 rounded-full border border-background/20 hover:border-primary hover:text-primary transition-colors cursor-pointer"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-background/10 mt-12 pt-6 text-center text-xs text-background/40">
        © {new Date().getFullYear()} Delishly Recipes. All rights reserved.
      </div>
    </div>
  </footer>
);
