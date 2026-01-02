import matter from "gray-matter";
import { marked } from "marked";
import { Buffer } from "buffer";

const globalAny = globalThis as unknown as { Buffer?: typeof Buffer };
if (typeof globalAny.Buffer === "undefined") {
  globalAny.Buffer = Buffer;
}

interface FrontMatter {
  title?: string;
  slug?: string;
  meta_description?: string;
  excerpt?: string;
  category?: string;
  keyword?: string;
  published_at?: string;
  read_time_minutes?: number;
  hero_image?: string;
  hero_image_alt?: string;
  author?: string;
  tags?: unknown;
  featured?: boolean;
  cta?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  keyword: string;
  publishedAt: string;
  publishedAtDisplay: string;
  readTimeMinutes: number;
  readTimeLabel: string;
  heroImage: string;
  heroImageAlt: string;
  author: string;
  tags: string[];
  featured: boolean;
  cta: string;
  markdown: string;
  html: string;
}

const markdownModules = import.meta.glob("../../content/blog/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

function parseMarkdown(filePath: string, raw: string): BlogPost {
  const parsed = matter(raw);
  const data = parsed.data as FrontMatter;
  const content = String(parsed.content ?? "").trim();
  const slugCounts = new Map<string, number>();
  const generateId = (heading: string) => {
    const base = heading
      .toLowerCase()
      .trim()
      .replace(/[\s]+/g, "-")
      .replace(/[^\w-]/g, "");
    const hit = slugCounts.get(base) ?? 0;
    slugCounts.set(base, hit + 1);
    return hit === 0 ? base : `${base}-${hit}`;
  };
  const renderer = new marked.Renderer();
  renderer.heading = (text, level, rawHeading) => {
    const id = generateId(String(rawHeading ?? text));
    return `<h${level} id="${id}">${text}</h${level}>`;
  };

  const fallbackSlug = filePath.split("/").pop()?.replace(/\.md$/, "") ?? "";
  const slug =
    typeof data.slug === "string" && data.slug.trim().length > 0 ? data.slug.trim() : fallbackSlug;
  const title = typeof data.title === "string" && data.title.trim().length > 0 ? data.title.trim() : slug;
  const category = typeof data.category === "string" && data.category.trim().length > 0 ? data.category.trim() : "General";
  const metaDescription =
    typeof data.meta_description === "string" ? data.meta_description.trim() : "";
  const excerpt = typeof data.excerpt === "string" && data.excerpt.trim().length > 0 ? data.excerpt.trim() : metaDescription;
  const keyword = typeof data.keyword === "string" ? data.keyword.trim() : "";
  const publishedAt =
    typeof data.published_at === "string" && data.published_at.trim().length > 0
      ? data.published_at.trim()
      : new Date().toISOString().slice(0, 10);
  const readTimeMinutes = typeof data.read_time_minutes === "number" ? data.read_time_minutes : 5;
  const heroImage = typeof data.hero_image === "string" ? data.hero_image.trim() : "";
  const heroImageAlt =
    typeof data.hero_image_alt === "string" && data.hero_image_alt.trim().length > 0
      ? data.hero_image_alt.trim()
      : title;
  const author = typeof data.author === "string" && data.author.trim().length > 0 ? data.author.trim() : "Lounge Asia Team";
  const featured = Boolean(data.featured);
  const cta = typeof data.cta === "string" && data.cta.trim().length > 0 ? data.cta.trim() : "Reserve your place with Lounge Asia today.";
  const tags = Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === "string") : [];

  const publishedAtDisplay = new Date(`${publishedAt}T00:00:00Z`).toLocaleDateString(
    "en-AU",
    { day: "2-digit", month: "2-digit", year: "numeric" }
  );
  const readTimeLabel = `${readTimeMinutes} min read`;

  const html = marked.parse(content, { renderer });

  return {
    slug,
    title,
    metaDescription,
    excerpt,
    category,
    keyword,
    publishedAt,
    publishedAtDisplay,
    readTimeMinutes,
    readTimeLabel,
    heroImage,
    heroImageAlt,
    author,
    tags,
    featured,
    cta,
    markdown: content,
    html: String(html),
  };
}

const posts: BlogPost[] = Object.entries(markdownModules).map(([path, raw]) =>
  parseMarkdown(path, raw as string)
);

posts.sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));

export const allPosts: readonly BlogPost[] = posts;

export function getAllPosts(): BlogPost[] {
  return [...allPosts];
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string): {
  previous?: BlogPost;
  next?: BlogPost;
} {
  const index = allPosts.findIndex((post) => post.slug === slug);
  if (index === -1) return {};
  return {
    previous: allPosts[index + 1],
    next: allPosts[index - 1],
  };
}

export function getCategories(): string[] {
  const categories = new Set<string>();
  categories.add("All");
  allPosts.forEach((post) => categories.add(post.category));
  return Array.from(categories);
}
