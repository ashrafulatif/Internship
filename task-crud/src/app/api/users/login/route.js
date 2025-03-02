import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Set a cookie with the session data
    const response = NextResponse.json(
      { message: "Login successful", role: user.role }, // Include the user's role
      { status: 200 }
    );
    response.cookies.set(
      "session",
      JSON.stringify({ userId: user.id, role: user.role }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
      }
    );

    return response;
  } catch (error) {
    console.error("Error logging in", error);
    return NextResponse.json({ error: "Error logging in" }, { status: 500 });
  }
}
