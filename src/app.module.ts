import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ClubsModule } from './clubs/clubs.module';
import { MediaModule } from './media/media.module';
import { TradesModule } from './trades/trades.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
      serveRoot: '/files',
    }),
    ClubsModule,
    TradesModule,
    MediaModule,
    MailModule,
  ],
})
export class AppModule {}
