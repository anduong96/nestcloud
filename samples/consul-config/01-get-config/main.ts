import { AppModule } from './app.module';
import { NestCloud } from '@nestcloud2/core';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
    const app = NestCloud.create(await NestFactory.create(AppModule));
    await app.listen(3000);
}

bootstrap();
