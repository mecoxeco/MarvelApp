import mongoose, { Schema, Document, model } from 'mongoose';

export interface Personagem extends Document {
    nome: string;
    descricao: string;
    url: string;
}

const PersonagemSchema: Schema = new Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    url: { type: String, required: true }
}, {
    timestamps: true
});

export default model("Personagem", PersonagemSchema);