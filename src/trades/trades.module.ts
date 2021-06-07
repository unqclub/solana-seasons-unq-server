import { Module } from '@nestjs/common';

import { JsonTradesRepository } from './adapter/data/json-trades.repository';
import { TradesController } from './adapter/http/trades.controller';
import { TradesRepository } from './domain/port/trades.repository';
import { CreateTrade } from './domain/usecase/create-trade';

@Module({
  controllers: [TradesController],
  providers: [
    CreateTrade,
    {
      provide: TradesRepository,
      useClass: JsonTradesRepository,
    },
  ],
})
export class TradesModule {}
