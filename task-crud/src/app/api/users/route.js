import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//get handler
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.error("error fetching users", err);
    return NextResponse.json("error fetching users", { status: 500 });
  }
}
