"use client";
import { useState } from "react";
import { H1 } from "@/components/Typography/H1";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GiMuscleUp } from "react-icons/gi";
import { MdOutlineLogin } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const user = await response.json();
      setMessage(`User ${user.name} logged in successfully!`);
      router.push("/dashboard");
    } else {
      setMessage("Entrer un nom");
    }
  };

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="fixed top-4 left-4 flex items-center justify-center gap-2">
        <GiMuscleUp size={30} />
        <H1 label="Muscle up" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 w-4/5 md:w-1/3 items-center space-x-2"
      >
        <Input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit">
          <MdOutlineLogin />
        </Button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}
