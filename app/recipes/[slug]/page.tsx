"use client";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRecipes } from "@/app/contexts/RecipesContext";
import { RecipePage } from "@/views/Recipe";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const { token } = useAuth();
  const slug = params?.slug;
  const recipe = useRecipes().find((r) => r.slug === slug);

  const handleDelete = async () => {
    if (!slug) return;

    try {
      const response = await fetch("/api/recipes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ slug }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Delete failed:", data.error);
        alert(`Failed to delete recipe: ${data.error}`);
        return;
      }

      router.replace("/");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred while deleting the recipe.");
    }
  };

  if (!recipe)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center gap-4">
        <p className="text-xl font-semibold">Recipe not found</p>
        <button
          onClick={() => router.replace("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Go back home
        </button>
      </div>
    );

  return (
    <>
      <RecipePage recipe={recipe} />
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <button
          onClick={() => router.replace(`/form?slug=${recipe.slug}`)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </>
  );
}
