interface LabelProps {
  children: string;
  htmlFor?: string;
}

export function Label({ children, htmlFor }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-sm">
      {children}
    </label>
  );
}
