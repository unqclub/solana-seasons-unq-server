import { Injectable } from '@nestjs/common';

import { ClubsRepository } from '../port/clubs.repository';

@Injectable()
export class GetClubs {
  constructor(private readonly clubsRepository: ClubsRepository) {}

  execute() {
    return this.clubsRepository.getClubs();
  }
}
