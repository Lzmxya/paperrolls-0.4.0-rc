"use client";

import { useEffect, useRef } from "react";
import { useBack } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/libs/redux";
import {
  setSelected,
  toggleChecked,
  setDeleting,
  // clearChecked,
} from "../inboxSlice";
import { resetToast, setArchivedToast } from "@/features/toast";
import { GroupedVirtuoso, VirtuosoHandle } from "react-virtuoso";
import { format, isThisWeek, isThisYear } from "date-fns";
import { zhTW } from "date-fns/locale";

import { archiveReceipts, IReceipt, ReceiptGroup } from "@/models";
import { InboxButtonStar } from "./InboxButtonStar";
import { SearchHighlighter } from "@/features/search";
import { Avatar, Icon, IconButton } from "@/components";

type PartialReceiptGroup = Partial<ReceiptGroup>;

interface InboxListProps {
  receipts: IReceipt[];
  receiptGroups: PartialReceiptGroup[];
}

const receiptDetailPreviewString = (details: IReceipt["details"]) => {
  const descriptions = details
    .slice(0, 3)
    .map((element) => element.description)
    .join("、");
  return descriptions;
};

export function InboxList({ receipts, receiptGroups }: InboxListProps) {
  const virtuoso = useRef<VirtuosoHandle>(null);
  const dispatch = useAppDispatch();
  const { selectedReceipt, checkedReceipts } = useAppSelector(
    (state) => state.inbox,
  );
  const groups = receiptGroups.filter(
    ({ counts, archives }) => counts !== archives,
  );
  const counts = groups.map(
    ({ counts, archives }) => (counts || 0) - (archives || 0),
  );

  useEffect(() => {
    if (selectedReceipt.current !== null) {
      virtuoso.current?.scrollIntoView({
        index: selectedReceipt.current,
        behavior: "smooth",
      });
    }
  }, [selectedReceipt]);

  useBack(checkedReceipts.length !== 0, "selecting");

  return (
    <div className="isolate grow">
      <GroupedVirtuoso
        ref={virtuoso}
        groupCounts={counts}
        groupContent={(index) => {
          return (
            <div className="relative flex h-14 items-center gap-0.5 border-b border-gray-200 bg-white px-2 transition-all dark:border-transparent dark:bg-neutral-800">
              <button className="rounded-lg p-2 text-xl opacity-80 transition-all hover:bg-black/10 dark:hover:bg-white/25">
                {groups[index].month || "搜尋結果"}
              </button>
            </div>
          );
        }}
        itemContent={(index) => {
          const {
            amount,
            archived,
            details,
            invDate,
            invNum,
            sellerName,
            starred,
          } = receipts[index];

          return (
            <div className="px-2 py-0.5 md:px-1">
              <div
                onClick={() =>
                  dispatch(
                    setSelected({
                      previous: index - 1,
                      current: index,
                      next: index + 1,
                    }),
                  )
                }
                className={`group relative flex cursor-pointer rounded-2xl transition-all dark:border-neutral-700 dark:hover:text-white ${
                  (selectedReceipt.current === index ||
                    checkedReceipts.includes(invNum)) &&
                  "dark:text-white"
                } ${
                  checkedReceipts.includes(invNum)
                    ? "bg-blue-200 hover:bg-blue-300 dark:bg-blue-400/50 dark:hover:bg-blue-400/60"
                    : selectedReceipt.current === index
                    ? "bg-blue-100 hover:bg-blue-200 dark:bg-blue-200/20 dark:hover:bg-blue-400/30"
                    : archived
                    ? "bg-black/5 hover:bg-blue-50 dark:bg-black"
                    : "hover:bg-blue-50 dark:hover:bg-neutral-800"
                }`}
              >
                {/* Indicator */}
                {selectedReceipt.current === index && (
                  <div className="absolute flex h-full w-4 items-center justify-center">
                    <div className="h-6 w-1 rounded-full bg-blue-400"></div>
                  </div>
                )}
                {/* Supporting visuals */}
                <div
                  className="h-20 w-20 shrink-0 p-4"
                  onClick={(event) => {
                    event.stopPropagation();
                    dispatch(toggleChecked(invNum));
                  }}
                >
                  {checkedReceipts.includes(invNum) ? (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-400">
                      <Icon name="check" />
                    </div>
                  ) : (
                    <Avatar name={sellerName} />
                  )}
                </div>
                {/* Primary text */}
                <div className="m-auto grow overflow-hidden text-sm">
                  <p
                    className={`truncate font-bold after:ml-2 ${
                      archived &&
                      "after:rounded after:bg-black/50 after:px-1 after:py-0.5 after:text-xs after:font-normal after:text-white after:content-['封存'] dark:after:bg-white dark:after:text-black"
                    }`}
                  >
                    {invNum}
                  </p>
                  <p className="truncate opacity-80">
                    <SearchHighlighter content={sellerName} />
                  </p>
                  <p className="truncate opacity-80">
                    <SearchHighlighter
                      content={receiptDetailPreviewString(details)}
                    />
                  </p>
                </div>
                {/* Metadata */}
                {/* TODO: FormatJS */}
                <div className="flex flex-col items-end justify-between whitespace-nowrap pl-2">
                  <div className="mr-3 mt-[0.625rem]">
                    <p className="text-sm">{amount} 元</p>
                  </div>
                  <div className="flex items-end">
                    <span className="mb-[0.625rem] text-xs  group-hover:invisible">
                      {format(
                        invDate,
                        isThisYear(invDate)
                          ? isThisWeek(invDate)
                            ? "iii"
                            : "MMMdo"
                          : "yyyy/M/d",
                        {
                          locale: zhTW,
                        },
                      )}
                    </span>
                    <ul
                      className={`flex h-10 group-hover:opacity-100 ${
                        !starred && "opacity-60"
                      }`}
                    >
                      <li className="hidden group-hover:list-item">
                        <IconButton
                          label="刪除"
                          icon={<Icon name="delete" />}
                          onClick={(event) => {
                            event.stopPropagation();
                            dispatch(setDeleting([invNum]));
                          }}
                        />
                      </li>
                      <li className="hidden group-hover:list-item">
                        <IconButton
                          label={archived ? "取消封存" : "封存"}
                          icon={
                            archived ? (
                              <Icon name="unarchive" />
                            ) : (
                              <Icon name="archive" />
                            )
                          }
                          onClick={(event) => {
                            event.stopPropagation();
                            archiveReceipts([invNum]);
                            dispatch(
                              archived
                                ? resetToast()
                                : setArchivedToast(invNum),
                            );
                          }}
                        />
                      </li>
                      <li>
                        <InboxButtonStar invNum={invNum} starred={starred} />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
