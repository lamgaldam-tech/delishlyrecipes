"use client";
import { useEffect } from "react";
import { useRecipes } from "@/app/hooks/useRecipes";
import { useBuild } from "@/app/hooks/useBuild";
import { LoadingPage } from "@/components/LoadingPage";

export default function BuildPage() {
  const build = useBuild();
  const { recipes, isLoading } = useRecipes();

  useEffect(() => {
    if (!recipes.length || isLoading) return;
    build(recipes);
  }, [recipes, isLoading]);

  return isLoading ? <LoadingPage /> : <></>;
}
