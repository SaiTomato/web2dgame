
import { Controller, Bind, Get, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameLog } from '../src/entities/log.entity';
import { Repository } from 'typeorm';

@Controller('Logs')
export class GameController {

    constructor(
        @InjectRepository(GameLog)
        private readonly gameLogRepository: Repository<GameLog>,
    ) { }

    @Get()
    async getAllLogs(){
        return await this.gameLogRepository.find({order: {id: 'DESC'},take:50});
    }
}
