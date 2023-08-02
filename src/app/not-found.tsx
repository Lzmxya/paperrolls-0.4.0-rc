import Link from "next/link";
import { EmptyScreen } from "@/components";

export default function NotFound() {
  return (
    <EmptyScreen>
      <h2 className="text-xl">錯誤：找不到頁面</h2>
      <Link
        href="/inbox"
        className="text-blue-600 hover:underline dark:text-blue-400"
      >
        返回首頁
      </Link>
    </EmptyScreen>
  );
}
