import { Module } from '@nestjs/common';
import { ImoveisController } from './imoveis.controller';
import { ImoveisService } from './imoveis.service';
import { ImovelSchema } from './schemas/imovel.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Imovel', schema: ImovelSchema }])],
  controllers: [ImoveisController],
  providers: [ImoveisService]
})
export class ImoveisModule {}
