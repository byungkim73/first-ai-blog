---
title: "Designing Small Systems"
date: "2026-05-28"
excerpt: "Small projects still benefit from clear boundaries, predictable data, and a little care."
---

Simple projects can stay simple when each part has a clear job. This example uses one small data module to load posts and keeps the pages focused on presentation.

## A useful shape

The homepage asks for summaries. A post page asks for one complete post. Markdown parsing stays in `lib/posts.ts`, which makes it easy to change later without touching the routes.

```ts
const posts = getAllPosts();
```

That boundary is enough for a blog this size. No database, no CMS, and no extra service are needed until the writing workflow asks for one.
