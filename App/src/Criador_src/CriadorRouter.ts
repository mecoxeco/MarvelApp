import express, { Request, Response } from 'express';
import { CriadorService } from './CriadorService';

const router = express.Router();
const CriadorService = new CriadorService();

    router.post('/', async (req, res) => {
    // ROUTE CREATE <CRIADOR>
    });

    router.get('/:id', async (req, res) => {
    // ROUTE GETBYID <CRIADOR>
    });

    router.put('/:id', async (req, res) => {
    // ROUTE UPDATE <CRIADOR>
    });

    router.delete('/:id', async (req, res) => {
    // ROUTE DELETE <CRIADOR>
    });

export default router; 