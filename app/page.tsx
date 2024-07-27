'use client';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MdOutlineLogin } from 'react-icons/md';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const user = await response.json();
      console.log(user);
      toast({
        title: 'Bienvenue sur Muscle up',
        description: user.name,
      });
      router.push('/dashboard');
    } else {
      toast({
        description: "Nom d'utilisateur incorrect",
      });
    }
  };

  return (
    <main className="flex h-96 flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="flex w-4/5 items-center gap-2 space-x-2 md:w-1/3">
        <Input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
        <Button type="submit">
          <MdOutlineLogin />
        </Button>
      </form>
    </main>
  );
}
