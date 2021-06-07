import { Module } from '@nestjs/common';

import { JsonClubsRepository } from './adapter/data/json-clubs.repository';
import { ClubsController } from './adapter/http/clubs.controller';
import { ClubsRepository } from './domain/port/clubs.repository';
import { CreateClub } from './domain/usecase/create-club';
import { GetClub } from './domain/usecase/get-club';
import { GetClubs } from './domain/usecase/get-clubs';

@Module({
  controllers: [ClubsController],
  providers: [
    GetClub,
    GetClubs,
    CreateClub,
    { provide: ClubsRepository, useClass: JsonClubsRepository },
  ],
})
export class ClubsModule {}
