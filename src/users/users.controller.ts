import { Controller, Get, UseGuards, Post, Body, Param, Delete, Put, ClassSerializerInterceptor, UseInterceptors, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-userDto';
import { UpdateUserDto } from './dto/update-userDto';
import { ResponseUserDto } from './dto/response-userDto';
import { ForgotPasswordUserDto } from './dto/forgotPassword-userDto';
import { ResetPasswordDto } from './dto/resetPassword-userDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    @UseGuards(JwtAuthGuard)    
    async findAll(): Promise<ResponseUserDto[]> {
        const users = await this.usersService.findAll();
        const listResponseUserDTO: ResponseUserDto[] = [];
        users.forEach((user) => listResponseUserDTO
            .push(new ResponseUserDto(user._id, user.username, user.email, user.isActive, user.createdAt)));
        return listResponseUserDTO;
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id') id: string): Promise<ResponseUserDto> {
        const user = await this.usersService.findOne(id);        
        return new ResponseUserDto(user._id, user.username, user.email, user.isActive, user.createdAt);
    }

    @Post()
    @UseGuards(JwtAuthGuard)          
    async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
        const user = await this.usersService.create(createUserDto.email, createUserDto.username, createUserDto.password);
        return new ResponseUserDto(user._id, user.username, user.email, user.isActive, user.createdAt);
    }

    @Post('forgot_password')
    @HttpCode(HttpStatus.OK)
    async forgotPassword(@Body() data: ForgotPasswordUserDto): Promise<boolean> {
        return this.usersService.forgotPassword(data.email);
    }

    @Post('reset_password')
    @HttpCode(HttpStatus.OK)
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<boolean> {
        return this.usersService.resetPassword(resetPasswordDto);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(ClassSerializerInterceptor)
    async update(@Body() updateUserDto: UpdateUserDto): Promise<boolean> {                
        return this.usersService.update(updateUserDto);       
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id') id: string): Promise<boolean> {
        return this.usersService.remove(id)
    }

}
