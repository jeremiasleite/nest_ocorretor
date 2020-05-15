import { Document } from 'mongoose';

export interface Imovel extends Document{
    titulo: string
    descricao: string
    tipo: number
    condicaoImovel: number // 1=comprar, 2=alugar 3 =  imóveis novos , pode der renomeado para transação
    valor: number
    endBairro: string
    endRua: string
    endRumero: string
    endCidade: string
    endEstado: string
    endCep: string
    endComplemento: string    
    situacao: number//0-disponivel, 1-vendido, 2-alugado
    numGaragem: number
    numQuarto: number
    numBanheiro: number
    numSuites: number
    urlImagens: [UrlImagens],
    area: number,
    areaTotal: number
    itens: [string] //Churrasqueira,Espaço gourmet, Jardim, Piscina, Salão de festas, Salão de jogos, Lavanderia, Estacionamento, 
    destaque: string
    condominio: number
    iptu: number
    createdAt: Date
};

class UrlImagens{
    _id?: string
    url: string
    rotulo: string

    constructor(partial: Partial<UrlImagens>) {
        Object.assign(this, partial);
    }
}