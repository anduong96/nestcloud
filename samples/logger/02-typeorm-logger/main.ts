import { AppModule } from './app.module';
import { NestCloud } from '@nestcloud2/core';
import { NestFactory } from '@nestjs/core';
import { NestLogger } from '@nestcloud2/logger';

async function bootstrap() {
    const app = NestCloud.create(
        await NestFactory.create(AppModule, {
            logger: new NestLogger({
                path: __dirname,
                filename: `config.yaml`,
            }),
        }),
    );
    await app.listen(3000);
}

bootstrap();
