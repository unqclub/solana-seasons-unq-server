import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Club } from '../entity/club.entity';
import { ClubsRepository } from '../port/clubs.repository';

export class CreateClubDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsNotEmpty()
  accountAddress: string;

  @IsString()
  @IsNotEmpty()
  curatorAddress: string;

  @IsString()
  @IsNotEmpty()
  tokenMintAccountAddress: string;
}

@Injectable()
export class CreateClub {
  constructor(private readonly clubsRepository: ClubsRepository) {}

  execute(dto: CreateClubDto) {
    const club = new Club();
    club.name = dto.name;
    club.description = dto.description;
    club.imageUrl = dto.imageUrl || '';
    club.createdAt = new Date();
    club.accountAddress = dto.accountAddress;
    club.curatorAddress = dto.curatorAddress;
    club.tokenMintAccountAddress = dto.tokenMintAccountAddress;

    return this.clubsRepository.save(club);
  }
}
