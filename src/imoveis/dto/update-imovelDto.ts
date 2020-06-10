import { IsString, IsNotEmpty, IsNumber, IsInt, Min, Max, Length, IsPositive, IsMongoId, IsAlpha, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum CondicaoImovel{
    COMPRAR = 1,
    ALUGAR = 2,
    IMOVELNOVO = 3
}

enum TipoImovel {
    CASA = 1,
    APARTAMENTO = 2,
    iMOVELCOMERCIAL = 3,
    TERRENO = 4
}

export class UpdateImovelDto {

    @ApiProperty()
    @IsMongoId()
    _id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(5, 30)
    titulo: string;

    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(4)
    tipo: TipoImovel;

    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(3)
    condicaoImovel: CondicaoImovel;//transação

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    valor: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(5, 255)
    descricao: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(2, 255)
    endRua: string;

    @ApiProperty()
    @IsString()
    @Length(1, 6)
    endNumero: string;

    @ApiProperty()
    @IsString()
    @Length(2, 255)
    endBairro: string;

    @ApiProperty()
    @IsString()
    @Length(2, 255)
    endCidade: string;

    @ApiProperty()
    @Length(2, 2)
    @IsAlpha()
    endEstado: string;

    @ApiProperty()
    @Length(8, 8)
    @IsNumberString()
    endCep: string;

    @ApiProperty()
    @IsString()
    @Length(2, 255)
    endComplemento: string;

    @ApiProperty()
    @IsInt()
    @Max(30)
    @Min(0)
    numGaragem: number;

    @ApiProperty()
    @IsInt()
    @Max(30)
    @Min(0)
    numQuarto: number;

    @ApiProperty()
    @IsInt()
    @Max(30)
    @Min(0)
    numBanheiro: number;

    @ApiProperty()
    @IsInt()
    @Max(30)
    @Min(0)
    numSuites: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    area: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    areaTotal: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    condominio: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    iptu: number;

    constructor(partial: Partial<UpdateImovelDto>) {
        Object.assign(this, partial);
    }
}
