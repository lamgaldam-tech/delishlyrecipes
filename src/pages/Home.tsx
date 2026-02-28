import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { recipes } from "@/data/recipes";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "@/components/RecipeCard";
import heroImage from "@/assets/hero-food.jpg";
import { recipeCategories } from "@/types/recipe.types";

export const Home = () => {
  const [email, setEmail] = useState("");
  const counts: Record<string, number> = {};

  recipes.forEach((r) => {
    const categoryName = r.category.name; // use the name as key
    counts[categoryName] = (counts[categoryName] || 0) + 1;
  });

  const categories = recipeCategories.map((r) => ({
    ...r,
    count: counts[r.name] || 0, // match by name
  }));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
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
              <button onClick={() => (window.location.href = "/recipes/")}>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 rounded-full"
                >
                  Browse Recipes <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </button>
              <button onClick={() => (window.location.href = "/recipes/")}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-background/30 text-background hover:bg-background/10 rounded-full px-8"
                >
                  30-Minute Meals
                </Button>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Handpicked
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-1">
              Featured Recipes
            </h2>
          </div>
          <button
            onClick={() => (window.location.href = "/recipes/")}
            className="text-sm font-medium text-primary hover:underline hidden sm:block"
          >
            View all →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[recipes[0], recipes[1], recipes[2]].map((r) => (
            <RecipeCard
              key={r.title}
              recipe={r}
              onClick={() => (window.location.href = r.url)}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Browse by
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-1">
              Categories
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((c) => (
              <button
                key={c.name}
                onClick={() => (window.location.href = "/recipes/")}
                className="bg-card rounded-xl p-6 text-center shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-3xl block mb-3">{c.emoji}</span>
                <h3 className="font-display font-semibold text-foreground text-sm">
                  {c.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {c.count} recipes
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              What's Hot
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-1">
              Trending Now
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[recipes[0], recipes[1], recipes[2]].map((r) => (
            <RecipeCard
              key={r.title}
              recipe={r}
              onClick={() => (window.location.href = r.url)}
            />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center max-w-lg">
          <span className="text-3xl block mb-4">📬</span>
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">
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
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};
