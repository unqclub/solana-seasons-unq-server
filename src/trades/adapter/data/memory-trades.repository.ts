import { Trade } from '../../domain/entity/trade.entity';
import { TradesRepository } from '../../domain/port/trades.repository';

export class MemoryTradesRepository implements TradesRepository {
  private readonly trades: Trade[] = [];

  async save(trade: Trade): Promise<Trade> {
    const existingTradeIndex = this.trades.findIndex(
      (el) => el.accountAddress === trade.accountAddress,
    );
    if (existingTradeIndex !== -1) {
      this.trades.splice(existingTradeIndex, 1, trade);
    } else {
      this.trades.push(trade);
    }
    return trade;
  }

  async getByNftAddress(nftAddress: string): Promise<Trade | undefined> {
    return this.trades.find((el) => el.nftAddress === nftAddress);
  }
}
