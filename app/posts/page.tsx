import Posts from "@/components/Posts";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import styles from "./page.module.css";

export default async function PostsByUserPage() {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }

  return (
    <main className={styles["main"]}>
      <h1 className={styles["title"]}>All the posts you created</h1>
      <a className={styles["new-post-btn"]} href="/posts/new">
        Create post
      </a>
      <Posts fetchUrl={"/api/posts"} />
    </main>
  );
}
