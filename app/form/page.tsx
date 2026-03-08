"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRecipes } from "@/app/hooks/useRecipes";
import { useBuild } from "@/app/hooks/useBuild";
import { createRecipe } from "@/lib/utils/createRecipe";
import { LoadingPage } from "@/components/LoadingPage";
import { recipeCategories } from "@/types/recipe.types";
import type { RecipeInput } from "@/lib/utils/createRecipe";

export default function FormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const { token } = useAuth();
  const { recipes, isLoading } = useRecipes();
  const build = useBuild();

  const recipeToEdit = recipes.find((r) => r.slug === slug);

  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<RecipeInput>({
    title: "",
    imageExtention: "jpg",
    category: recipeCategories[0],
    description: "",
    sections: {
      details: { prep: 0, cook: 0, servings: 1, calories: 0 },
      ingerdiants: [],
      overview: { paragraph: "" },
      instructions: { paragraph: "" },
      tips: { paragraph: "" },
      faq: { paragraph: "" },
      more: { recipes: [] },
    },
    tags: [],
  });

  useEffect(() => {
    if (!recipeToEdit) return;

    setForm({
      title: recipeToEdit.title,
      imageExtention: recipeToEdit.image.split(".")[1],
      category: recipeToEdit.category,
      description: recipeToEdit.description,
      sections: {
        details: recipeToEdit.sections.details,
        ingerdiants: recipeToEdit.sections.ingerdiants ?? [],
        overview: recipeToEdit.sections.overview ?? { paragraph: "" },
        instructions: recipeToEdit.sections.instructions ?? { paragraph: "" },
        tips: recipeToEdit.sections.tips ?? { paragraph: "" },
        faq: recipeToEdit.sections.faq ?? { paragraph: "" },
        more: recipeToEdit.sections.more ?? { recipes: [] },
      },
      tags: recipeToEdit.tags.map((t) => t.tag) ?? [],
    });
  }, [recipeToEdit]);

  const handleSubmit = async () => {
    if (!token) return setError("Unauthorized");

    if (!image && !recipeToEdit)
      return setError("Image required for new recipes");

    try {
      setLoading(true);
      setError("");

      const extension = image
        ? image.type.split("/")[1] || "jpg"
        : form.imageExtention;

      const recipe = createRecipe({
        ...form,
        imageExtention: extension,
      });

      const formData = new FormData();
      formData.append("recipe", JSON.stringify(recipe));

      if (image) formData.append("image", image);

      const res = await fetch(
        recipeToEdit
          ? `/api/recipes?slug=${recipeToEdit.slug}`
          : "/api/recipes",
        {
          method: recipeToEdit ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (!res.ok) throw new Error("Failed request");

      const returnedRecipe = await res.json();

      const updatedRecipes = recipeToEdit
        ? recipes.map((r) =>
            r.slug === returnedRecipe.slug ? returnedRecipe : r,
          )
        : [...recipes, returnedRecipe];

      await build(updatedRecipes, returnedRecipe.url);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="container mx-auto max-w-3xl py-16 px-4 space-y-6">
      <button
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors duration-200 px-3 py-2 rounded"
        onClick={() =>
          recipeToEdit ? router.replace(recipeToEdit.url) : router.replace("/")
        }
      >
        <ChevronLeft className="w-5 h-5" />
        <p className="font-medium">Go Back</p>
      </button>
      <h1 className="text-3xl font-bold mb-4">Create Recipe</h1>

      {/* Basic Info */}
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full border p-3 rounded"
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full border p-3 rounded"
      />

      {/* Category */}
      <select
        value={form.category.name}
        onChange={(e) =>
          setForm({
            ...form,
            category:
              recipeCategories.find((c) => c.name === e.target.value) ||
              recipeCategories[0],
          })
        }
        className="w-full border p-3 rounded"
      >
        {recipeCategories.map((c) => (
          <option key={c.name} value={c.name}>
            {c.emoji} {c.name}
          </option>
        ))}
      </select>

      {/* Image */}
      <div className="mt-4">
        <label className="block font-bold mb-2">Recipe Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="border p-2 rounded"
        />
        {image ? (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Preview:</p>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="mt-1 w-48 h-auto rounded shadow"
            />
          </div>
        ) : (
          recipeToEdit && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Preview:</p>
              <img
                src={recipeToEdit.image}
                alt="Preview"
                className="mt-1 w-48 h-auto rounded shadow"
              />
            </div>
          )
        )}
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Prep Time (minutes)</label>
          <input
            type="number"
            placeholder="Prep Time"
            value={form.sections.details.prep}
            onChange={(e) =>
              setForm({
                ...form,
                sections: {
                  ...form.sections,
                  details: {
                    ...form.sections.details,
                    prep: Number(e.target.value),
                  },
                },
              })
            }
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Cook Time (minutes)</label>
          <input
            type="number"
            placeholder="Cook Time"
            value={form.sections.details.cook}
            onChange={(e) =>
              setForm({
                ...form,
                sections: {
                  ...form.sections,
                  details: {
                    ...form.sections.details,
                    cook: Number(e.target.value),
                  },
                },
              })
            }
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Servings</label>
          <input
            type="number"
            placeholder="Servings"
            value={form.sections.details.servings}
            onChange={(e) =>
              setForm({
                ...form,
                sections: {
                  ...form.sections,
                  details: {
                    ...form.sections.details,
                    servings: Number(e.target.value),
                  },
                },
              })
            }
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Calories</label>
          <input
            type="number"
            placeholder="Calories"
            value={form.sections.details.calories}
            onChange={(e) =>
              setForm({
                ...form,
                sections: {
                  ...form.sections,
                  details: {
                    ...form.sections.details,
                    calories: Number(e.target.value),
                  },
                },
              })
            }
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* Ingredients */}
      <h2 className="font-bold mt-4">Ingredients</h2>
      <textarea
        placeholder="Enter each ingredient on a new line in the format: quantity, ingredient"
        value={form.sections.ingerdiants
          .map((ing) => `${ing.quantity}, ${ing.ingredient}`)
          .join("\n")}
        onChange={(e) => {
          const lines = e.target.value.split("\n");
          const newIngredients = lines
            .map((line) => {
              const [quantity, ingredient] = line
                .split(",")
                .map((s) => s.trim());
              if (!quantity && !ingredient) return null; // skip empty lines
              return { quantity: quantity || "", ingredient: ingredient || "" };
            })
            .filter(Boolean) as { quantity: string; ingredient: string }[];

          setForm({
            ...form,
            sections: { ...form.sections, ingerdiants: newIngredients },
          });
        }}
        className="w-full border p-2 rounded mb-4"
      />
      <p className="text-sm text-gray-500">
        Example: <br />
        2 cups, all-purpose flour <br />1 tbsp, sugar
      </p>

      {/* Overview */}
      <div>
        <h2 className="font-bold mt-4">About Recipe</h2>
        <textarea
          placeholder="Overview"
          value={form.sections.overview.paragraph}
          onChange={(e) =>
            setForm({
              ...form,
              sections: {
                ...form.sections,
                overview: { paragraph: e.target.value },
              },
            })
          }
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Instructions */}
      <div>
        <h2 className="font-bold mt-4">How To Make</h2>
        <textarea
          placeholder="Instructions"
          value={form.sections.instructions.paragraph}
          onChange={(e) =>
            setForm({
              ...form,
              sections: {
                ...form.sections,
                instructions: { paragraph: e.target.value },
              },
            })
          }
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Tips */}
      <div>
        <h2 className="font-bold mt-4">Pro Tips</h2>
        <textarea
          placeholder="Tips"
          value={form.sections.tips.paragraph}
          onChange={(e) =>
            setForm({
              ...form,
              sections: {
                ...form.sections,
                tips: { paragraph: e.target.value },
              },
            })
          }
          className="w-full border p-2 rounded"
        />
      </div>

      {/* FAQ */}
      <div>
        <h2 className="font-bold mt-4">FAQ</h2>
        <textarea
          placeholder="FAQ"
          value={form.sections.faq.paragraph}
          onChange={(e) =>
            setForm({
              ...form,
              sections: {
                ...form.sections,
                faq: { paragraph: e.target.value },
              },
            })
          }
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Related Recipes */}
      <h2 className="font-bold mt-4">Related Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {recipes.map((r) => {
          const isChecked = form.sections.more.recipes.some(
            (mr) => mr.title === r.title,
          );

          return (
            <label
              key={r.title}
              className="flex items-center gap-2 border p-2 rounded cursor-pointer"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => {
                  let updatedRecipes;
                  if (e.target.checked) {
                    // Add recipe
                    updatedRecipes = [
                      ...form.sections.more.recipes,
                      { title: r.title, url: r.url },
                    ];
                  } else {
                    // Remove recipe
                    updatedRecipes = form.sections.more.recipes.filter(
                      (mr) => mr.title !== r.title,
                    );
                  }
                  setForm({
                    ...form,
                    sections: {
                      ...form.sections,
                      more: { recipes: updatedRecipes },
                    },
                  });
                }}
              />
              {r.title}
            </label>
          );
        })}
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Select one or more related recipes
      </p>

      {/* Tags */}
      <h2 className="font-bold mt-4">Tags</h2>
      <input
        placeholder="Add tags for your recipe, separated by commas (e.g., breakfast, quick, family-friendly)"
        value={form.tags.join(", ")}
        onChange={(e) =>
          setForm({
            ...form,
            tags: e.target.value.split(",").map((t) => t.trim()),
          })
        }
        className="w-full border p-2 rounded"
      />

      {/* Submit */}
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded"
      >
        {loading ? "Creating..." : "Create Recipe"}
      </button>
    </div>
  );
}
