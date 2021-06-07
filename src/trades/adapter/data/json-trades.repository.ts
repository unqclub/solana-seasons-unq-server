import { promises as fs } from 'fs';
import { join } from 'path';

import { Trade } from '../../domain/entity/trade.entity';
import { TradesRepository } from '../../domain/port/trades.repository';

export class JsonTradesRepository implements TradesRepository {
  private readonly jsonFilePath = join(process.cwd(), 'trades.json');

  async save(trade: Trade): Promise<Trade> {
    const trades = await this.getTradesFromJson();
    const existingTradeIndex = trades.findIndex((el) => el.accountAddress === trade.accountAddress);
    if (existingTradeIndex !== -1) {
      trades.splice(existingTradeIndex, 1, trade);
    } else {
      trades.push(trade);
    }
    await this.saveTradesToJson(trades);
    return trade;
  }

  async getByNftAddress(nftAddress: string): Promise<Trade | undefined> {
    const trades = await this.getTradesFromJson();
    return trades.find((el) => el.nftAddress === nftAddress);
  }

  private async getTradesFromJson(): Promise<Trade[]> {
    try {
      const jsonRawData = await fs.readFile(this.jsonFilePath);
      const trades = JSON.parse(jsonRawData.toString());
      return trades;
    } catch (error) {
      return [];
    }
  }

  private async saveTradesToJson(trades: Trade[]) {
    fs.writeFile(this.jsonFilePath, JSON.stringify(trades));
  }
}
