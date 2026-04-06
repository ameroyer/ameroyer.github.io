import { defineCollection, z } from 'astro:content';

const publications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    year: z.number(),
    selected: z.boolean().optional().default(false),
    paperurl: z.string().optional(),
    slides: z.string().optional(),
    poster: z.string().optional(),
    code: z.string().optional(),
    demo: z.string().optional(),
    teaser: z.string().optional(),
    bibtex: z.string().optional(),
  }),
});

const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    github: z.string().optional(),
    languages: z.union([z.array(z.string()), z.string()]).transform((val) =>
      Array.isArray(val) ? val : [val]
    ).optional().default([]),
    thumb: z.string().optional(),
    twitter_summary: z.string().optional(),
    kaggle: z.string().optional(),
    colab: z.string().optional(),
    download: z.string().optional(),
  }),
});

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional().default([]),
    categories: z.union([z.array(z.string()), z.string()]).transform((val) =>
      Array.isArray(val) ? val : [val]
    ).optional().default([]),
    category: z.string().optional(),
    author: z.string().optional(),
    venue: z.string().optional(),
    paperurl: z.string().optional(),
    thumb: z.string().optional(),
    year: z.number().optional(),
  }),
});

export const collections = { publications, portfolio, posts };
