import { Session } from "@auth0/nextjs-auth0";
import { db } from "./db";
import {
  PaginationReq,
  PaginationRes,
  Post,
  VulnerabilityFormInput,
} from "@/types";
import { getSession } from "@auth0/nextjs-auth0";

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
export async function getPostsByCurrentUser(
  session: Session,
  pagination: PaginationReq
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
      creator: user,
    },
    skip: pagination.page * pagination.size,
    take: pagination.size,
  });

  const count = await db.post.count({
    where: {
      creator: user,
    },
  });

  const lastPage: boolean =
    count >= pagination.page * pagination.size &&
    count <= (pagination.page + 1) * pagination.size;

  const response: PaginationRes = {
    lastPage: lastPage,
    data: posts,
  };

  return response;
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

/*
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

  const posts = await db.post.findFirst({
    where: {
      id: postId,
      creator: user,
    },
  });

  return posts;
}
*/

/* ---------- PUBLIC FUNCTIONS ---------- */

// latest 10 public posts
export async function getLatestPublicPosts(pagination: PaginationReq) {
  const posts = await db.post.findMany({
    where: {
      public: true,
    },
    orderBy: {
      creation_timestamp: "desc",
    },
    skip: pagination.page * pagination.size,
    take: pagination.size,
  });
  const count = await db.post.count({
    where: {
      public: true,
    },
  });

  const lastPage: boolean =
    count >= pagination.page * pagination.size &&
    count <= (pagination.page + 1) * pagination.size;

  const response: PaginationRes = {
    lastPage: lastPage,
    data: posts,
  };

  return response;
}

/*
// get post by id
export async function getPostByIdAndPublic(postId: number) {
  const posts = await db.post.findFirst({
    where: {
      id: postId,
      public: true,
    },
  });

  return posts;
}
*/

/* ----------- COMMON ----------- */

// get post by id
export async function getPostById(postId: number) {
  const session = await getSession();

  const vul = await getVulnerability();

  if (vul?.bacvul) {
    const post = await db.post.findFirst({
      where: {
        id: postId, // forget to add public only
      },
    });

    return post;
  } else if (!session) {
    const post = await db.post.findFirst({
      where: {
        id: postId,
        public: true,
      },
    });

    return post;
  } else {
    const user = await db.creator.findFirst({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    const post = await db.post.findFirst({
      where: {
        OR: [
          {
            id: postId,
            creator: user,
          },
          {
            id: postId,
            public: true,
          },
        ],
      },
    });

    return post;
  }
}

export async function getVulnerability() {
  const vul = await db.vulnerability.findFirst({
    where: {
      id: 1,
    },
  });
  return vul;
}
