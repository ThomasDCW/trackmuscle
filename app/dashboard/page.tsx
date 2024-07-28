import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { Slash } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { FaHome } from 'react-icons/fa';
import { FaDumbbell } from 'react-icons/fa6';

const prisma = new PrismaClient();

async function getUserData(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { name: username },
      include: {
        trainings: true,
      },
    });
    return user;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
}

export default async function DashboardPage() {
  const username = cookies().get('username')?.value;

  if (!username) {
    redirect('/');
    return null;
  }

  const userData = await getUserData(username);

  if (!userData) {
    return <div>Error loading user data</div>;
  }

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
            <BreadcrumbPage className="flex items-center gap-2">
              <FaDumbbell />
              Workouts
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Link
        href={'/dashboard/add-training'}
        className="flex items-center justify-center gap-2 rounded-md bg-primary p-2 text-primary-foreground hover:bg-primary/90"
      >
        <FaDumbbell />
        Créer un workout
      </Link>
      <div className="flex flex-col gap-2">
        {userData.trainings.map((training) => (
          <Card
            className="flex items-center justify-between border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            key={training.id}
          >
            <CardHeader>
              <CardTitle className="text-lg">{training.name}</CardTitle>
            </CardHeader>
            <Link
              className="mr-4 rounded-md bg-primary p-3 text-primary-foreground hover:bg-primary/90"
              href={`/dashboard/training/${training.id}`}
            >
              <FaArrowRight />
            </Link>
          </Card>
        ))}
      </div>
    </main>
  );
}
