import { Injectable, NotFoundException } from '@nestjs/common';

import { ClubsRepository } from '../port/clubs.repository';

export class GetClubDto {
  accountAddress: string;
}

@Injectable()
export class GetClub {
  constructor(private readonly clubsRepository: ClubsRepository) {}

  async execute({ accountAddress }: GetClubDto) {
    const club = await this.clubsRepository.getClubByAccountAddress(accountAddress);

    if (!club) {
      throw new NotFoundException();
    }

    return club;
  }
}
