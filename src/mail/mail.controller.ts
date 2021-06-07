import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AddListMemberDto } from './dto/add-list-member.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService){}

  @Post()
  addListMember(@Body(ValidationPipe) dto: AddListMemberDto) {
    return this.mailService.addListMember(dto);
  }
}
