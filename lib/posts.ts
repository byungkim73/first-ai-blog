import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type PostSummary = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  excerpt: string;
};

export type Post = PostSummary & {
  contentHtml: string;
};

type Frontmatter = {
  title?: string;
  date?: string;
  excerpt?: string;
};

function parseMarkdownFile(fileContent: string) {
  const frontmatterMatch = fileContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  const frontmatter = frontmatterMatch?.[1] ?? "";
  const content = fileContent.slice(frontmatterMatch?.[0].length ?? 0);

  const data = frontmatter.split("\n").reduce<Frontmatter>((acc, line) => {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      return acc;
    }

    const key = line.slice(0, separatorIndex).trim() as keyof Frontmatter;
    const value = line
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^["']|["']$/g, "");

    if (key === "title" || key === "date" || key === "excerpt") {
      acc[key] = value;
    }

    return acc;
  }, {});

  return { data, content };
}

function getPostSlug(fileName: string) {
  return fileName.replace(/\.md$/, "");
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

function getPostSummary(fileName: string): PostSummary {
  const slug = getPostSlug(fileName);
  const fullPath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(fullPath, "utf8");
  const { data } = parseMarkdownFile(fileContent);

  if (!data.title || !data.date || !data.excerpt) {
    throw new Error(`${fileName} is missing title, date, or excerpt frontmatter.`);
  }

  return {
    slug,
    title: data.title,
    date: data.date,
    dateLabel: formatDate(data.date),
    excerpt: data.excerpt,
  };
}

export function getAllPosts() {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(getPostSummary)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "");
  const fullPath = path.join(postsDirectory, `${safeSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(fullPath, "utf8");
  const { data, content } = parseMarkdownFile(fileContent);

  if (!data.title || !data.date || !data.excerpt) {
    throw new Error(`${safeSlug}.md is missing title, date, or excerpt frontmatter.`);
  }

  return {
    slug: safeSlug,
    title: data.title,
    date: data.date,
    dateLabel: formatDate(data.date),
    excerpt: data.excerpt,
    contentHtml: await marked.parse(content),
  };
}
