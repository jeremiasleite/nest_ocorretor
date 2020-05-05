import { Controller, Get } from '@nestjs/common';
import { Imovel } from './interface/imovel.interface';
import { ImoveisService } from './imoveis.service';

@Controller('imoveis')
export class ImoveisController {

    constructor(private readonly usersService: ImoveisService) { }

    @Get()   
    async findAll(): Promise<Imovel[]>{
        return await this.usersService.findAll();
    }
}
