import { NextResponse } from "next/server";
import { authMiddleware } from "@/lib/middlewares/authMiddleware";
import { buildPages } from "@/lib/utils/buildPages";
import { syncGit } from "@/lib/utils/syncGit";

export const POST = async (req: Request) => {
  try {
    authMiddleware(req);
    const { searchParams } = new URL(req.url);
    const deploy = searchParams.get("deploy") !== "false";

    const pages = await req.json();

    await buildPages(pages);
    if (deploy) await syncGit();

    return NextResponse.json({ message: "success" });
  } catch (err) {
    console.error("Deployment error:", err);
    return NextResponse.json(
      { error: "Something went wrong during build/deploy" },
      { status: 500 },
    );
  }
};
