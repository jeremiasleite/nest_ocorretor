import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()    
    username: string

    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(6, 30)
    password: string
}