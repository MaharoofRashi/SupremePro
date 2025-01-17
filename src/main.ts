import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  const PORT = process.env.PORT || 3000;
  
  await app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

bootstrap().catch(error => {
  console.error('Error starting the application', error);
  process.exit(1);
});
