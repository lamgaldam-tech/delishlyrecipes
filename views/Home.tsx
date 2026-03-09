import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { RecipeCard } from "@/components/RecipeCard";
import { recipeCategories } from "@/types/recipe.types";
import type { Recipe } from "@/types/recipe.types";

interface HomeProps {
  recipes: Recipe[];
}

export const Home = ({ recipes }: HomeProps) => {
  const [email, setEmail] = useState("");
  const counts: Record<string, number> = {};

  recipes.forEach((r) => {
    const categoryName = r.category.name;
    counts[categoryName] = (counts[categoryName] || 0) + 1;
  });

  const categories = recipeCategories.map((r) => ({
    ...r,
    count: counts[r.name] || 0,
  }));

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hero-image.webp"
            alt="Fresh ingredients"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl animate-fade-in">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-background leading-[1.1] mb-6">
              Cook Smarter.
              <br />
              Eat Better.
              <br />
              <span className="text-primary">Live Delishly.</span>
            </h1>
            <p className="text-lg text-background/80 mb-8 max-w-md">
              Discover easy, delicious, and tested recipes for every occasion.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/recipes/"
                className="flex items-center py-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 rounded-full"
              >
                <span>Browse Recipes</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <a
                href={recipeCategories[7].url}
                className="flex items-center py-2 bg-background/10 border-2 border-background/50 text-background hover:bg-background/25 rounded-full px-8"
              >
                {recipeCategories[7].name}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section
        aria-labelledby="featured-recipes"
        className="container mx-auto px-4 py-20"
      >
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Handpicked
            </span>
            <h2
              id="featured-recipes"
              className="font-display text-3xl md:text-4xl font-bold text-foreground mt-1"
            >
              Featured Recipes
            </h2>
          </div>
          <a
            href="/recipes/"
            className="text-sm font-medium text-primary hover:underline hidden sm:block"
          >
            View all →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.slice(-3).map((r) => (
            <RecipeCard key={r.title} recipe={r} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section aria-labelledby="categories" className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Browse by
            </span>
            <h2
              id="categories"
              className="font-display text-3xl md:text-4xl font-bold text-foreground mt-1"
            >
              Categories
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((c) => (
              <a
                key={c.name}
                href={c.url}
                className="bg-card rounded-xl p-6 text-center shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-3xl block mb-3">{c.emoji}</span>
                <h3 className="font-display font-semibold text-foreground text-sm">
                  {c.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {c.count} recipes
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section
        aria-labelledby="trending-now"
        className="container mx-auto px-4 py-20"
      >
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              What's Hot
            </span>
            <h2
              id="trending-now"
              className="font-display text-3xl md:text-4xl font-bold text-foreground mt-1"
            >
              Trending Now
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[recipes[0], recipes[1], recipes[2]].map((r) => (
            <RecipeCard key={r.title} recipe={r} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section
        aria-labelledby="get-weekly-recipes"
        className="bg-primary/5 py-20"
      >
        <div className="container mx-auto px-4 text-center max-w-lg">
          <span className="text-3xl block mb-4">📬</span>
          <h2
            id="get-weekly-recipes"
            className="font-display text-3xl font-bold text-foreground mb-3"
          >
            Get Weekly Recipes
          </h2>
          <p className="text-muted-foreground mb-8">
            Join 10,000+ food lovers. New recipes delivered to your inbox every
            week.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-5 py-3 rounded-full bg-card border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              aria-label="Subscribe to weekly recipes"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};
