"use client";

import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./ShortPost.module.css";

interface ShortPostProps {
  id: number;
  title: string;
  isPublic: boolean;
}

export default function ShortPost({ id, title, isPublic }: ShortPostProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    router.push(`/posts/${id}`);
  };

  return (
    <div onClick={handleClick} className={styles["post-container"]}>
      <h3>
        {title}{" "}
        {isPublic ? (
          <span className={styles["visibility-label"]}>(Public)</span>
        ) : (
          <span className={styles["visibility-label"]}>(Private)</span>
        )}
      </h3>
    </div>
  );
}
