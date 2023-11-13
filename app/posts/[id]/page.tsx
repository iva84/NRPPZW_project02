import { Post } from "@/types";
import styles from "./page.module.css";
import { getPostById } from "@/lib/repository";

async function fetchPost(id: number) {
  try {
    const post = await getPostById(id);
    return post;
  } catch (error: any) {
    return null;
  }
}

export default async function Post({ params }: { params: { id: string } }) {
  const post: Post | null = await fetchPost(Number(params.id));

  return (
    <main className={styles["main"]}>
      {post && (
        <div className={styles["post-container"]}>
          <h2>
            {post.title}{" "}
            {post.public ? (
              <span className={styles["visibility-label"]}>Public</span>
            ) : (
              <span className={styles["visibility-label"]}>Private</span>
            )}
          </h2>
          <p>{post.content}</p>
        </div>
      )}
    </main>
  );
}
