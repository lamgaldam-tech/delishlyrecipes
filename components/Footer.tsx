export const Footer = () => (
  <footer
    className="bg-foreground text-background/80 mt-20"
    aria-label="Footer Section"
  >
    <div className="container mx-auto px-4 py-16">
      {/* Brand Section */}
      <section
        aria-labelledby="footer-brand"
        className="md:col-span-1 mb-10 md:mb-0"
      >
        <h2 id="footer-brand" className="sr-only">
          Delishly Recipes
        </h2>
        <a href="/" className="flex items-center gap-2 mb-4">
          <img
            src="/favicon-48x48.webp"
            alt="Delishly Recipes"
            title="Delishly Recipes"
            className="text-2xl rounded-full"
          />
          <span className="font-display text-xl font-bold text-background">
            Delishly Recipes
          </span>
        </a>
        <p className="text-sm leading-relaxed text-background/60">
          Delishly Recipes shares easy, tested, and delicious recipes for
          breakfast, lunch, dinner, and quick 30-minute meals.
        </p>
      </section>

      {/* Links Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Explore */}
        <section aria-labelledby="footer-explore">
          <h4
            id="footer-explore"
            className="font-display text-sm font-semibold text-background mb-4"
          >
            Explore
          </h4>
          <ul className="space-y-2 text-sm">
            {["Recipes", "Categories", "30-Minute Meals", "Trending"].map(
              (item) => (
                <li key={item}>
                  <a
                    href={"/recipes/"}
                    className="hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ),
            )}
          </ul>
        </section>

        {/* Company */}
        <section aria-labelledby="footer-company">
          <h4
            id="footer-company"
            className="font-display text-sm font-semibold text-background mb-4"
          >
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: "About", to: "/about/" },
              { label: "Contact", to: "/contact/" },
              { label: "Privacy Policy", to: "/privacy-policy/" },
              { label: "Terms of Service", to: "/terms-of-service/" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.to}
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Stay Connected */}
        <section aria-labelledby="footer-stay-connected">
          <h4
            id="footer-stay-connected"
            className="font-display text-sm font-semibold text-background mb-4"
          >
            Stay Connected
          </h4>
          <p className="text-sm text-background/60 mb-3">
            Follow us for daily recipe inspiration.
          </p>
          <div className="flex gap-3">
            {[
              {
                label: "Instagram",
                link: "https://www.instagram.com/delishlyrecipes/",
              },
              {
                label: "Pinterest",
                link: "https://www.pinterest.com/delishlyrecipes/",
              },
              {
                label: "GitHub",
                link: "https://github.com/lamgaldam-tech/delishlyrecipes",
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.link}
                target="_blank"
                rel="noopener"
                className="text-xs px-3 py-1.5 rounded-full border border-background/20 hover:border-primary hover:text-primary transition-colors cursor-pointer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* Copyright */}
      <div className="border-t border-background/10 mt-12 pt-6 text-center text-xs text-background/40">
        © {new Date().getFullYear()} Delishly Recipes. All rights reserved.
      </div>
    </div>
  </footer>
);
