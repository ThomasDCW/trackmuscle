import { Exercise, Workout } from '@prisma/client';
import { notFound } from 'next/navigation';

async function getWorkout(id: string): Promise<(Workout & { exercises: Exercise[] }) | null> {
  const res = await fetch(`http://localhost:3000/api/workout/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function WorkoutPage({ params }: { params: { id: string } }) {
  const workout = await getWorkout(params.id);

  if (!workout) {
    notFound();
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{workout.name}</h1>
      <ul className="mt-4 space-y-2">
        {workout.exercises.map((exercise) => (
          <li key={exercise.id} className="rounded-md border p-2">
            {exercise.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
