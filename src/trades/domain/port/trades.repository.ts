import { Trade } from '../entity/trade.entity';

export abstract class TradesRepository {
  abstract save(trade: Trade): Promise<Trade>;
  abstract getByNftAddress(nftAddress: string): Promise<Trade | undefined>;
}
