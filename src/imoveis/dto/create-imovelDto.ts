import { IsString, IsNotEmpty, IsNumber, IsInt, Min, Max, Length } from 'class-validator';

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

    @IsString()
    @Length(2, 2)
    endEstado: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 8)
    endCep: string;

    @IsString()
    @Length(2, 255)
    endComplemento: string;

    @IsInt()    
    numGaragem: number;
    
    @IsInt()
    numQuarto: number;
    
    @IsInt()
    numBanheiro: number;

    @IsInt()
    numSuites: number;
    
    @IsNumber()
    area: number;

    @IsNumber()
    areaTotal: number;

    @IsNumber()
    condominio: number;
    
    @IsNumber()
    iptu: number;    
}