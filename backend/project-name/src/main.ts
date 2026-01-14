import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // // Enable CORS so your friend's browser doesn't block the request
  // app.enableCors({
  //   origin: "https://hemimetabolous-nonreciprocally-lisandra.ngrok-free.dev", // Your specific Ngrok URL
  //   credentials: true,
  // });

  app.enableCors();


  // ADD '0.0.0.0' HERE
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`Server listening on port ${port}`);
}
bootstrap();