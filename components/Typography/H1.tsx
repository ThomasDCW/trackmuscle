interface H1Props {
  label: string;
}

export function H1({ label }: H1Props) {
  return <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-white lg:text-5xl">{label}</h1>;
}
