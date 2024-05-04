import { Comic } from './ComicSchema';
import axios from 'axios';
import md5 from 'md5'; 

const marvelPublicKey = 'sua_chave_publica';
const marvelPrivateKey = 'sua_chave_privada'; 

export class ComicService {
    async createComic(comicData: Comic): Promise<Comic> {
        try {
            const comic = await Comic.create(comicData);
            return comic;
        } catch (error) {
            throw new Error('Erro ao criar comic: ' + error.message);
        }
    }

    async getComicById(id: string): Promise<Comic | null> {
        try {
            const comic = await Comic.findById(id);
            return comic;
        } catch (error) {
            throw new Error('Erro ao obter comic por ID: ' + error.message);
        }
    }

    async updateComic(id: string, comicData: Partial<Comic>): Promise<Comic | null> {
        try {
            const updatedComic = await Comic.findByIdAndUpdate(id, comicData, { new: true });
            return updatedComic;
        } catch (error) {
            throw new Error('Erro ao atualizar comic: ' + error.message);
        }
    }

    async deleteComic(id: string): Promise<boolean> {
        try {
            const deleted = await Comic.findByIdAndDelete(id);
            return deleted ? true : false;
        } catch (error) {
            throw new Error('Erro ao deletar comic: ' + error.message);
        }
    }

    async getMarvelComics(): Promise<Comic[]> {
        try {
            const timestamp = new Date().getTime().toString();
            const hash = md5(timestamp + marvelPrivateKey + marvelPublicKey);
            const response = await axios.get(`https://gateway.marvel.com/v1/public/comics?apikey=${marvelPublicKey}&hash=${hash}&ts=${timestamp}&events=238`); // 238 -> Guerra Civil
            const marvelComics = response.data.data.results;
    
            const comicsToSave: Comic[] = [];
    
            for (const marvelComic of marvelComics) {
                const comicData: Comic = {
                    title: marvelComic.title,
                    description: marvelComic.description,
                    publicationDate: new Date(marvelComic.dates[0].date),
                    coverUrl: `${marvelComic.thumbnail.path}.${marvelComic.thumbnail.extension}`
                };
    
                comicsToSave.push(comicData);
            }
    
            await Comic.insertMany(comicsToSave);
    
            const comicsFromDb = await Comic.find();
            return comicsFromDb;
        } catch (error) {
            throw new Error('Erro ao obter quadrinhos da Marvel: ' + error.message);
        }
    }
}      
