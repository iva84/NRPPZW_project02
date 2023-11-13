import styles from "./page.module.css";
import Posts from "@/components/Posts";

export default function Home() {
  return (
    <main className={styles["main"]}>
      <h1>Latest posts</h1>
      <Posts fetchUrl={"/api/posts/latest"} />
    </main>
  );
}
