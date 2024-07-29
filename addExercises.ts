// addExercises.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const exercises = [
    { name: 'Push-up' },
    { name: 'Pull-up' },
    { name: 'Squat' },
    { name: 'Bench Press' },
    { name: 'Deadlift' },
    { name: 'Overhead Press' },
    { name: 'Bicep Curl' },
    { name: 'Tricep Extension' },
  ];

  for (const exercise of exercises) {
    const existingExercise = await prisma.exercise.findUnique({
      where: { name: exercise.name },
    });

    if (!existingExercise) {
      await prisma.exercise.create({
        data: exercise,
      });
      console.log(`Added exercise: ${exercise.name}`);
    } else {
      console.log(`Exercise already exists: ${exercise.name}`);
    }
  }
}

main()
  .then(() => {
    console.log('All exercises checked and added');
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
  });
