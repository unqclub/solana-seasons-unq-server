import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';

import { Trade, TradeStatus } from '../entity/trade.entity';
import { TradesRepository } from '../port/trades.repository';

export class CreateTradeDto {
  @IsString()
  @IsNotEmpty()
  nftAddress: string;
  @IsString()
  @IsNotEmpty()
  accountAddress: string;
  @IsString()
  @IsNotEmpty()
  clubAccountAddress: string;
}

@Injectable()
export class CreateTrade {
  constructor(private readonly tradesRepository: TradesRepository) {}

  async execute(dto: CreateTradeDto) {
    const trade = new Trade();
    trade.accountAddress = dto.accountAddress;
    trade.clubAccountAddress = dto.clubAccountAddress;
    trade.nftAddress = dto.nftAddress;
    trade.status = TradeStatus.ACTIVE;

    await this.tradesRepository.save(trade);

    return trade;
  }
}
