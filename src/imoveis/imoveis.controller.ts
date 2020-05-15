import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { Imovel } from './interface/imovel.interface';
import { ImoveisService } from './imoveis.service';
import { CreateImovelDto } from './dto/create-imovelDto';
import { ImputImageImovelDto } from './dto/addImage-imovelDto';
import { UpdateImovelDto } from './dto/update-imovelDto';
import { IdImovelDto } from './dto/inputuId-imovelDto';
import { InputSituacaoImovelDto } from './dto/situacao-imovelDto';

@Controller('imoveis')
export class ImoveisController {

    constructor(private readonly imoveisService: ImoveisService) { }

    @Get()
    async findAll(): Promise<Imovel[]> {
        return await this.imoveisService.findAll();
    }
    
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Imovel> {
        return this.imoveisService.findOne(id);
    }

    @Post()
    async create(@Body() createImovelDto: CreateImovelDto): Promise<Imovel> {
        return this.imoveisService.create(createImovelDto);
    }

    @Post(':idImovel/add_imagem')
    async addImage(@Param('idImovel') idImovel: string, @Body() image: ImputImageImovelDto) {
        return this.imoveisService.addImage(idImovel, image);
    }

    @Put()
    async atualizar(@Body() updateImovelDto: UpdateImovelDto): Promise<boolean> {
        return this.imoveisService.update(updateImovelDto);
    }

    @Put('atualizar_situacao')
    async atualizarSituacao(@Body() situacaoDto: InputSituacaoImovelDto): Promise<boolean> {        
        return this.imoveisService.updateSituacao(situacaoDto.id, situacaoDto.situacao);
    }

    @Put(':idImovel/atualizar_imagem/:idImage')
    async atualizarImage(
        @Param('idImovel') idImovel: string, 
        @Param('idImage') idImage: string, 
        @Body() image: ImputImageImovelDto) {
        return this.imoveisService.updateImage(idImovel, idImage, image);
    }

    
    @Delete(':idImovel/remove_imagem/:idImage')
    async removeImage(@Param('idImovel') idImovel: string, @Param('idImage') idImage: string) {
        return this.imoveisService.removeImage(idImovel, idImage);
    }

}
