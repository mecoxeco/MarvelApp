import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import comicRouter from './Comic_src';
import personagemRouter from './Personagem_src';
import criadorRouter from './Criador_src';

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Conectado ao banco de dados MongoDB");
})
.catch((error) => {
  console.error("Erro ao conectar ao banco de dados MongoDB:", error);
  process.exit(1);
});

app.use('/comic', comicRouter);
app.use('/personagem', personagemRouter);
app.use('/criador', criadorRouter);

app.get('/', (req, res) => {
  res.send('Bem-vindo ao MarvelApp API! Consulte a documentação se necessário.');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
