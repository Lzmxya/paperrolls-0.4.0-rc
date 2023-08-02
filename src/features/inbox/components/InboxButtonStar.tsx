import { db, IReceipt } from "@/models";

import { Icon, IconButton } from "@/components";

interface InboxButtonStarProps {
  invNum: IReceipt["invNum"];
  starred: IReceipt["starred"];
}

export function InboxButtonStar({ invNum, starred }: InboxButtonStarProps) {
  return (
    <IconButton
      label={starred ? "移除星號" : "加上星號"}
      icon={
        starred ? (
          <Icon name="star" className="[font-variation-settings:'FILL'1]" />
        ) : (
          <Icon name="star" />
        )
      }
      onClick={(event) => {
        event.stopPropagation();
        db.receipts.update(invNum, { starred: !starred });
      }}
    />
  );
}
