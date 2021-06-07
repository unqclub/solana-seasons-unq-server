import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { Worker } from 'worker_threads';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  if (process.env.RUN_LISTENER_WORKER) {
    new Worker(join(__dirname, 'eth-worker.js'));
  }

  await app.listen(3000);
}
bootstrap();
