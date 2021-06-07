import { IsEmail } from 'class-validator';

export class AddListMemberDto {
  @IsEmail()
  email: string;
}
