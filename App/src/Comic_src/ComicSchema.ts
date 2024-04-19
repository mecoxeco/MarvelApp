import mongoose, { Schema, Document, model } from 'mongoose';

export interface Comic extends Document {
    título: string;
    descrição: string;
    publicação: Date;
    capaURL: string;
}

const ComicSchema: Schema = new Schema ({
    título: { type: String, required: true },
    descrição: { type: String, required: true },
    publicação: { type: Date, required: true },
    capaURL: { type: String, required: true},
});

export default model<Comic>("Comic", ComicSchema);
