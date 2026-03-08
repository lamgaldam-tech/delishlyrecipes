import type { Recipe } from "@/types/recipe.types";

interface SubRecipesProps {
  type: "tags" | "categories";
  name: string;
  recipes: Recipe[];
}

export const SubRecipes = ({ type, name, recipes }: SubRecipesProps) => {
  const formattedName = name
    .replace(/-/g, " ")
    .replace(/^./, (char) => char.toUpperCase());

  const title =
    type === "tags"
      ? `Recipes Tagged "${formattedName}"`
      : `Recipes in "${formattedName}" Category`;

  const description =
    type === "tags"
      ? `Explore ${recipes.length} delicious recipes tagged with "${formattedName}". Find ingredients, steps, and tips for easy cooking.`
      : `Discover ${recipes.length} tasty recipes in the "${formattedName}" category. Perfect for meal inspiration and cooking tips.`;

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          {title}
        </h1>
        <p className="text-muted-foreground text-lg mb-12">{description}</p>

        <div className="space-y-8">
          {recipes.map((r) => (
            <a
              key={r.slug}
              href={r.url}
              className="group block bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border"
            >
              <div className="md:flex">
                <div className="md:w-2/5">
                  <img
                    src={r.image}
                    alt={r.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 md:w-3/5 flex flex-col justify-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                    {r.category.name}
                  </span>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                    {r.title}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {r.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
};
