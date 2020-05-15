import { IsInt, Min, Max, IsMongoId } from "class-validator";

enum Situacao{
    DISPONIVEL = 1,
    VENDIDO = 2,
    ALUGADO = 3
}

export class InputSituacaoImovelDto{
    @IsInt()
    @Min(1)
    @Max(3)
    situacao: Situacao

    @IsMongoId()
    id: string
}