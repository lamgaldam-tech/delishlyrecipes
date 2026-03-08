"use client";
import { useEffect, useState } from "react";
import type { Recipe } from "@/types/recipe.types";

export function useRecipes() {
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

  return { recipes, isLoading };
}
