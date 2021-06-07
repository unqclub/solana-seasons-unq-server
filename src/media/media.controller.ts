import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';

@Controller('media')
export class MediaController {
  private BASE_URL: string;

  constructor(readonly config: ConfigService) {
    this.BASE_URL = config.get('BASE_URL') as string;
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      preservePath: true,
      storage: diskStorage({
        destination: './files',
        filename(_, file, cb) {
          const ext = file.originalname.split('.').pop();
          const name = uuid();
          cb(null, `${name}.${ext}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { url: this.getMediaUrl(file.filename) };
  }

  private getMediaUrl(filename: string) {
    return `${this.BASE_URL}/files/${filename}`;
  }
}
