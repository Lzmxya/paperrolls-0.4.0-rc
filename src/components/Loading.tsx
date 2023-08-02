import { EmptyScreen } from "./EmptyScreen";

interface LoadingProps {
  prompt: string;
}

export function Loading({ prompt }: LoadingProps) {
  return (
    <EmptyScreen>
      <h2 className="text-xl">{prompt}…</h2>
    </EmptyScreen>
  );
}
