import { promises as fs } from 'fs';
import { join } from 'path';

import { Club } from '../../domain/entity/club.entity';
import { ClubsRepository } from '../../domain/port/clubs.repository';

export class JsonClubsRepository implements ClubsRepository {
  private readonly jsonFilePath = join(process.cwd(), 'clubs.json');

  async save(club: Club): Promise<Club> {
    const clubs = await this.getClubsFromJson();
    clubs.push(club);
    await this.saveClubsToJson(clubs);
    return club;
  }

  async getClubByAccountAddress(accountAddress: string): Promise<Club | undefined> {
    const clubs = await this.getClubsFromJson();
    return clubs.find((el) => el.accountAddress === accountAddress);
  }

  getClubs(): Promise<Club[]> {
    return this.getClubsFromJson();
  }

  private async getClubsFromJson(): Promise<Club[]> {
    try {
      const jsonRawData = await fs.readFile(this.jsonFilePath);
      const clubs = JSON.parse(jsonRawData.toString());
      return clubs;
    } catch (error) {
      return [];
    }
  }

  private async saveClubsToJson(clubs: Club[]) {
    fs.writeFile(this.jsonFilePath, JSON.stringify(clubs));
  }
}
