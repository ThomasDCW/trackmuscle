import { GiMuscleUp } from 'react-icons/gi';

export default function Header() {
  return (
    <header className="flex items-center gap-2 bg-primary p-4">
      <GiMuscleUp size={20} color="white" />
      <h1 className="scroll-m-20 text-2xl font-bold tracking-tight text-white">Muscle Up</h1>
    </header>
  );
}
