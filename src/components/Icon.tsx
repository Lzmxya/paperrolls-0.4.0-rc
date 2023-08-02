import { MaterialSymbol } from "react-material-symbols";

interface IconProps {
  className?: string;
  fill?: boolean;
  name: string;
}

export function Icon({ className, fill, name }: IconProps) {
  return (
    <MaterialSymbol
      icon={name}
      size={24}
      weight={"inherit"}
      fill={fill}
      className={`flex items-center justify-center ${className}`}
    />
  );
}
