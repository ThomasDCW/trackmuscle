// app/api/users/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { serialize } from "cookie";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { name } = await request.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    let user = await prisma.user.findUnique({
      where: { name },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { name },
      });
    }

    // Set a cookie with the user name
    const response = NextResponse.json(user, { status: 200 });
    response.headers.append(
      "Set-Cookie",
      serialize("username", name, { path: "/" })
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating or logging in user" },
      { status: 500 }
    );
  }
}
