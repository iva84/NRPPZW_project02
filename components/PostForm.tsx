"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./PostForm.module.css";
import { PostFormInput } from "@/types";
import { useRouter } from "next/navigation";

export default function PostForm() {
  const { register, handleSubmit } = useForm<PostFormInput>();
  const router = useRouter();

  const handleSave: SubmitHandler<PostFormInput> = (formValues, event) => {
    event?.preventDefault();

    fetch(process.env.NEXT_PUBLIC_API_URL + "/api/posts", {
      method: "POST",
      body: JSON.stringify(formValues),
    }).then((res) => {
      if (res.ok) {
        router.replace("/posts");
      }
      // TODO handle error
    });
  };

  return (
    <form className={styles["form"]} onSubmit={handleSubmit(handleSave)}>
      <div className={styles["form-group-inline"]}>
        <label className={styles["form-label"]}>Title:</label>
        <input
          className={styles["form-input"]}
          type="text"
          {...register("title")}
        />
      </div>
      <div className={styles["form-group"]}>
        <label className={styles["form-label"]}>Content:</label>
        <textarea
          className={styles["form-textarea"]}
          rows={15}
          {...register("content")}
        />
      </div>
      <div className={styles["form-group-inline"]}>
        <label className={styles["form-label"]}>Public:</label>
        <input
          className={styles["form-input-checkbox"]}
          type="checkbox"
          {...register("public")}
        />
      </div>
      <div className={styles["form-group"]}>
        <button className={styles["submit-btn"]} type="submit">
          Create
        </button>
      </div>
    </form>
  );
}
