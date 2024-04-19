import express, { Request, Response } from 'express';
import { ComicService } from './ComicService';

const router = express.Router();
const ComicService = new ComicService();

    router.post('/', async (req: Request, res: Response) => {
    // ROUTE CREATE <COMIC>
    });

    router.get('/:id', async (req: Request, res: Response) => {
    // ROUTE GETBYID <COMIC>
    });

    router.put('/:id', async (req: Request, res: Response) => {
    // ROUTE UPDATE <COMIC>
    });

    router.delete('/:id', async (req: Request, res: Response) => {
    // ROUTE DELETE <COMIC>
    });

export default router;    