import express, { Request, Response } from 'express';
import { PersonagemService } from './PersonagemService';

const router = express.Router();
const PersonagemService = new PersonagemService();

    router.post('/', async (req, res) => {
    // ROUTE CREATE <PERSONAGEM>
    });

    router.get('/:id', async (req, res) => {
    // ROUTE GETBYID <PERSONAGEM>
    });

    router.put('/:id', async (req, res) => {
    // ROUTE UPDATE <PERSONAGEM>
    });

    router.delete('/:id', async (req, res) => {
    // ROUTE DELETE <PERSONAGEM>
    });

export default router; 