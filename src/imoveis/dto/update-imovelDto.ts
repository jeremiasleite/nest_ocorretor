import { IsString, IsNotEmpty, IsNumber, IsInt, Min, Max, Length, IsPositive, IsMongoId, IsAlpha, IsNumberString } from 'class-validator';

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

    @IsMongoId()    
    _id: string;

    @IsString()
    @IsNotEmpty()
    @Length(5, 30)
    titulo: string;    
    
    @IsInt()
    @Min(1) 
    @Max(4)
    tipo: TipoImovel;
    
    @IsInt()
    @Min(1)
    @Max(3)
    condicaoImovel: CondicaoImovel;//transação

    @IsNumber()
    @IsNotEmpty()
    valor: number;

    @IsString()
    @IsNotEmpty()
    @Length(5, 255)
    descricao: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 255)
    endRua: string;

    @IsString()
    @Length(1, 6)
    endNumero: string;

    @IsString()
    @Length(2, 255)
    endCidade: string;
    
    @Length(2, 2)
    @IsAlpha()
    endEstado: string;

    @Length(8, 8)
    @IsNumberString()
    endCep: string;

    @IsString()
    @Length(2, 255)
    endComplemento: string;

    @IsInt()
    @Max(30)
    @Min(0)    
    numGaragem: number;
    
    @IsInt()
    @Max(30)
    @Min(0)
    numQuarto: number;
    
    @IsInt()
    @Max(30)
    @Min(0)
    numBanheiro: number;

    @IsInt()
    @Max(30)
    @Min(0)
    numSuites: number;
    
    @IsNumber()
    @IsPositive()
    area: number;

    @IsNumber()
    @IsPositive()
    areaTotal: number;

    @IsNumber()
    @IsPositive()
    condominio: number;
    
    @IsNumber()
    @IsPositive()
    iptu: number;
    
    constructor(partial: Partial<UpdateImovelDto>) {
        Object.assign(this, partial);
    }
}