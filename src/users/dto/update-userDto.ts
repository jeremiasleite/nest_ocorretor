import { IsNotEmpty, IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly _id: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNotEmpty()
    readonly username: string;    

    /*constructor(partial: Partial<UpdateUserDto>) {
        Object.assign(this, partial);
    }*/
}