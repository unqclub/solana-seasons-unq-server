import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { CreateTrade, CreateTradeDto } from '../../domain/usecase/create-trade';

@Controller('trades')
export class TradesController {
  constructor(private readonly createTradeUseCase: CreateTrade) {}

  @Post()
  createTrade(@Body(ValidationPipe) dto: CreateTradeDto) {
    return this.createTradeUseCase.execute(dto);
  }
}
