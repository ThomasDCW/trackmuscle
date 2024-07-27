import { H1 } from "@/components/Typography/H1";
import { Button } from "@/components/ui/button";
import { GiMuscleUp } from "react-icons/gi";

export default function Home() {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="fixed top-4 left-4 flex items-center justify-center gap-2">
        <GiMuscleUp size={40} />
        <H1 label="Muscle up" />
      </div>
      <Button className="mx-auto">Se connecter</Button>
    </main>
  );
}
