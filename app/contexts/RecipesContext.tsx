"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Loader2 } from "lucide-react";
import type { Recipe } from "@/types/recipe.types";

const RecipesContext = createContext<Recipe[] | undefined>(undefined);

type RecipesProviderProps = {
  children: ReactNode;
};

export const RecipesProvider = ({ children }: RecipesProviderProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch("/api/recipes");
      if (!res.ok) throw new Error();
      const data = (await res.json()) as Recipe[];
      setRecipes(data);
      setIsLoading(false);
    };
    fetchRecipes();
  }, []);

  return (
    <RecipesContext.Provider value={recipes}>
      {isLoading ? (
        <div className="min-h-screen w-full bg-primary text-text-primary flex items-center justify-center px-4">
          <Loader2 className="animate-spin" size={24} />
        </div>
      ) : (
        children
      )}
    </RecipesContext.Provider>
  );
};

export const useRecipes = (): Recipe[] => {
  const context = useContext(RecipesContext);

  if (!context) {
    throw new Error("useRecipes must be used within RecipesProvider");
  }

  return context;
};
