import express from 'express';
import comicRouter from './src/Comic_src/ComicRouter';
import criadorRouter from './src/Criador_src/CriadorRouter';
import personagemRouter from './src/Personagem_src/PersonagemRouter';

const router = express.Router();

router.use('/comic', comicRouter);
router.use('/criador', criadorRouter);
router.use('/personagem', personagemRouter);

export default router;
