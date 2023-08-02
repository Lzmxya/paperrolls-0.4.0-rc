import { useLiveQuery } from "dexie-react-hooks";
import { useAppDispatch, useAppSelector } from "@/libs/redux";
import { clearChecked, setDeleting } from "../inboxSlice";
import { archiveReceipts, db } from "@/models";

import {
  // DropdownMenu,
  Icon,
  IconButton,
} from "@/components";

export function InboxSelectionBar() {
  const dispatch = useAppDispatch();
  const { checkedReceipts } = useAppSelector((state) => state.inbox);
  const {
    isAllArchived,
    //  isAllStarred
  } = useLiveQuery(
    async () => {
      const receipts = await db.receipts.bulkGet(checkedReceipts);
      const isAllArchived = receipts.every((receipt) => receipt?.archived);
      const isAllStarred = receipts.every((receipt) => receipt?.starred);
      return { isAllArchived, isAllStarred };
    },
    [checkedReceipts],
    { isAllArchived: false, isAllStarred: false },
  );

  // const menuItems = [
  //   {
  //     label: isAllStarred ? "移除星號" : "加上星號",
  //     icon: <Icon name="star" />,
  //     onClick: () => null,
  //   },
  // ];

  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-6">
        <IconButton
          label="全部取消選取"
          icon={<Icon name="close" />}
          onClick={() => dispatch(clearChecked())}
        />
        <span className="text-xl">已選取 {checkedReceipts.length} 張發票</span>
      </div>
      <div className="flex">
        <IconButton
          label={isAllArchived ? "取消封存" : "封存"}
          icon={
            isAllArchived ? <Icon name="unarchive" /> : <Icon name="archive" />
          }
          onClick={() => archiveReceipts(checkedReceipts)}
        />
        <IconButton
          label="刪除"
          icon={<Icon name="delete" />}
          onClick={() => dispatch(setDeleting([...checkedReceipts]))}
        />
        {/* <DropdownMenu items={menuItems} icons /> */}
      </div>
    </div>
  );
}
