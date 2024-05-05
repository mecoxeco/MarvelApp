import express, { Request, Response } from 'express';
import { ComicService } from './ComicService';
import { Comic } from './ComicSchema';
import axios from 'axios';
import md5 from 'md5';

const router = express.Router();
const comicService = new ComicService();

const marvelPublicKey = '4c75056781c2f72964983ce847b7ab96';
const marvelPrivateKey = 'f4add723385ac8fbc2f7f5d9891e96f83aeef64e';

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

router.get('/marvel-comics/:numero', async (req: Request, res: Response) => {
    const { numero } = req.params;
    try {
        const timestamp = new Date().getTime().toString();
        const hash = md5(timestamp + marvelPrivateKey + marvelPublicKey);
        const response = await axios.get(`https://gateway.marvel.com/v1/public/comics?issueNumber=${numero}&apikey=${marvelPublicKey}&hash=${hash}&ts=${timestamp}`);
        
        if (response.status === 200) {
            const marvelComics = response.data.data.results;
            res.json(marvelComics);
        } else {
            res.status(response.status).json({ message: 'Erro ao buscar as edições.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});


export default router;
