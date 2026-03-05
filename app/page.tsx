"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRecipes } from "@/app/contexts/RecipesContext";
import { Recipes } from "@/views/Recipes";

export default function Page() {
  const router = useRouter();
  const { logout } = useAuth();
  const recipes = useRecipes();

  return (
    <>
      {/* Logout */}
      <button
        onClick={logout}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow"
      >
        Logout
      </button>

      {/* Add Recipe */}
      <button
        onClick={() => router.replace("/form")}
        className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-lg shadow"
      >
        + Add Recipe
      </button>
      <Recipes recipes={recipes} />
    </>
  );
}
