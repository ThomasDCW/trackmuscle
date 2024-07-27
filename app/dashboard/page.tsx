import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

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
    console.error("Error retrieving user data:", error);
    return null;
  }
}

export default async function DashboardPage() {
  const username = cookies().get("username")?.value;

  if (!username) {
    redirect("/");
    return null;
  }

  const userData = await getUserData(username);

  if (!userData) {
    return <div>Error loading user data</div>;
  }

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">Welcome, {userData.name}</h1>
      <div>
        <h2 className="text-xl">Your Trainings:</h2>
        <ul>
          {userData.trainings.map((training) => (
            <li key={training.id}>{training.name}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
