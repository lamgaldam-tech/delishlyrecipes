import { useState } from "react";
import { Search } from "lucide-react";
import { RecipeCard } from "@/components/RecipeCard";
import { recipeTypes } from "@/types/recipes";
import type { Recipe, RecipeType } from "@/types/recipes";

interface RecipeProps {
  recipes: Recipe[];
}

const categoriesEmojiesMap: Record<RecipeType, string> = {
  Breakfast: "🥞",
  Lunch: "🥗",
  Dinner: "🍝",
  Desserts: "🍰",
  Snacks: "🥨",
  Drinks: "🥤",
  Vegan: "🌱",
  "30-Min Meals": "⏱️",
};

export const Recipes = ({ recipes }: RecipeProps) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = recipes.filter((r) => {
    const matchSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCategory = activeCategory === "All" || r.type === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            All Recipes
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Browse our collection of tested and trusted recipes.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipes, ingredients..."
              className="w-full pl-11 pr-5 py-3 rounded-full bg-card border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "All"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {recipeTypes.slice(0, 6).map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {categoriesEmojiesMap[c]} {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4 pb-20">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((r) => (
              <RecipeCard key={r.title} recipe={r} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-20">
            No recipes found. Try a different search.
          </p>
        )}
      </section>
    </div>
  );
};
