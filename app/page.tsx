import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <section className="home">
      <div className="intro">
        <p className="eyebrow">Markdown blog</p>
        <h1>Notes on building useful things.</h1>
        <p>
          A minimal Next.js blog with static post pages, frontmatter metadata,
          and Markdown content that lives in the repository.
        </p>
      </div>

      <div className="post-list" aria-label="Blog posts">
        {posts.map((post) => (
          <article className="post-card" key={post.slug}>
            <div>
              <p className="post-date">{post.dateLabel}</p>
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.excerpt}</p>
            </div>
            <Link className="read-link" href={`/blog/${post.slug}`}>
              Read post
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
