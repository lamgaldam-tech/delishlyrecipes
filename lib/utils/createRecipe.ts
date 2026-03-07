import type { Recipe, RecipeCategory } from "@/types/recipe.types";

export interface RecipeInput {
  title: string;
  imageExtention: string;
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
      paragraph: string;
    };
    instructions: {
      paragraph: string;
    };
    tips: {
      paragraph: string;
    };
    faq: {
      paragraph: string;
    };
    more: {
      recipes: {
        title: string;
        url: string;
      }[];
    };
  };

  tags: string[];
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export const createRecipe = (input: RecipeInput): Recipe => {
  const slug = slugify(input.title);

  return {
    title: input.title,
    slug,
    url: `/recipes/${slug}/`,
    image: `/images/${slug}.${input.imageExtention}`,
    category: input.category,
    description: input.description,

    sections: {
      details: input.sections.details,
      ingerdiants: input.sections.ingerdiants,

      overview: {
        header: `About ${input.title}`,
        paragraph: input.sections.overview.paragraph,
      },

      instructions: {
        header: `How to Make`,
        paragraph: input.sections.instructions.paragraph,
      },

      tips: {
        header: `Pro Tips`,
        paragraph: input.sections.tips.paragraph,
      },

      faq: {
        header: `FAQ`,
        paragraph: input.sections.faq.paragraph,
      },

      more: {
        header: `More Like ${input.title}`,
        recipes: input.sections.more.recipes,
      },
    },

    tags: input.tags.map((t) => ({
      tag: t,
      url: `/recipes/tags/${slugify(t)}/`,
    })),
  };
};
