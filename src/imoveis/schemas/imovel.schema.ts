import * as mongoose from 'mongoose';

export const ImovelSchema = new mongoose.Schema({
    titulo: {
        type: String,
    },
    descricao: {
        type: String,
    },
    tipo: {//1 = Casa, 2 = apartamento, 3 = imovelcomecial, 4 = terreno
        type: Number,
    },
    condicaoImovel: Number, // 1=comprar, 2=alugar 3 =  imóveis novos , pode der renomeado para transação
    valor: {
        type: String
    },
    endBairro: String,
    endRua: String,
    endRumero: String,
    endCidade: String,
    endEstado: String,
    endCep: String,
    endComplemento: String,    
    situacao: {type: Number, default: 0},//0-disponivel, 1-vendido, 2-alugado
    numGaragem: Number,
    numQuarto: Number,
    numBanheiro: Number,
    numSuites: Number,
    urlImagens: [{id: String, url: String, rotulo: String}],
    area: Number,
    areaTotal: Number,
    itens: [String], //Churrasqueira,Espaço gourmet, Jardim, Piscina, Salão de festas, Salão de jogos, Lavanderia, Estacionamento, 
    destaque: {
        type: Boolean,
        default: false
    },    
    condominio: String,
    iptu: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});