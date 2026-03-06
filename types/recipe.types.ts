export const recipeCategories = [
  { name: "Breakfast", emoji: "🥞" },
  { name: "Lunch", emoji: "🥗" },
  { name: "Dinner", emoji: "🍝" },
  { name: "Desserts", emoji: "🍰" },
  { name: "Snacks", emoji: "🥨" },
  { name: "Drinks", emoji: "🥤" },
  { name: "Vegan", emoji: "🌱" },
  { name: "30-Min Meals", emoji: "⏱️" },
] as const;
export type RecipeCategory = (typeof recipeCategories)[number];

export interface Recipe {
  title: string;
  slug: string;
  url: string;
  image: string;
  category: RecipeCategory;
  description: string;
  sections: {
    details: {
      prep: number;
      cook: number;
      servings: number;
      calories: number;
    };
    ingerdiants: {
      quantity: string;
      ingredient: string;
    }[];
    overview: {
      header: string;
      paragraph: string;
    };
    instructions: {
      header: string;
      paragraph: string;
    };
    tips: {
      header: string;
      paragraph: string;
    };
    faq: {
      header: string;
      paragraph: string;
    };
    more: {
      header: string;
      recipes: {
        title: string;
        url: string;
      }[];
    };
  };
  tags: string[];
}
