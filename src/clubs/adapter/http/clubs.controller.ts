import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';

import { Club } from '../../domain/entity/club.entity';
import { CreateClub, CreateClubDto } from '../../domain/usecase/create-club';
import { GetClub } from '../../domain/usecase/get-club';
import { GetClubs } from '../../domain/usecase/get-clubs';

@Controller('clubs')
export class ClubsController {
  constructor(
    private readonly getClubsUseCase: GetClubs,
    private readonly getClubUseCase: GetClub,
    private readonly createClubUseCase: CreateClub,
  ) {}

  @Get()
  async getClubs() {
    return this.getClubsUseCase.execute();
  }

  @Get(':accountAddress')
  async getClub(@Param('accountAddress') accountAddress: string): Promise<Club> {
    return this.getClubUseCase.execute({ accountAddress });
  }

  @Post()
  async createClub(@Body(ValidationPipe) dto: CreateClubDto): Promise<Club> {
    return this.createClubUseCase.execute(dto);
  }
}
