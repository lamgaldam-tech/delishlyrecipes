import { useState } from "react";
import {
  Clock,
  Users,
  Flame,
  Printer,
  ArrowLeft,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Recipe } from "../types/recipes";

interface RecipeProps {
  recipe: Recipe;
}

export const RecipeDetail = ({ recipe }: RecipeProps) => {
  const [servingMultiplier, setServingMultiplier] = useState(1);
  const adjustedServings = recipe.servings * servingMultiplier;

  return (
    <>
      <div className="relative h-[50vh] md:h-[60vh]">
        <img
          src={recipe.thumbnail}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <button
              onClick={() => (window.location.href = "/recipes/")}
              className="inline-flex items-center gap-1.5 text-sm text-background/80 hover:text-background mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All Recipes
            </button>
            <span className="block text-xs font-medium text-primary bg-primary/20 px-3 py-1 rounded-full w-fit mb-3">
              {recipe.type}
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-background max-w-2xl">
              {recipe.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {recipe.description}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Clock, label: "Prep", value: `${recipe.prep} min` },
                { icon: Clock, label: "Cook", value: `${recipe.cook} min` },
                {
                  icon: Users,
                  label: "Servings",
                  value: String(adjustedServings),
                },
                {
                  icon: Flame,
                  label: "Calories",
                  value: String(
                    Math.round(recipe.calories * servingMultiplier),
                  ),
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-secondary/50 rounded-xl p-4 text-center"
                >
                  <s.icon className="w-5 h-5 mx-auto text-primary mb-2" />
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="font-semibold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Instructions
              </h2>
              <ol className="space-y-6">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <p className="text-foreground/80 leading-relaxed pt-1">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Ingredients */}
            <div className="bg-card rounded-xl shadow-card p-6 sticky top-20">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-xl font-bold text-foreground">
                  Ingredients
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setServingMultiplier(
                        Math.max(0.5, servingMultiplier - 0.5),
                      )
                    }
                    className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-medium text-foreground w-6 text-center">
                    {servingMultiplier}x
                  </span>
                  <button
                    onClick={() =>
                      setServingMultiplier(servingMultiplier + 0.5)
                    }
                    className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <ul className="space-y-3">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-foreground/80">
                      <strong className="text-foreground">
                        {ing.quantity}
                      </strong>{" "}
                      {ing.item}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="w-full mt-6 rounded-full"
                onClick={() => window.print()}
              >
                <Printer className="w-4 h-4 mr-2" /> Print Recipe
              </Button>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-display text-sm font-semibold text-foreground mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-secondary text-muted-foreground px-3 py-1.5 rounded-full"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
