import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { Imovel } from './interface/imovel.interface';
import { ImoveisService } from './imoveis.service';
import { CreateImovelDto } from './dto/create-imovelDto';
import { ImputImageImovelDto } from './dto/addImage-imovelDto';
import { UpdateImovelDto } from './dto/update-imovelDto';
import { InputSituacaoImovelDto } from './dto/situacao-imovelDto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('imoveis')
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
    //@UseGuards(JwtAuthGuard)
    async create(@Body() createImovelDto: CreateImovelDto): Promise<Imovel> {
        return this.imoveisService.create(createImovelDto);
    }

    @Post(':idImovel/add_imagem')
    //@UseGuards(JwtAuthGuard)
    async addImage(@Param('idImovel') idImovel: string, @Body() image: ImputImageImovelDto) {
        return this.imoveisService.addImage(idImovel, image);
    }

    @Put()
    //@UseGuards(JwtAuthGuard)
    async atualizar(@Body() updateImovelDto: UpdateImovelDto): Promise<boolean> {
        return this.imoveisService.update(updateImovelDto);
    }

    @Put('atualizar_situacao')
    //@UseGuards(JwtAuthGuard)
    async atualizarSituacao(@Body() situacaoDto: InputSituacaoImovelDto): Promise<boolean> {
        return this.imoveisService.updateSituacao(situacaoDto.id, situacaoDto.situacao);
    }

    @Put(':idImovel/atualizar_imagem/:idImage')
    //@UseGuards(JwtAuthGuard)
    async atualizarImage(
        @Param('idImovel') idImovel: string,
        @Param('idImage') idImage: string,
        @Body() image: ImputImageImovelDto) {
        return this.imoveisService.updateImage(idImovel, idImage, image);
    }

    @Delete(':idImovel/remove_imagem/:idImage')
    //@UseGuards(JwtAuthGuard)
    async removeImage(@Param('idImovel') idImovel: string, @Param('idImage') idImage: string) {
        return this.imoveisService.removeImage(idImovel, idImage);
    }

}
