// components/AddTrainingForm.tsx
'use client';

import { use, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Exercise } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FaDumbbell } from 'react-icons/fa6';

interface AddTrainingFormProps {
  exercises: Exercise[];
}

export default function AddTrainingForm({ exercises }: AddTrainingFormProps) {
  const [trainingName, setTrainingName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  console.log(selectedExercises);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/training', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trainingName,
          exerciseIds: selectedExercises,
          userId: 1,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create training');
      }

      const result = await response.json();
      console.log('Training created:', result);

      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating training:', error);
    }
  };

  const handleCheckboxChange = (id: number) => {
    console.log('checked', id);

    setSelectedExercises((prev) =>
      prev.includes(id) ? prev.filter((exerciseId) => exerciseId !== id) : [...prev, id]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor="trainingName" className="font-semibold">
        Nom :
      </label>
      <Input
        required
        className="w-full"
        placeholder="Full body, 3 jours..."
        value={trainingName}
        onChange={(e) => setTrainingName(e.target.value)}
      />
      <div className="flex flex-col gap-2">
        <span className="font-semibold">Exercices :</span>
        {exercises.map((exercise) => (
          <div key={exercise.id} className="flex items-center space-x-2">
            <Checkbox
              className="h-5 w-5"
              id={`checkbox-${exercise.id}`}
              checked={selectedExercises.includes(exercise.id)}
              onClick={() => handleCheckboxChange(exercise.id)}
            />
            <label htmlFor={`checkbox-${exercise.id}`} className="">
              {exercise.name}
            </label>
          </div>
        ))}
      </div>
      <Button type="submit" className="flex items-center justify-center gap-2 rounded-md p-2">
        <FaDumbbell />
        Créer le workout
      </Button>
    </form>
  );
}
