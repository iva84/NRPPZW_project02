"use client";

import ShortPost from "@/components/ShortPost";
import styles from "./Posts.module.css";
import { initialPagination } from "@/constants";
import { useCallback, useEffect, useState } from "react";
import { PaginationReq, PaginationRes, Post } from "@/types";
import Pagination from "@/components/Pagination";

interface PostsProps {
  fetchUrl: string;
}

export default function Posts({ fetchUrl }: PostsProps) {
  const [pagination, setPagination] =
    useState<PaginationReq>(initialPagination);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `${fetchUrl}?page=${pagination.page}&size=${pagination.size}`,
      {
        cache: "no-store",
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          setPosts([]);
          if (!pagination.isLastPage)
            setPagination((prev) => ({ ...prev, isLastPage: true }));
        }
      })
      .then((response: PaginationRes) => {
        setPosts(response.data);
        if (pagination.isLastPage !== response.lastPage)
          setPagination((prev) => ({ ...prev, isLastPage: response.lastPage }));
      })
      .catch((err) => {
        setPosts([]);
        if (!pagination.isLastPage)
          setPagination((prev) => ({ ...prev, isLastPage: true }));
      });
  }, [pagination, fetchUrl]);

  const onPreviousClick = useCallback(() => {
    setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
  }, []);

  const onNextClick = useCallback(() => {
    setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
  }, []);

  return (
    <>
      <div className={styles["posts-container"]}>
        {posts.map((post) => (
          <ShortPost
            key={post.id}
            id={post.id}
            title={post.title}
            isPublic={post.public}
          />
        ))}
      </div>
      {posts && posts.length > 0 && (
        <Pagination
          page={pagination.page}
          isLastPage={pagination.isLastPage ?? true}
          onPreviousClick={onPreviousClick}
          onNextClick={onNextClick}
        />
      )}
    </>
  );
}
