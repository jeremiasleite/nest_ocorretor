import * as mongoose from 'mongoose';

export const ImovelSchema = new mongoose.Schema({
    titulo: String,
    descricao: String,
    tipo: { 
        type:Number,
        enum: [1,2,3]//1 = Casa, 2 = apartamento, 3 = imovelcomecial, 4 = terreno
    },    
    condicaoImovel:{
        type: Number, 
        enum: [1,2,3,4]// 1=comprar, 2=alugar 3 =  imóveis novos , pode der renomeado para transação
    },
    valor: Number,
    endBairro: String,
    endRua: String,
    endRumero: String,
    endCidade: String,
    endEstado: String,
    endCep: String,
    endComplemento: String,    
    situacao: {
        type: Number,
        enum: [1, 2, 3],//1-disponivel, 2-vendido, 3-alugado
        default: 0
    },
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
    condominio: Number,
    iptu: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});