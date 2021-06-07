import { Club } from '../entity/club.entity';

export abstract class ClubsRepository {
  abstract save(club: Club): Promise<Club>;
  abstract getClubByAccountAddress(accountAddress: string): Promise<Club | undefined>;
  abstract getClubs(): Promise<Club[]>;
}
