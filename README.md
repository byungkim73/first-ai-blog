# Field Notes

A simple Markdown-powered blog built with Next.js.

## Run Locally

Install dependencies, then start the development server:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Add A Post

Create a Markdown file in `content/posts`:

```markdown
---
title: "My New Post"
date: "2026-06-13"
excerpt: "A short summary for the homepage."
---

Write the post body here.
```

The file name becomes the URL slug. For example, `my-new-post.md` is available at `/blog/my-new-post`.
