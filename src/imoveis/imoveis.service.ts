import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Imovel } from './interface/imovel.interface';
import { CreateImovelDto } from './dto/create-imovelDto';
import { ImputImageImovelDto } from './dto/addImage-imovelDto';
import { UpdateImovelDto } from './dto/update-imovelDto';

@Injectable()
export class ImoveisService {
  constructor(@InjectModel('Imovel') private imovelModel: Model<Imovel>) { }

  async create(newImovel: CreateImovelDto): Promise<Imovel> {
    try {
      const createImovel = new this.imovelModel(newImovel)
      const imovel = await createImovel.save();
      return imovel;
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async findAll(): Promise<Imovel[]> {
    try{
      return await this.imovelModel.find().exec();
    }catch(e){
      throw new ForbiddenException('Erro ao tentar listar imóveis.');
    }

  }

  async findOne(id: string): Promise<Imovel> {
    try {
      const imovel = await this.imovelModel.findOne({ _id: id }).exec();
      if (!imovel)
        throw new NotFoundException("Imovel não encontrado!");
      return imovel;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async update(id: string, imovelUpdate: UpdateImovelDto): Promise<boolean>{
    await this.findOne(id);
    try {
      const result = await this.imovelModel.update({ _id: id }, imovelUpdate);
      return await result.nModified==1 ? true: false;
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async updateSituacao(idImovel: string, situacao: number): Promise<boolean>{
    await this.findOne(idImovel);
    try {
      const result = await this.imovelModel.update({ _id: idImovel }, {situacao: situacao});
      return await result.nModified==1 ? true: false;
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async addImage(idImovel: string, image: ImputImageImovelDto): Promise<boolean> {
    try {
      const resposta = await this.imovelModel.updateOne(
        { _id: idImovel },
        { $push: { urlImagens: {_id : Types.ObjectId(), url: image.url, rotulo: image.rotulo } } }
      );
      if(resposta.n == 0)
        throw new ForbiddenException('Erro ao tentar adicionar imagem.');
      return true;
    }catch(e){
      throw new BadRequestException(e);
    }
  }

  async removeImage(idImovel: string, idImage: string): Promise<boolean> {
    try {
      const resposta = await this.imovelModel.updateOne(
        { _id: idImovel },
        { $pull: { urlImagens: { _id: idImage }}}
      );
      if(resposta.n == 0)
        throw new ForbiddenException('Erro ao tentar remover imagem.');
      return true;
    }catch(e){
      throw new BadRequestException(e);
    }

  }

  async updateImage(idImovel: string, idImage: string,image: ImputImageImovelDto): Promise<boolean> {
    try {
      const resposta = await this.imovelModel.updateOne(
        { _id: idImovel, 'urlImagens._id': idImage},
        { $set: {'urlImagens.$.url': image.url, 'urlImagens.$.rotulo': image.rotulo }}
      );
      if(resposta.n == 0)
        throw new ForbiddenException('Erro ao tentar adicionar imagem.');
      return true;
    }catch(e){
      throw new BadRequestException(e);
    }
  }



}
