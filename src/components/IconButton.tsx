import { cloneElement, MouseEventHandler, ReactElement } from "react";

interface IconButtonProps {
  disabled?: boolean;
  icon: ReactElement;
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function IconButton({
  disabled,
  icon,
  label,
  onClick,
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={`group/icon h-10 w-10 rounded-full transition-all ${
        !disabled &&
        "hover:bg-black/10 hover:[font-variation-settings:'wght'600] dark:hover:bg-white/25"
      }`}
      onClick={onClick}
      disabled={disabled || false}
      title={label}
    >
      {cloneElement(icon, {
        className: `fill-current m-2 stroke-current stroke-0 transition-all ${
          disabled ? "opacity-40" : "group-hover/icon:stroke-[0.6px]"
        } ${icon.props.className}`,
      })}
    </button>
  );
}
