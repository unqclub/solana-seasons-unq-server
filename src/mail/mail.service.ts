import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AddListMemberDto } from './dto/add-list-member.dto';

const mailchimp = require('@mailchimp/mailchimp_marketing');

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {
    const mailchimpApiKey = this.configService.get('MAILCHIMP_API_KEY');

    mailchimp.setConfig({
      apiKey: mailchimpApiKey,
      server: 'us1',
    });
  }

  addListMember(dto: AddListMemberDto) {
    return mailchimp.lists.addListMember('[MAILCHIMP_LIST]', {
      email_address: dto.email,
      status: 'subscribed',
    });
  }
}
