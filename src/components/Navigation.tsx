"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FloatingActionButton, Icon } from "@/components";

const destinations = [
  {
    label: "票匣",
    path: "/inbox",
    icon: <Icon name="inbox" />,
  },
  {
    label: "洞悉",
    path: "/insights",
    icon: <Icon name="pie_chart" />,
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 z-10 w-full shrink-0 bg-blue-50 transition-all dark:bg-neutral-800 md:static md:w-20 md:bg-transparent md:dark:bg-transparent">
      <div className="my-7 hidden justify-center md:flex">
        <FloatingActionButton />
      </div>
      <ul className="my-3 flex justify-evenly gap-3 md:mt-5 md:flex-col">
        {destinations.map(({ icon, label, path }) => (
          <li key={path} className="flex h-14 items-center justify-center">
            <Link href={path} key={path} className="group p-2">
              <>
                <div className="relative my-1 flex h-8 w-14">
                  <div
                    className={`absolute h-full w-full rounded-full transition-all ${
                      pathname.startsWith(path)
                        ? "bg-blue-200 group-hover:bg-blue-300 group-focus:bg-blue-300 dark:bg-blue-400/50 dark:group-hover:bg-blue-300/50 dark:group-focus:bg-blue-300/50"
                        : "group-hover:bg-black/10 group-focus:bg-black/10 dark:group-hover:bg-white/25 dark:group-focus:bg-white/25"
                    }`}
                  ></div>
                  <div className="relative m-auto transition-all group-hover:[font-variation-settings:'wght'600]">
                    {icon}
                  </div>
                </div>
                <div className="text-center text-xs">{label}</div>
              </>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
