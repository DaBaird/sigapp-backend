import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.WEBSITES_PORT || 8080; // ✅ Uses Azure's assigned port
  await app.listen(port);

  console.log(`Application running on port ${port}`);
}
bootstrap();
