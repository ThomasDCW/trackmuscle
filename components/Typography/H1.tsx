interface H1Props {
  label: string;
}

export function H1({ label }: H1Props) {
  return (
    <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl text-white">
      {label}
    </h1>
  );
}
