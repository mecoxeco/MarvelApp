import express, { Request, Response } from 'express';
import { ComicService } from './ComicService';

const router = express.Router();
const ComicService = new ComicService();

    router.post('/', async (req, res) => {
    // ROUTE CREATE <COMIC>
    });

    router.get('/:id', async (req, res) => {
    // ROUTE GETBYID <COMIC>
    });

    router.put('/:id', async (req, res) => {
    // ROUTE UPDATE <COMIC>
    });

    router.delete('/:id', async (req, res) => {
    // ROUTE DELETE <COMIC>
    });

export default router;    