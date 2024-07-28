import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MdAddCircleOutline } from 'react-icons/md';

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
    <main className="flex flex-col p-2">
      <div>
        <span className="text-xl font-semibold">Workouts :</span>
        <div className="flex flex-col gap-4 p-4">
          {userData.trainings.map((training) => (
            <Card className="flex items-center justify-between bg-primary" key={training.id}>
              <CardHeader>
                <CardTitle className="text-white">{training.name}</CardTitle>
              </CardHeader>
              <Link className="mr-4 rounded-md bg-white p-3" href={`/dashboard/training/${training.id}`}>
                <FaArrowRight />
              </Link>
            </Card>
          ))}
        </div>
        <Link
          href={'/dashboard/add-training'}
          className="mx-auto my-4 flex w-2/3 items-center justify-center gap-2 rounded-md bg-black p-2 text-white"
        >
          Ajouter un entrainement <MdAddCircleOutline size={20} />
        </Link>
      </div>
    </main>
  );
}
