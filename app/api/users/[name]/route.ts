// app/api/user/[name]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { name: string } }) {
  const { name } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { name },
      include: {
        workouts: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error retrieving user data' }, { status: 500 });
  }
}
