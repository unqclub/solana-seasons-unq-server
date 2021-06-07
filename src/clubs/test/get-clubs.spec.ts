import { ClubsController } from '../adapter/http/clubs.controller';
import { Club } from '../domain/entity/club.entity';
import { CreateClubDto } from '../domain/usecase/create-club';
import { createClubsController } from './util';

describe('getting clubs', () => {
  let clubsController: ClubsController;

  async function createClubs(...dtos: CreateClubDto[]) {
    const clubs: Club[] = [];
    for (const dto of dtos) {
      const club = await clubsController.createClub(dto);
      clubs.push(club);
    }
    return clubs;
  }

  beforeEach(async () => (clubsController = await createClubsController()));

  it('returns all previously created clubs', async () => {
    const createdClubs = await createClubs(
      {
        name: 'A name',
        description: 'A description',
        imageUrl: 'image-url-1',
        accountAddress: 'acc-address',
        curatorAddress: 'cur-address',
        tokenMintAccountAddress: 'token-mint-1',
      },
      {
        name: 'B name',
        description: 'B description',
        imageUrl: 'image-url-2',
        accountAddress: 'acc-address-B',
        curatorAddress: 'cur-address-B',
        tokenMintAccountAddress: 'token-mint-2',
      },
    );

    const clubs = await clubsController.getClubs();

    expect(clubs).toEqual(createdClubs);
  });
});
