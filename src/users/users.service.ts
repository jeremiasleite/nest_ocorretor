import { Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-userDto';
import { UpdateUserDto } from './dto/update-userDto';
import { CostumeNotFoundException } from 'src/exceptions/notfound.exception';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import {hashSync} from 'bcrypt';
import { ResponseUserDto } from './dto/response-userDto';
import { randomBytes } from 'crypto';
import { CostumeBadRequestException } from 'src/exceptions/babRequest.execption';
import { ResetPasswordDto } from './dto/resetPassword-userDto';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const hash = hashSync(createUserDto.password, 10);
    createUserDto.password = hash;
    const createdUser = new this.userModel(createUserDto);    
    const resut = await createdUser.save();    
    return new ResponseUserDto(resut._id, resut.username, resut.email, resut.isActive, resut.createdAt);
  }

  async findAll(): Promise<User[]>{
    const list = await this.userModel.find().exec();
      //.select('_id username email isActive createdAt').exec();        
    return list as User[];
  }

  async findOne(id: string): Promise<User> {
    const usuario = this.userModel.findOne({_id:id}).exec();    
    if (!(await usuario)) {
      throw new CostumeNotFoundException("Usuário não encontrado.")
    }
    return usuario
  }

  async remove(id: string) {
    const result = await this.userModel.deleteOne({_id: id});    
    if(result.deletedCount==0)
      throw new CostumeNotFoundException("Usuário não encontrado.")
    return {menssage: "User removido."};
  }

  async findOneUserName(username: string): Promise<User> {
    const usuario = await this.userModel.findOne({ username: username }).exec();
    if (!(await usuario)) {
      throw new CostumeNotFoundException("Usuário não encontrado.")
    }
    return usuario as User;
  }

  async update(usuario: UpdateUserDto): Promise<User> {
    const usuarioToUpdate = await this.userModel.findOne({ _id: usuario._id }).exec();
    if (!(await usuarioToUpdate)) {
      throw new CostumeNotFoundException("Usuário não encontrado.")
    }
    const email = usuario.email? usuario.email : usuarioToUpdate.email;
    const username = usuario.username? usuario.username : usuarioToUpdate.username;
    const result = await this.userModel.updateOne({_id: usuario._id}, {username: username, email: email});    
    return result.nModified;
  }

  async forgotPassword(email: string){        
    const usuario = await this.userModel.findOne({ email: email }).exec();
    if(!(await usuario)){
      throw new CostumeNotFoundException("Email não cadastrado.")
    }
    const token = randomBytes(20).toString('hex');
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    const result = await this.userModel.updateOne({email: email}, {tokenPasswordReset: token, expiresPasswordReset: now});
    //enviar email com o tokem
    return { n : result.nModified, token: token, _id: usuario._id};
  }

  async resetPassword(resetPasswordDto :ResetPasswordDto){       
    const usuario = await this.userModel.findOne({ _id: resetPasswordDto._id }).exec();
    const now = new Date();
    if(!usuario)
      throw new CostumeNotFoundException("Usuário não exite.");
    
    if(!(await usuario.tokenPasswordReset == resetPasswordDto.token))
      throw new CostumeBadRequestException("Token inválido.");
    
    if(now > usuario.expiresPasswordReset)
      throw new CostumeBadRequestException("Token Expirado.");
    
    const hash = hashSync(resetPasswordDto.password, 10);      
    const result = await this.userModel.updateOne({_id: resetPasswordDto._id}, {tokenPasswordReset: "", password: hash});    
    if(result.n>0){      
      return 'Senha alterada com sucesso.';
    }else{
      return 'Erro ao atualizar senha.';
    }
  }
}
