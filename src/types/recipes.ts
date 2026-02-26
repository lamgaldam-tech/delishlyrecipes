export const recipeTypes = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Desserts",
  "Snacks",
  "Drinks",
  "Vegan",
  "30-Min Meals"
] as const;
export type RecipeType = (typeof recipeTypes)[number];

export interface Recipe {
  title: string;
  type: RecipeType;
  description: string;
  thumbnail: string;
  prep: number;
  cook: number;
  servings: number;
  calories: number;
  ingredients: {
    quantity: string;
    item: string;
  }[];
  instructions: string[];
  tags: string[];
}
