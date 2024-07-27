// app/add-training/page.tsx

import AddTrainingForm from '@/components/AddTrainingForm';
import { Exercise } from '@prisma/client'; // Assurez-vous que votre modèle est correctement importé

async function getExercises(): Promise<Exercise[]> {
  const response = await fetch('http://localhost:3000/api/exercises');
  if (!response.ok) {
    throw new Error('Failed to fetch exercises');
  }
  return response.json();
}

export default async function AddTrainingPage() {
  const exercises = await getExercises();

  return (
    <main className="flex flex-col gap-4 p-4">
      <AddTrainingForm exercises={exercises} />
    </main>
  );
}
