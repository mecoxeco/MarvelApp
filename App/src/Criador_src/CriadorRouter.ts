// CriadorRouter.ts
import express, { Request, Response } from 'express';
import { CriadorService } from './CriadorService';
import { Criador } from './CriadorSchema';

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

export default router;
