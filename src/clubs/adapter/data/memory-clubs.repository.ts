import { Club } from '../../domain/entity/club.entity';
import { ClubsRepository } from '../../domain/port/clubs.repository';

export class MemoryClubsRepository implements ClubsRepository {
  private readonly clubs: Club[] = [];

  async save(club: Club): Promise<Club> {
    this.clubs.push(club);
    return club;
  }

  async getClubByAccountAddress(accountAddress: string): Promise<Club | undefined> {
    return this.clubs.find((club) => club.accountAddress === accountAddress);
  }

  async getClubs(): Promise<Club[]> {
    return [...this.clubs];
  }
}
