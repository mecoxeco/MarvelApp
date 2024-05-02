import mongoose, { Schema, Document, model } from 'mongoose';

export interface Criador extends Document {
    nome: string;
    funcao: string;
    hqsContribuidas: string;
}

const CriadorSchema: Schema = new Schema({
    nome: { type: String, required: true },
    funcao: { type: String, required: true },
    hqsContribuidas: { type: String, required: true },
}, {
    timestamps: true
});

export default model("Criador", CriadorSchema);