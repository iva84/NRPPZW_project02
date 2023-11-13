import { getPostById } from "@/lib/repository";
import { NextRequest, NextResponse } from "next/server";

// post by id
export async function GET(
  req: NextRequest,
  context: { params: { id: number } }
) {
  try {
    if (context.params.id === null) {
      return NextResponse.json(
        { error: "Bad request." },
        {
          status: 400,
        }
      );
    }

    const post = await getPostById(context.params.id);

    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error while fetching post." },
      { status: 404 }
    );
  }
}
