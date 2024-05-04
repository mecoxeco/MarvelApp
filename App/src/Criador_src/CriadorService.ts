import express, { Request, Response } from 'express';
import { CriadorService } from './CriadorService';
import { Criador } from './CriadorSchema';
import md5 from 'md5'; // Importe a função md5 para calcular o hash
import axios from 'axios';

const router = express.Router();
const criadorService = new CriadorService();

router.post('/', async (req, res) => {
    try {
        const criador = await criadorService.createCriador(req.body);
        res.json(criador);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const criador = await criadorService.getCriadorById(id);
        if (!criador) {
            res.status(404).json({ message: 'Criador não encontrado' });
        } else {
            res.json(criador);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedCriador = await criadorService.updateCriador(id, req.body);
        if (!updatedCriador) {
            res.status(404).json({ message: 'Criador não encontrado' });
        } else {
            res.json(updatedCriador);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await criadorService.deleteCriador(id);
        if (!deleted) {
            res.status(404).json({ message: 'Criador não encontrado' });
        } else {
            res.json({ message: 'Criador deletado com sucesso' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/marvel-criadores', async (req: Request, res: Response) => {
    try {
        const timestamp = new Date().getTime().toString();
        const hash = md5(timestamp + marvelPrivateKey + marvelPublicKey);
        const response = await axios.get(`https://gateway.marvel.com/v1/public/creators?apikey=${marvelPublicKey}&hash=${hash}&ts=${timestamp}&events=238`);
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
        res.json(criadoresFromDb);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
