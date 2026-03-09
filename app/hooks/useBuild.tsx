"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { renderToString } from "react-dom/server";
import { useAuth } from "@/app/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Home } from "@/views/Home";
import { About } from "@/views/About";
import { Contact } from "@/views/Contact";
import { PrivacyPolicy } from "@/views/PrivacyPolicy";
import { TermsOfService } from "@/views/TermsOfService";
import { Recipes } from "@/views/Recipes";
import { RecipePage } from "@/views/Recipe";
import { SubRecipes } from "@/views/SubRecipes";
import { recipeCategories } from "@/types/recipe.types";
import type { ReactElement } from "react";
import type { Page } from "@/types/page.types";
import type { Recipe, Tag } from "@/types/recipe.types";

const BASE_URL = "https://delishlyrecipes.com";

const header = (
  title: string,
  description: string,
  url: string,
  pageType: "normal" | "list" | "recipe" = "normal",
  itemList?: Recipe[],
  image: string = `${BASE_URL}/icon.jpg`,
  recipe?: Recipe,
) => {
  const ogType = pageType === "recipe" ? "article" : "website";

  let jsonLD: any = {};

  if (pageType === "recipe" && recipe) {
    jsonLD = {
      "@context": "https://schema.org",
      "@type": "Recipe",
      name: recipe.title,
      description: recipe.description,
      image: `${BASE_URL}${recipe.image}`,
      author: { "@type": "Organization", name: "Delishly Recipes" },
      publisher: {
        "@type": "Organization",
        name: "Delishly Recipes",
        logo: { "@type": "ImageObject", url: `${BASE_URL}/icon.jpg` },
      },
      recipeIngredient: recipe.sections.ingerdiants.map(
        (i) => `${i.quantity} ${i.ingredient}`,
      ),
      recipeInstructions: recipe.sections.instructions.paragraph
        .split("\n")
        .map((step) => step.trim())
        .filter((s) => s)
        .map((step) => ({ "@type": "HowToStep", text: step })),
      prepTime: `PT${recipe.sections.details.prep}M`,
      cookTime: `PT${recipe.sections.details.cook}M`,
      totalTime: `PT${
        recipe.sections.details.prep + recipe.sections.details.cook
      }M`,
      recipeYield: `${recipe.sections.details.servings} servings`,
      keywords: recipe.tags || [],
    };
  } else if (pageType === "list" && itemList) {
    jsonLD = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: title,
      description,
      url: `${BASE_URL}${url}`,
      itemListElement: itemList.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${BASE_URL}${item.url}`,
      })),
    };
  } else {
    jsonLD = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: `${BASE_URL}${url}`,
      author: { "@type": "Organization", name: "Delishly Recipes" },
      publisher: {
        "@type": "Organization",
        name: "Delishly Recipes",
        logo: { "@type": "ImageObject", url: `${BASE_URL}/icon.jpg` },
      },
    };
  }

  return `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${description}">
    <title>${title}</title>
    <link rel="icon" href="/icon.jpg" type="image/x-icon">
    <link rel="canonical" href="${BASE_URL}${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${BASE_URL}${url}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <script type="application/ld+json">
    ${JSON.stringify(jsonLD, null, 2)}
    </script>
  `;
};

const body = (Main: ReactElement, includeHeader: boolean = true) => {
  const stringComponent = (element: ReactElement) =>
    renderToString(element).replace(/\sclass="[^"]*"/g, "");
  const header = stringComponent(<Navbar />);
  const footer = stringComponent(<Footer />);
  return `${includeHeader ? header + "\n" : ""}${stringComponent(Main)}\n${footer}`;
};

const mainPages = (recipes: Recipe[]): Page[] => [
  {
    html: "index.html",
    script: "./src/HomeMain.tsx",
    header: header(
      "Delishly Recipes – Easy & Delicious Recipes for Every Meal",
      "Discover tested and easy-to-follow recipes for breakfast, lunch, dinner, desserts, and more. Cook smarter and eat better with Delishly Recipes.",
      "/",
    ),
    body: body(<Home recipes={recipes} />),
  },
  {
    html: "about/index.html",
    script: "../src/AboutMain.tsx",
    header: header(
      "About Delishly Recipes – Our Story & Mission",
      "Learn about Delishly Recipes, our passion for cooking, and our mission to provide reliable, delicious, and easy recipes for home cooks everywhere.",
      "/about/",
    ),
    body: body(<About />),
  },
  {
    html: "contact/index.html",
    script: "../src/ContactMain.tsx",
    header: header(
      "About Delishly Recipes – Our Story & Mission",
      "Learn about Delishly Recipes, our passion for cooking, and our mission to provide reliable, delicious, and easy recipes for home cooks everywhere.",
      "/contact/",
    ),
    body: body(<Contact />),
  },
  {
    html: "privacy-policy/index.html",
    script: "../src/PrivacyPolicyMain.tsx",
    header: header(
      "Privacy Policy – Delishly Recipes",
      "Read Delishly Recipes' privacy policy to understand how we collect, use, and protect your personal information when using our website and services.",
      "/privacy-policy/",
    ),
    body: body(<PrivacyPolicy />),
  },
  {
    html: "terms-of-service/index.html",
    script: "../src/TermsOfServiceMain.tsx",
    header: header(
      "Terms of Service – Delishly Recipes",
      "Review the terms of service for Delishly Recipes. Learn about your rights, responsibilities, and the rules for using our website and services safely and responsibly.",
      "/terms-of-service/",
    ),
    body: body(<TermsOfService />),
  },
  {
    html: "recipes/index.html",
    script: "../src/RecipesMain.tsx",
    header: header(
      "All Recipes – Browse Delicious & Tested Recipes | Delishly Recipes",
      "Explore our collection of breakfast, lunch, dinner, dessert, and quick meal recipes. Find step-by-step instructions and tips to cook delicious meals at home.",
      "/recipes/",
      "list",
      recipes,
    ),
    body: body(<Recipes recipes={recipes} />),
  },
];

const recipePages = (recipes: Recipe[], tags: Tag[]): Page[] =>
  recipes.map((recipe) => ({
    html: `recipes/${recipe.slug}/index.html`,
    script: "../../src/RecipeMain.tsx",
    header: header(
      `${recipe.title} Recipe – Easy & Delicious ${recipe.category.name} | Delishly Recipes`,
      `Learn how to make ${recipe.title}, a ${recipe.category.name} recipe with step-by-step instructions, prep time, and tips. Perfect for home cooking!`,
      recipe.url,
      "recipe",
      undefined,
      `${BASE_URL}${recipe.image}`,
      recipe,
    ),
    body: body(<RecipePage recipe={recipe} tags={tags} />, false),
  }));

const categoriesPages = (recipes: Recipe[]): Page[] =>
  recipeCategories.map((category) => {
    const subRecipes = recipes.filter((r) => r.category.name === category.name);
    return {
      html: `${category.url.slice(1)}index.html`,
      script: "../../../src/SubRecipesMain.tsx",
      header: header(
        `${category.name} Recipes | Delishly`,
        `Discover ${subRecipes.length} delicious ${category.name} recipes. Browse easy, healthy, and flavorful ${category.name} dishes to cook at home.`,
        category.url,
        "list",
        subRecipes,
      ),
      body: body(
        <SubRecipes
          type="categories"
          name={category.name}
          recipes={subRecipes}
        />,
      ),
    };
  });

const tagsPages = (recipes: Recipe[], tags: Tag[]): Page[] =>
  tags.map((tag) => {
    const subRecipes = recipes.filter((r) =>
      r.tags.map((t) => t.tag).includes(tag.tag),
    );
    return {
      html: `${tag.url.slice(1)}index.html`,
      script: "../../../src/SubRecipesMain.tsx",
      header: header(
        `${tag.tag} Recipes | Delishly`,
        `Explore ${subRecipes.length} recipes tagged with &quot;${tag.tag}&quot;. Find quick, tasty, and creative recipes related to ${tag.tag}.`,
        tag.url,
        "list",
        subRecipes,
      ),
      body: body(
        <SubRecipes type="tags" name={tag.tag} recipes={subRecipes} />,
      ),
    };
  });

export function useBuild() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { token } = useAuth();
  const deploy = searchParams.get("deploy");

  async function build(recipes: Recipe[], redirect: string = "/") {
    const tags = Array.from(new Set(recipes.flatMap((r) => r.tags)));
    const pages = [
      ...mainPages(recipes),
      ...recipePages(recipes, tags),
      ...categoriesPages(recipes),
      ...tagsPages(recipes, tags),
    ];
    const url = `/api/build?deploy=${deploy}`;
    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pages),
    });
    router.replace(redirect);
  }

  return build;
}
