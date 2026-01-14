import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameController } from 'controller/game.controller';
import { GameLog } from './entities/log.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'tomato123',
      database: 'log_game',
      entities: [GameLog],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([GameLog]),
  ],
  controllers: [AppController, GameController],
  providers: [AppService, GameService, GameGateway],
})

export class AppModule { }
