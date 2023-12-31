import { parse } from "date-fns";

export interface IReceipt {
  cardType: string;
  cardNo: string;
  invDate: Date;
  sellerBan: number;
  sellerName: string;
  invNum: string;
  amount: number;
  invStatus: string;
  details: { amount: number; description: string }[];
  archived: boolean;
  starred: boolean;
  comment: string;
}

export class Receipt implements IReceipt {
  cardType: string;
  cardNo: string;
  invDate: Date;
  sellerBan: number;
  sellerName: string;
  invNum: string;
  amount: number;
  invStatus: string;
  details: { amount: number; description: string }[];
  archived: boolean;
  starred: boolean;
  comment: string;

  constructor(
    cardType: string,
    cardNo: string,
    invDate: string,
    sellerBan: string | number,
    sellerName: string,
    invNum: string,
    amount: string | number,
    invStatus: string,
    archived?: boolean,
    starred?: boolean,
    comment?: string,
  ) {
    this.cardType = cardType;
    this.cardNo = cardNo;
    this.invDate = parse(`${invDate}+08`, "yyyyMMddX", new Date());
    this.sellerBan = +sellerBan;
    this.sellerName = sellerName;
    this.invNum = invNum;
    this.amount = +amount;
    this.invStatus = invStatus;
    this.details = [];
    this.archived = archived || false;
    this.starred = starred || false;
    this.comment = comment?.trim() || "";
  }

  addDetail(amount: number, description: string) {
    this.details.push({ amount, description });
  }
}
