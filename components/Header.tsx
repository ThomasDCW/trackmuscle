import { GiMuscleUp } from 'react-icons/gi';
import { H1 } from './Typography/H1';

export default function Header() {
  return (
    <header className="flex items-center gap-2 bg-primary p-4">
      <GiMuscleUp size={25} color="white" />
      <H1 label="Muscle up" />
    </header>
  );
}
