import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MdAddCircleOutline } from 'react-icons/md';
import Link from 'next/link';

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
    <main className="flex h-screen w-screen flex-col p-2">
      <Link
        href={'/dashboard/add-training'}
        className="mx-auto my-4 flex w-2/3 items-center justify-center gap-2 rounded-md bg-primary p-2 text-white"
      >
        Ajouter un entrainement <MdAddCircleOutline size={20} />
      </Link>
      <div>
        <span className="text-xl">Mes entrainements:</span>
        <ul>
          {userData.trainings.map((training) => (
            <li key={training.id}>{training.name}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
