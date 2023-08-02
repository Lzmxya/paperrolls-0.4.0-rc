"use client";

import { useEffect } from "react";
import { Divider } from "@/components";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full space-y-2 overflow-y-scroll p-4">
      <h1 className="text-xl">錯誤</h1>
      <ul className="ms-6 list-disc space-y-2">
        <li>
          已知本應用程式無法在部分瀏覽器的「私密瀏覽」模式下正確執行，請將之停用後再試一次。
        </li>
        <li>
          若出現本畫面時並未啟用私密瀏覽模式，請至本專案的
          <a
            href="https://github.com/Lzmxya/paperrolls/issues"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            問題追蹤器
          </a>
          回報錯誤。
        </li>
        <li>
          或者嘗試
          <button
            onClick={() => reset()}
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            重新載入發生損毀的資源
          </button>
          。
        </li>
      </ul>
      <details>
        <summary className="cursor-pointer">偵錯資訊</summary>
        <article className="select-text">
          <h3>{error.name}</h3>
          <h4>{error.message}</h4>
          <Divider />
          <p>{error.stack}</p>
        </article>
      </details>
    </div>
  );
}
