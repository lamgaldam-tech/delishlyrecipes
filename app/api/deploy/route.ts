import { NextResponse } from "next/server";
import { buildStaticPages } from "@/lib/utils/buildStaticPages";
import { syncClient } from "@/lib/utils/git";

export const POST = async () => {
  try {
    buildStaticPages();
    await syncClient();
    return NextResponse.json({ message: "success" });
  } catch (err) {
    console.error("Deployment error:", err);
    return NextResponse.json(
      { error: "Something went wrong during build/deploy" },
      { status: 500 },
    );
  }
};
