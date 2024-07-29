// app/add-training/page.tsx

import AddTrainingForm from '@/components/AddTrainingForm';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Exercise } from '@prisma/client';
import { Slash } from 'lucide-react';
import { FaHome } from 'react-icons/fa';
import { FaDumbbell } from 'react-icons/fa6';
import { MdCreate } from 'react-icons/md';

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
    <main className="flex flex-col gap-2 p-4">
      <Breadcrumb className="p-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="flex items-center gap-2" href="/">
              <FaHome /> Acceuil
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink className="flex items-center gap-2" href="/workouts">
              <FaDumbbell />
              Workouts
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-2">
              <MdCreate />
              Créer
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <AddTrainingForm exercises={exercises} />
    </main>
  );
}
