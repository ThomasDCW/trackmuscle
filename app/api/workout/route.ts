import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { name, exerciseIds, userId } = await request.json();
    console.log('Received data:', { name, exerciseIds, userId });

    if (!name || !userId || !Array.isArray(exerciseIds)) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    const workout = await prisma.workout.create({
      data: {
        name,
        user: { connect: { id: userId } },
        exercises: {
          connect: exerciseIds.map((id: string) => ({ id })),
        },
      },
    });

    return NextResponse.json(workout, { status: 201 });
  } catch (error) {
    console.error('Failed to add workout:', error);
    return NextResponse.json({ error: 'Failed to add workout' }, { status: 500 });
  }
}
