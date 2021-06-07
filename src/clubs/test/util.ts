import { Test } from '@nestjs/testing';

import { MemoryClubsRepository } from '../adapter/data/memory-clubs.repository';
import { ClubsController } from '../adapter/http/clubs.controller';
import { ClubsModule } from '../clubs.module';
import { ClubsRepository } from '../domain/port/clubs.repository';

export async function createClubsController() {
  const module = await Test.createTestingModule({
    imports: [ClubsModule],
  })
    .overrideProvider(ClubsRepository)
    .useClass(MemoryClubsRepository)
    .compile();

  return module.get(ClubsController);
}
