import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS so your friend's browser doesn't block the request
  app.enableCors();

  const server = app.getHttpServer();
  app.useWebSocketAdapter(new IoAdapter(server));

  // ADD '0.0.0.0' HERE
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Network access: http://192.168.100.158:${port}`);
}
bootstrap();