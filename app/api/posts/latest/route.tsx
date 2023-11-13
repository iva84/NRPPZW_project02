import { getLatestPublicPosts } from "@/lib/repository";
import { NextRequest, NextResponse } from "next/server";

// latest posts (page, size)
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const size = Number(searchParams.get("size"));
    const page = Number(searchParams.get("page"));

    const latestPosts = await getLatestPublicPosts({ page: page, size: size });
    return NextResponse.json(latestPosts);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error while fetching posts." },
      { status: 404 }
    );
  }
}
