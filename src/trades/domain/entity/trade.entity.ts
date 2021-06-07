export enum TradeStatus {
  ACTIVE,
  DONE,
}

export class Trade {
  nftAddress: string;
  accountAddress: string;
  clubAccountAddress: string;
  status: TradeStatus;
}
