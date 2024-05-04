import { Criador } from './CriadorSchema';
import axios from 'axios';
import md5 from 'md5';

const marvelPublicKey = 'sua_chave_publica';
const marvelPrivateKey = 'sua_chave_privada';

export class CriadorService {
    async createCriador(criadorData: Criador): Promise<Criador> {
        try {
            const criador = await Criador.create(criadorData);
            return criador;
        } catch (error) {
            throw new Error('Erro ao criar criador: ' + error.message);
        }
    }

    async getCriadorById(id: string): Promise<Criador | null> {
        try {
            const criador = await Criador.findById(id);
            return criador;
        } catch (error) {
            throw new Error('Erro ao obter criador por ID: ' + error.message);
        }
    }

    async updateCriador(id: string, criadorData: Partial<Criador>): Promise<Criador | null> {
        try {
            const updatedCriador = await Criador.findByIdAndUpdate(id, criadorData, { new: true });
            return updatedCriador;
        } catch (error) {
            throw new Error('Erro ao atualizar criador: ' + error.message);
        }
    }

    async deleteCriador(id: string): Promise<boolean> {
        try {
            const deleted = await Criador.findByIdAndDelete(id);
            return deleted ? true : false;
        } catch (error) {
            throw new Error('Erro ao deletar criador: ' + error.message);
        }
    }

    async getMarvelCriadores(): Promise<Criador[]> {
        try {
            const timestamp = new Date().getTime().toString();
            const hash = md5(timestamp + marvelPrivateKey + marvelPublicKey);
            const response = await axios.get(`https://gateway.marvel.com/v1/public/creators?apikey=${marvelPublicKey}&hash=${hash}&ts=${timestamp}&events=238`); // Evento 238 representa a saga Guerra Civil
            const marvelCriadores = response.data.data.results;

            const criadoresToSave: Criador[] = [];

            for (const marvelCriador of marvelCriadores) {
                const criadorData: Criador = {
                    nome: marvelCriador.fullName,
                    funcao: marvelCriador.role,
                    hqsContribuidas: marvelCriador.comics.map((comic: any) => comic.title).join(', ')
                };

                criadoresToSave.push(criadorData);
            }

            await Criador.insertMany(criadoresToSave);

            const criadoresFromDb = await Criador.find();
            return criadoresFromDb;
        } catch (error) {
            throw new Error('Erro ao obter criadores da Marvel: ' + error.message);
        }
    }
}