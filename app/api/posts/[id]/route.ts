import {
  getPostByIdAndCurrentUser,
  getPostByIdAndPublic,
} from "@/lib/repository";
import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";

// post by id
export async function GET(context: { params: { id: number } }) {
  try {
    if (context.params.id === null) {
      return NextResponse.json(
        { error: "Bad request." },
        {
          status: 400,
        }
      );
    }

    const session = await getSession();
    let post = null;

    if (!session) {
      post = await getPostByIdAndPublic(context.params.id);
    } else {
      post = await getPostByIdAndCurrentUser(session, context.params.id);
    }

    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error while fetching post." },
      { status: 404 }
    );
  }
}
