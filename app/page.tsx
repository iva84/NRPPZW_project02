import { Suspense } from "react";
import styles from "./page.module.css";
import Posts from "@/components/Posts";

export default function Home() {
  return (
    <main className={styles["main"]}>
      <h1>Latest posts</h1>
      <Suspense>
        <Posts fetchUrl={"/api/posts/latest"} />
      </Suspense>
    </main>
  );
}
