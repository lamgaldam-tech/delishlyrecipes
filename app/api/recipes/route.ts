import { NextResponse } from "next/server";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import { RecipesDB } from "@/lib/db/recipesDB";
import { ImagesDB } from "@/lib/db/imagesDB";
import type { Recipe } from "@/types/recipe.types";

export const GET = async () => {
  const recipes = await RecipesDB.get();
  return NextResponse.json(recipes);
};

export const POST = async (req: Request) => {
  try {
    try {
      authMiddleware(req);
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const recipeString = formData.get("recipe");
    const imageFile = formData.get("image") as File | null;

    if (!recipeString) {
      return NextResponse.json({ error: "Recipe missing" }, { status: 400 });
    }

    const recipe: Recipe = JSON.parse(recipeString as string);
    if (!recipe.slug) {
      return NextResponse.json(
        { error: "Recipe slug is required" },
        { status: 400 },
      );
    }

    try {
      await RecipesDB.add(recipe);
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Recipes DB failed" }, { status: 500 });
    }

    if (imageFile) {
      try {
        await ImagesDB.add(recipe.slug, imageFile);
      } catch (err) {
        console.error(err);
        return NextResponse.json(
          { error: "Images DB failed" },
          { status: 500 },
        );
      }
    }

    return NextResponse.json(recipe);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  try {
    try {
      authMiddleware(req);
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const imageFile = formData.get("image") as File | null;
    const recipeString = formData.get("recipe");
    const recipe: Recipe = JSON.parse(recipeString as string);

    if (!recipe) {
      return NextResponse.json({ error: "Recipe missing" }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json(
        { error: "Recipe slug is required" },
        { status: 400 },
      );
    }

    let updatedRecipe: Recipe;
    try {
      updatedRecipe = await RecipesDB.update(slug, recipe);
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Recipes DB failed" }, { status: 500 });
    }

    if (imageFile) {
      try {
        await ImagesDB.update(slug, recipe.slug, imageFile);
      } catch (err) {
        console.error(err);
        return NextResponse.json(
          { error: "Images DB failed" },
          { status: 500 },
        );
      }
    }

    return NextResponse.json(updatedRecipe);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    try {
      authMiddleware(req);
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json({ error: "Slug required" }, { status: 400 });
    }

    try {
      await RecipesDB.delete(slug);
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Recipes DB failed" }, { status: 500 });
    }

    try {
      await ImagesDB.delete(slug);
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Images DB failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
