import { Controller, Get, UseGuards, Post, Body, Param, Delete, Put, ClassSerializerInterceptor, UseInterceptors, HttpCode, HttpStatus} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-userDto';
import { UpdateUserDto } from './dto/update-userDto';
import { User } from './interfaces/user.interface';
import { ResponseUserDto } from './dto/response-userDto';
import { ForgotPasswordUserDto } from './dto/forgotPassword-userDto';
import { ResetPasswordDto } from './dto/resetPassword-userDto';
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    //@UseGuards(JwtAuthGuard)    
    async findAll(): Promise<User[]>{        
        return await this.usersService.findAll();
    }
    
    @Get(':id')
    @UseGuards(JwtAuthGuard)      
    async findOne(@Param('id') id: string){
        return this.usersService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)          
    async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
        return this.usersService.create(createUserDto);
    }    

    @Post('forgot_password')
    @HttpCode(HttpStatus.OK)
    async forgotPassword(@Body() data: ForgotPasswordUserDto){
        return this.usersService.forgotPassword(data.email);
    }

    @Post('reset_password')
    @HttpCode(HttpStatus.OK)
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto){
        return this.usersService.resetPassword(resetPasswordDto);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)    
    async update(@Body() updateUserDto: UpdateUserDto){
        return this.usersService.update(updateUserDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)    
    async remove(@Param('id') id: string){
        return this.usersService.remove(id)
    }

}
