export const recipeCategories = [
  { name: "Breakfast", emoji: "🥞", url: "/recipes/categories/breakfast/" },
  { name: "Lunch", emoji: "🥗", url: "/recipes/categories/lunch/" },
  { name: "Dinner", emoji: "🍝", url: "/recipes/categories/dinner/" },
  { name: "Desserts", emoji: "🍰", url: "/recipes/categories/desserts/" },
  { name: "Snacks", emoji: "🥨", url: "/recipes/categories/snacks/" },
  { name: "Drinks", emoji: "🥤", url: "/recipes/categories/drinks/" },
  { name: "Vegan", emoji: "🌱", url: "/recipes/categories/vegan/" },
  {
    name: "30-Min Meals",
    emoji: "⏱️",
    url: "/recipes/categories/30-min-meals/",
  },
] as const;
export type RecipeCategory = (typeof recipeCategories)[number];

export interface Tag {
  tag: string;
  url: string;
}

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
  tags: Tag[];
}
