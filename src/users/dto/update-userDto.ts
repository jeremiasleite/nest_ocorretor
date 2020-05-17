import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class UpdateUserDto {

    @IsString()
    @IsNotEmpty()
    readonly _id: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @IsNotEmpty()
    readonly username: string;    

    /*constructor(partial: Partial<UpdateUserDto>) {
        Object.assign(this, partial);
    }*/
}