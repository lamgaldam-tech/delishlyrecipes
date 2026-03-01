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
import type { Recipe } from "@/types/recipe.types";

interface RecipeProps {
  recipe: Recipe;
}

export const RecipePage = ({ recipe }: RecipeProps) => {
  const [servingMultiplier, setServingMultiplier] = useState(1);

  const details = recipe.sections.details;
  const adjustedServings = details.servings * servingMultiplier;

  const Paragraph = (paragraph: string): React.ReactNode => {
    if (!recipe.links || recipe.links.length === 0) return paragraph;

    // Escape all keywords for regex
    const escapedKeywords = recipe.links.map((link) =>
      link.keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    );

    const regex = new RegExp(`\\b(${escapedKeywords.join("|")})\\b`, "gi");

    const parts = paragraph.split(regex);

    return parts.map((part, index) => {
      // Find matching link object
      const match = recipe.links.find(
        (link) => link.keyword.toLowerCase() === part.toLowerCase(),
      );

      if (match) {
        return (
          <a
            key={index}
            href={match.url}
            className="text-primary font-medium underline underline-offset-4 decoration-2 
                     hover:text-primary/70 hover:decoration-primary/60 
                     transition-all duration-200"
          >
            {part}
          </a>
        );
      }

      return part;
    });
  };

  return (
    <>
      {/* Hero */}
      <header className="relative h-[50vh] md:h-[60vh]">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-foreground/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            {/* Back Button */}
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-background/80 hover:text-background mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All Recipes
            </a>

            {/* Category */}
            <span className="inline-flex items-center gap-2 mx-4 text-xs font-medium text-primary bg-primary/20 px-3 py-1 rounded-full mb-3">
              <span>{recipe.category.emoji}</span>
              <span>{recipe.category.name}</span>
            </span>

            <h1 className="font-display text-3xl md:text-5xl font-bold text-background max-w-2xl">
              {recipe.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {Paragraph(recipe.description)}
              </p>
            </section>

            {/* Quick Stats */}
            <section
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              aria-label="Recipe Quick Stats"
            >
              {/* Prep */}
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <Clock className="w-5 h-5 mx-auto text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Prep</p>
                <time dateTime={`PT${details.prep}M`}>{details.prep} min</time>
              </div>

              {/* Cook */}
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <Clock className="w-5 h-5 mx-auto text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Cook</p>
                <time dateTime={`PT${details.cook}M`}>{details.cook} min</time>
              </div>

              {/* Servings */}
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <Users className="w-5 h-5 mx-auto text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Servings</p>
                <p className="font-semibold text-foreground">
                  {adjustedServings}
                </p>
              </div>

              {/* Calories */}
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <Flame className="w-5 h-5 mx-auto text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Calories</p>
                <p className="font-semibold text-foreground">
                  {Math.round(details.calories * servingMultiplier)}
                </p>
              </div>
            </section>

            {/* Overview */}
            <section aria-labelledby="overview-header">
              <h2
                id="overview-header"
                className="font-display text-2xl font-bold text-foreground mb-4"
              >
                {recipe.sections.overview.header}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {Paragraph(recipe.sections.overview.paragraph)}
              </p>
            </section>

            {/* Instructions */}
            <section aria-labelledby="instructions-header">
              <h2
                id="instructions-header"
                className="font-display text-2xl font-bold text-foreground mb-6"
              >
                {recipe.sections.instructions.header}
              </h2>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                {Paragraph(recipe.sections.instructions.paragraph)}
              </p>
            </section>

            {/* Tips */}
            <section aria-labelledby="tips-header">
              <h2
                id="tips-header"
                className="font-display text-2xl font-bold text-foreground mb-6"
              >
                {recipe.sections.tips.header}
              </h2>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                {Paragraph(recipe.sections.tips.paragraph)}
              </p>
            </section>

            {/* FAQ */}
            <section aria-labelledby="faq-header">
              <h2
                id="faq-header"
                className="font-display text-2xl font-bold text-foreground mb-6"
              >
                {recipe.sections.faq.header}
              </h2>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                {Paragraph(recipe.sections.faq.paragraph)}
              </p>
            </section>

            {/* More Like */}
            <section
              aria-labelledby="more-like-header"
              className="flex flex-col gap-3"
            >
              <h2
                id="more-like-header"
                className="font-display text-2xl font-bold text-foreground mb-6"
              >
                {recipe.sections.more.header}
              </h2>
              {recipe.sections.more.recipes.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  className="group inline-block text-primary font-medium 
                 underline underline-offset-4 decoration-2
                 hover:text-primary/70 hover:decoration-primary/60
                 transition-all duration-200"
                >
                  {r.title}
                </a>
              ))}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Ingredients */}
            <section
              className="bg-card rounded-xl shadow-card p-6 top-20"
              aria-labelledby="ingredients-header"
            >
              <header className="flex items-center justify-between mb-5">
                <h2
                  id="ingredients-header"
                  className="font-display text-xl font-bold text-foreground"
                >
                  Ingredients
                </h2>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setServingMultiplier(
                        Math.max(0.5, servingMultiplier - 0.5),
                      )
                    }
                    className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>

                  <span className="text-sm font-medium w-6 text-center">
                    {servingMultiplier}x
                  </span>

                  <button
                    onClick={() =>
                      setServingMultiplier(servingMultiplier + 0.5)
                    }
                    className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </header>

              <ul className="space-y-3">
                {recipe.sections.ingerdiants.map((ing, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-foreground/80">
                      <strong className="text-foreground">
                        {!isNaN(Number(ing.quantity.split(" ")[0]))
                          ? `${Number(ing.quantity.split(" ")[0]) * servingMultiplier} ${ing.quantity.split(" ").slice(1).join(" ")}`
                          : ing.quantity}
                      </strong>{" "}
                      {ing.ingrediant}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full mt-6 flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-lg"
                onClick={() => window.print()}
              >
                <Printer className="w-4 h-4" />
                Print Recipe
              </button>
            </section>

            {/* Tags */}
            <section aria-labelledby="tags-header">
              <h3
                id="tags-header"
                className="font-display text-sm font-semibold text-foreground mb-3"
              >
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
            </section>
          </aside>
        </div>
      </main>
    </>
  );
};
