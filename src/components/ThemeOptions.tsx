"use client";

import { useTheme } from "next-themes";
import { RadioGroup } from "@headlessui/react";
import { Icon, SegmentedButtons } from "@/components";

const themes = [
  {
    name: "light",
    title: "淺色",
    icon: <Icon name="light_mode" />,
  },
  {
    name: "dark",
    title: "深色",
    icon: <Icon name="dark_mode" />,
  },
  {
    name: "system",
    title: "遵循系統",
    icon: <Icon name="routine" />,
  },
];

export function ThemeOptions() {
  const { theme, setTheme } = useTheme();

  return (
    <RadioGroup
      value={theme}
      onChange={setTheme}
      className="flex w-full items-center justify-between gap-6 px-3"
    >
      <RadioGroup.Label>主題</RadioGroup.Label>
      <SegmentedButtons options={themes} />
    </RadioGroup>
  );
}
