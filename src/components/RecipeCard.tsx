import { Clock } from "lucide-react";
import type { Recipe } from "@/types/recipe.types";

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

export const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => (
  <button
    onClick={() => onClick(recipe)}
    className="group block bg-card rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
  >
    <div className="aspect-4/3 overflow-hidden">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>

    <div className="p-5">
      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">
        <span>{recipe.category.emoji}</span>
        <span>{recipe.category.name}</span>
      </span>

      <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {recipe.title}
      </h3>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {recipe.description}
      </p>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {recipe.sections.details.prep + recipe.sections.details.cook} min
        </span>
      </div>
    </div>
  </button>
);
