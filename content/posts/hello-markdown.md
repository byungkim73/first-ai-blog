---
title: "Hello, Markdown"
date: "2026-06-13"
excerpt: "A first post that shows how Markdown files become static blog pages in Next.js."
---

This blog keeps posts as plain Markdown files in `content/posts`. Each file has a short frontmatter block for metadata and regular Markdown for the body.

## Why Markdown

Markdown is portable, pleasant to edit, and easy to review. It lets the writing stay separate from the page chrome while Next.js handles routing and rendering.

## What is included

- A homepage that lists every post by date.
- Dynamic post pages at `/blog/[slug]`.
- Frontmatter for titles, dates, and excerpts.
- Markdown rendering with support for links, lists, and code.

Add a new `.md` file to `content/posts`, give it the same frontmatter fields, and the site will pick it up automatically.
