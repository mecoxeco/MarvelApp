// PersonagemRouter.ts
import express, { Request, Response } from 'express';
import { PersonagemService } from './PersonagemService';
import { Personagem } from './PersonagemSchema';

const router = express.Router();
const personagemService = new PersonagemService();

router.post('/', async (req, res) => {
    try {
        const personagem = await personagemService.createPersonagem(req.body);
        res.json(personagem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const personagem = await personagemService.getPersonagemById(id);
        if (!personagem) {
            res.status(404).json({ message: 'Personagem não encontrado' });
        } else {
            res.json(personagem);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedPersonagem = await personagemService.updatePersonagem(id, req.body);
        if (!updatedPersonagem) {
            res.status(404).json({ message: 'Personagem não encontrado' });
        } else {
            res.json(updatedPersonagem);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await personagemService.deletePersonagem(id);
        if (!deleted) {
            res.status(404).json({ message: 'Personagem não encontrado' });
        } else {
            res.json({ message: 'Personagem deletado com sucesso' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
