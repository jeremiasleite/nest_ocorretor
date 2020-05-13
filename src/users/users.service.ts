import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-userDto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { hashSync } from 'bcrypt';
import { randomBytes } from 'crypto';
import { ResetPasswordDto } from './dto/resetPassword-userDto';
import { sendEmail } from 'src/utils/sendEmail';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<User>) { }

  async create(email: string, username: string, password: string): Promise<User> {
    const hash = hashSync(password, 10);
    password = hash;
    try {
      const createdUser = new this.userModel({ email: email, username: username, password: password });
      const resut = await createdUser.save();
      return resut;
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e
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
        error: e
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
        error: e
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
        error: e
      }, HttpStatus.FORBIDDEN);
    }
  }

  async remove(id: string):Promise<boolean> {
    try {
      const result = await this.userModel.deleteOne({ _id: id });
      if (result.deletedCount == 0)
        throw new NotFoundException("Usuário não encontrado.")
      return await true;
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e
      }, HttpStatus.FORBIDDEN);
    }
  }

  async findOneUserName(username: string): Promise<User> {
    try {
      const usuario = await this.userModel.findOne({ username: username }).exec();
      if (!(await usuario)) {
        throw new NotFoundException("Usuário não encontrado.")
      }
      return usuario;
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e
      }, HttpStatus.FORBIDDEN);
    }

  }

  async update(userUpdate: UpdateUserDto): Promise<boolean>{    
    await this.findOne(userUpdate._id);
    try {
      const result = await this.userModel.update({ _id: userUpdate._id }, {email: userUpdate.email, username: userUpdate.username});
      return await result.nModified==1 ? true: false;
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e
      }, HttpStatus.FORBIDDEN);
    }
  }

  async forgotPassword(email: string): Promise<boolean> {
    const usuario = await this.findOneEmail(email);
    const token = randomBytes(20).toString('hex');
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    try {
      await this.userModel.updateOne({ email: email }, { tokenPasswordReset: token, expiresPasswordReset: now });
      //enviar email com o tokem
      this.sendEmailToken(email, usuario._id, token);
      return await true;
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e
      }, HttpStatus.FORBIDDEN);
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<boolean> {
    const usuario = await this.findOne(resetPasswordDto._id);
    const now = new Date();

    if (!(await usuario.tokenPasswordReset == resetPasswordDto.token))
      throw new BadRequestException("Token inválido.");

    if (now > usuario.expiresPasswordReset)
      throw new BadRequestException("Token Expirado.");

    const hash = hashSync(resetPasswordDto.password, 10);
    try {
      const result = await this.userModel.updateOne({ _id: resetPasswordDto._id }, { tokenPasswordReset: "", password: hash });
      if (result.n > 0) {
        return await true;
      } else {
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: 'Erro ao tentar atualizar.'
        }, HttpStatus.FORBIDDEN);
      }
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: e
      }, HttpStatus.FORBIDDEN);
    }
  }

  async sendEmailToken(email: string, id: string, token: string): Promise<void> {
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
        error: e
      }, HttpStatus.FORBIDDEN);
    }
  }
}
