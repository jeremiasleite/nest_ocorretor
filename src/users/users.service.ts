import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-userDto';
import { UpdateUserDto } from './dto/update-userDto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { hashSync } from 'bcrypt';
import { ResponseUserDto } from './dto/response-userDto';
import { randomBytes } from 'crypto';
import { ResetPasswordDto } from './dto/resetPassword-userDto';
import { sendEmail } from 'src/utils/sendEmail';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const hash = hashSync(createUserDto.password, 10);
    createUserDto.password = hash;
    try {
      const createdUser = new this.userModel(createUserDto);
      const resut = await createdUser.save();
      return new ResponseUserDto(resut._id, resut.username, resut.email, resut.isActive, resut.createdAt);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e.message,
        name: e.name
      }, HttpStatus.FORBIDDEN);
    }
  }


  async findAll(): Promise<User[]> {
    try {
      const list = await this.userModel.find().exec();
      //.select('_id username email isActive createdAt').exec();
      return list as User[];
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e.message,
        name: e.name
      }, HttpStatus.FORBIDDEN);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const usuario = this.userModel.findOne({ _id: id }).exec();
      if (!(await usuario)) {
        throw new NotFoundException("Usuário não encontrado.")
      }
      return usuario;
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e.message,
        name: e.name
      }, HttpStatus.FORBIDDEN);
    }
  }

  async findOneEmail(email: string): Promise<User> {
    try {
      const usuario = this.userModel.findOne({ email: email }).exec();
      if (!(await usuario)) {
        throw new NotFoundException("Usuário não encontrado.")
      }
      return usuario;
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e.message,
        name: e.name
      }, HttpStatus.FORBIDDEN);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.userModel.deleteOne({ _id: id });
      if (result.deletedCount == 0)
        throw new NotFoundException("Usuário não encontrado.")
      return { menssage: "User removido." };
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e.message,
        name: e.name
      }, HttpStatus.FORBIDDEN);
    }
  }

  async findOneUserName(username: string): Promise<User> {
    try {
      const usuario = await this.userModel.findOne({ username: username }).exec();
      if (!(await usuario)) {
        throw new NotFoundException("Usuário não encontrado.")
      }
      return usuario as User;
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e.message,
        name: e.name
      }, HttpStatus.FORBIDDEN);
    }

  }

  async update(usuario: UpdateUserDto): Promise<User> {
    const usuarioToUpdate = await this.findOne(usuario._id);
    try {
      const email = usuario.email ? usuario.email : usuarioToUpdate.email;
      const username = usuario.username ? usuario.username : usuarioToUpdate.username;
      const result = await this.userModel.updateOne({ _id: usuario._id }, { username: username, email: email });
      return result.nModified;
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e.message,
        name: e.name
      }, HttpStatus.FORBIDDEN);
    }
  }

  async forgotPassword(email: string) {
    const usuario = await this.findOneEmail(email);
    const token = randomBytes(20).toString('hex');
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    try {
      await this.userModel.updateOne({ email: email }, { tokenPasswordReset: token, expiresPasswordReset: now });
      //enviar email com o tokem
      this.sendEmailToken(email, usuario._id, token);
      return {message: 'Email para recuperação da senha enviado com sucesso.'};      
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e.message,
        name: e.name
      }, HttpStatus.FORBIDDEN);
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const usuario = await this.findOne(resetPasswordDto._id)
    const now = new Date();

    if (!(await usuario.tokenPasswordReset == resetPasswordDto.token))
      throw new BadRequestException("Token inválido.");

    if (now > usuario.expiresPasswordReset)
      throw new BadRequestException("Token Expirado.");

    const hash = hashSync(resetPasswordDto.password, 10);
    try {
      const result = await this.userModel.updateOne({ _id: resetPasswordDto._id }, { tokenPasswordReset: "", password: hash });
      if (result.n > 0) {
        return 'Senha alterada com sucesso.';
      } else {
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: 'Erro ao tentar atualizar.'
        }, HttpStatus.FORBIDDEN);
      }
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e.message,
        name: e.name
      }, HttpStatus.FORBIDDEN);
    }
  }

  async sendEmailToken(email: string, id: string, token: string) {
    try {
      sendEmail(
        email,
        "Reset password",
        `Id do usuário: ${id}, token: ${token} para recuração de senha.`,
        `<p>Id do usuário: <b>${id}</b>, token: <b>${token}</b> para recuração de senha.</p>`
      )
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e.message,
        name: e.name
      }, HttpStatus.FORBIDDEN);
    }
  }
}
