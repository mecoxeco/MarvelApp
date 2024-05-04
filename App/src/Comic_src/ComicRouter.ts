import express, { Request, Response } from 'express';
import { ComicService } from './ComicService';
import { Comic } from './ComicSchema';
import axios from 'axios';
import md5 from 'md5';

const router = express.Router();
const comicService = new ComicService();

const marvelPublicKey = 'sua_chave_publica';
const marvelPrivateKey = 'sua_chave_privada';

router.post('/', async (req: Request, res: Response) => {
    try {
        const comic = await comicService.createComic(req.body);
        res.json(comic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const comic = await comicService.getComicById(id);
        if (!comic) {
            res.status(404).json({ message: 'Comic não encontrada' });
        } else {
            res.json(comic);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const updatedComic = await comicService.updateComic(id, req.body);
        if (!updatedComic) {
            res.status(404).json({ message: 'Comic não encontrada' });
        } else {
            res.json(updatedComic);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const deleted = await comicService.deleteComic(id);
        if (!deleted) {
            res.status(404).json({ message: 'Comic não encontrada' });
        } else {
            res.json({ message: 'Comic deletada com sucesso' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/marvel-comics', async (req: Request, res: Response) => {
    try {
        const timestamp = new Date().getTime().toString();
        const hash = md5(timestamp + marvelPrivateKey + marvelPublicKey);
        const response = await axios.get(`https://gateway.marvel.com/v1/public/comics?apikey=${marvelPublicKey}&hash=${hash}&ts=${timestamp}`);
        const marvelComics = response.data.data.results;

        const comicsToSave: Comic[] = [];

        for (const marvelComic of marvelComics) {
            const comicData: Comic = {
                título: marvelComic.title,
                descrição: marvelComic.description,
                publicação: new Date(marvelComic.dates[0].date),
                capaURL: `${marvelComic.thumbnail.path}.${marvelComic.thumbnail.extension}`
            };

            comicsToSave.push(comicData);
        }

        await Comic.insertMany(comicsToSave);

        const comicsFromDb = await Comic.find();
        res.json(comicsFromDb);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
