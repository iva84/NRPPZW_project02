import { Session } from "@auth0/nextjs-auth0";
import { db } from "./db";
import { Pagination, Post } from "@/types";

/* ---------- FUNCTIONS THAT CAN ACCESS ONLY AUTHENTICATED USER ---------- */

// get current user
export async function getCurrentUserOrCreate(session: Session) {
  let user = await db.creator.findFirst({
    where: {
      email: session.user.email,
    },
  });
  if (!user) {
    user = await db.creator.create({
      data: {
        email: session.user.email,
        name: session.user.name,
      },
    });
  }
  return user;
}

// get posts by current user
export async function getPostsByCurrentUser(session: Session) {
  const user = await db.creator.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const posts = await db.post.findMany({
    where: {
      creator: user,
    },
  });

  return posts;
}

// create post
export async function createPost(session: Session, postData: Post) {
  const user = await db.creator.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const post = await db.post.create({
    data: {
      title: postData.title,
      content: postData.content,
      public: postData.public,
      creator_id: user.id,
      creation_timestamp: new Date(Date.now()),
    },
  });

  return post;
}

// get post by id
export async function getPostByIdAndCurrentUser(
  session: Session,
  postId: number
) {
  const user = await db.creator.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const posts = await db.post.findMany({
    where: {
      id: postId,
      creator: user,
    },
  });

  return posts;
}

/* ---------- PUBLIC FUNCTIONS ---------- */

// latest 10 public posts
export async function getLatestPublicPosts(pagination: Pagination) {
  db.post.findMany({
    where: {
      public: true,
    },
    orderBy: {
      creation_timestamp: "desc",
    },
    skip: pagination.page * pagination.size,
    take: pagination.size,
  });
}

// get post by id
export async function getPostByIdAndPublic(postId: number) {
  const posts = await db.post.findMany({
    where: {
      id: postId,
      public: true,
    },
  });

  return posts;
}
