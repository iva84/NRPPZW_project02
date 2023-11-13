import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import styles from "./page.module.css";
import PostForm from "@/components/PostForm";
import { Suspense } from "react";

export default async function NewPost() {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }

  return (
    <main className={styles["main"]}>
      <h2 className={styles["title"]}>Create new post:</h2>
      <Suspense>
        <PostForm />
      </Suspense>
    </main>
  );
}
