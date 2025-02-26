import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET({ params }) {
  try {
    const { id } = params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user", error);
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
}
