import { ClubsController } from '../adapter/http/clubs.controller';
import { createClubsController } from './util';

describe('creating a new club', () => {
  let clubsController: ClubsController;

  beforeEach(async () => {
    clubsController = await createClubsController();
  });

  it('enables getting a club by account address', async () => {
    const createdClub = await clubsController.createClub({
      name: 'A name',
      description: 'A description',
      imageUrl: 'image-url',
      accountAddress: 'acc-address',
      curatorAddress: 'cur-address',
      tokenMintAccountAddress: 'token-mint-addr',
    });

    const club = await clubsController.getClub(createdClub.accountAddress);

    expect(club).toEqual(createdClub);
  });

  it('enables finding a club in a list of clubs', async () => {
    const createdClub = await clubsController.createClub({
      name: 'A name',
      description: 'A description',
      imageUrl: 'image-url',
      accountAddress: 'acc-address',
      curatorAddress: 'cur-address',
      tokenMintAccountAddress: 'token-mint-addr',
    });

    const clubs = await clubsController.getClubs();

    expect(clubs.find((club) => club.accountAddress === createdClub.accountAddress)).toEqual(
      createdClub,
    );
  });
});
