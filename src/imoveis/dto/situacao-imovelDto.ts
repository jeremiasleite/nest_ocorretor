import { IsInt, Min, Max, IsMongoId } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

enum Situacao{
    DISPONIVEL = 1,
    VENDIDO = 2,
    ALUGADO = 3
}

export class InputSituacaoImovelDto{
    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(3)
    situacao: Situacao

    @ApiProperty()
    @IsMongoId()
    id: string
}