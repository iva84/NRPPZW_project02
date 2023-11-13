import { db } from "@/lib/db";
import {
  createPost,
  getCurrentUserOrCreate,
  getPostsByCurrentUser,
} from "@/lib/repository";
import { Post } from "@/types";
import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";

// all posts by current user
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Error while fetching posts." },
        { status: 401 }
      );
    }

    const posts = await getPostsByCurrentUser(session);
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error while fetching posts." },
      { status: 404 }
    );
  }
}

// create post
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Error while creating post." },
        { status: 401 }
      );
    }

    const formData: Post = await req.json();

    const user = await getCurrentUserOrCreate(session);
    if (!user) {
      return NextResponse.json(
        { error: "Error while creating post." },
        { status: 401 }
      );
    }

    const post = await createPost(session, formData);

    if (post) {
      return NextResponse.json({}, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Error while creating post." },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error while creating post." },
      { status: 404 }
    );
  }
}
