import { NotFoundException } from '@nestjs/common';

import { ClubsController } from '../adapter/http/clubs.controller';
import { createClubsController } from './util';

describe('getting a club', () => {
  let clubsController: ClubsController;

  beforeEach(async () => (clubsController = await createClubsController()));

  it('throws NotFoundException if club is not found', async () => {
    await expect(clubsController.getClub('non-existing')).rejects.toThrowError(NotFoundException);
  });
});
