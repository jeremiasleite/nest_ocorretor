import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Imovel } from './interface/imovel.interface';

@Injectable()
export class ImoveisService {
    constructor(@InjectModel('Imovel') private imovelModel: Model<Imovel>) {}

    async findAll(): Promise<Imovel[]>{
        const list = await this.imovelModel.find().exec();        
        return list;
      }
}
