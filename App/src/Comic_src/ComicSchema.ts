import mongoose, { schema, Document } from 'mongoose';

export interface Comic extends Document {
    Título: string;
    Descrição: string;
    Publicação: Date;
    CapaURL: string;
}

const ComicSchema: Schema = new Schema ({
    Título: { type: String, required: true },
    Descrição: { type: String, required: true },
    Publicação: { type: Date, required: true },
    CapaURL: { type: String, required: true},
});

export default mongoose.model <comic>('comic', ComicSchema);