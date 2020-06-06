import { IsString, IsNotEmpty, IsNumber, IsInt, Min, Max, Length } from 'class-validator';
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

export class CreateImovelDto {
    
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
    endCidade: string;

    @ApiProperty()
    @IsString()
    @Length(2, 2)
    endEstado: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(8, 8)
    endCep: string;

    @ApiProperty()
    @IsString()
    @Length(2, 255)
    endComplemento: string;

    @ApiProperty()
    @IsInt()    
    numGaragem: number;
    
    @ApiProperty()
    @IsInt()
    numQuarto: number;
    
    @ApiProperty()
    @IsInt()
    numBanheiro: number;

    @ApiProperty()
    @IsInt()
    numSuites: number;
    
    @ApiProperty()
    @IsNumber()
    area: number;

    @ApiProperty()
    @IsNumber()
    areaTotal: number;

    @ApiProperty()
    @IsNumber()
    condominio: number;
    
    @ApiProperty()
    @IsNumber()
    iptu: number;    
}