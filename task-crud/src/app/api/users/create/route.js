import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//post handler
export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("error creating user", error);
    return NextResponse.json("error creating user", { status: 500 });
  }
}
