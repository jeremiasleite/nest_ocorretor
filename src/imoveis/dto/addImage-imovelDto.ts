import { IsString, IsNotEmpty, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ImputImageImovelDto{

    @ApiProperty()
    @IsString()
    @IsUrl()
    url: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    rotulo: string;

}