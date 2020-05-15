import { IsString, IsNotEmpty, IsUrl } from "class-validator";

export class ImputImageImovelDto{

    @IsString()
    @IsUrl()
    url: string;

    @IsString()
    @IsNotEmpty()
    rotulo: string;

}