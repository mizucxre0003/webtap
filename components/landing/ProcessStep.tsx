type ProcessStepProps = {
  number: string;
  title: string;
  text: string;
};

export function ProcessStep({ number, title, text }: ProcessStepProps) {
  return (
    <article className="relative border-l border-white/14 pb-10 pl-7 last:pb-0">
      <span className="absolute -left-[5px] top-1 size-2.5 rounded-full bg-white" />
      <p className="text-sm uppercase tracking-[0.22em] text-white/38">{number}</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white">{title}</h3>
      <p className="mt-3 max-w-2xl text-base leading-7 text-white/58">{text}</p>
    </article>
  );
}
