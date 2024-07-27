import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Lire le corps de la requête
    const { name, exerciseIds, userId } = await request.json();

    console.log('Received data:', { name, exerciseIds, userId });

    // Vérifiez les données
    if (!name || !userId || !Array.isArray(exerciseIds)) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    // Créez un nouvel entraînement avec les exercices associés
    const training = await prisma.training.create({
      data: {
        name,
        user: { connect: { id: userId } },
        exercises: {
          connect: exerciseIds.map((id: number) => ({ id })),
        },
      },
    });

    return NextResponse.json(training, { status: 201 });
  } catch (error) {
    console.error('Failed to add training:', error);
    return NextResponse.json({ error: 'Failed to add training' }, { status: 500 });
  }
}
