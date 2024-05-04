const request = require('supertest');
const app = require('../src/app');
const Comic = require('../src/ComicSchema');
const Criador = require('../src/CriadorSchema');
const Personagem = require('../src/PersonagemSchema');

describe('Testes Automatizados para Comic', () => {
  beforeAll(async () => {
    await Comic.deleteMany({});
  });

  it('Deve criar uma nova comic', async () => {
    const newComic = {
      título: 'Guerra Civil #1',
      descrição: 'Guerra Civil é uma série de quadrinhos da Marvel Comics, que apresenta um conflito entre os super-heróis sobre o Ato de Registro de Super-humanos.',
      publicação: '2006-07-01',
      capaURL: 'https://example.com/guerra-civil-1.jpg'
    };

    const response = await request(app)
      .post('/comic')
      .send(newComic);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.título).toBe(newComic.título);
  });

  it('Deve obter uma comic por ID', async () => {
    const comic = new Comic({
      título: 'Guerra Civil #2',
      descrição: 'Continuação da saga Guerra Civil, onde a tensão entre os heróis continua a crescer.',
      publicação: '2006-08-01',
      capaURL: 'https://example.com/guerra-civil-2.jpg'
    });
    await comic.save();

    const response = await request(app).get(`/comic/${comic._id}`);

    expect(response.status).toBe(200);
    expect(response.body.título).toBe(comic.título);
  });

  it('Deve atualizar uma comic existente', async () => {
    const comic = new Comic({
      título: 'Guerra Civil #3',
      descrição: 'Terceira parte da saga Guerra Civil.',
      publicação: '2006-09-01',
      capaURL: 'https://example.com/guerra-civil-3.jpg'
    });
    await comic.save();

    const updatedComicData = {
      descrição: 'Terceira parte da saga Guerra Civil, onde o conflito atinge seu clímax.'
    };

    const response = await request(app)
      .put(`/comic/${comic._id}`)
      .send(updatedComicData);

    expect(response.status).toBe(200);
    expect(response.body.descrição).toBe(updatedComicData.descrição);
  });

  it('Deve excluir uma comic existente', async () => {
    const comic = new Comic({
      título: 'Guerra Civil #4',
      descrição: 'Quarta parte da saga Guerra Civil.',
      publicação: '2006-10-01',
      capaURL: 'https://example.com/guerra-civil-4.jpg'
    });
    await comic.save();

    const response = await request(app).delete(`/comic/${comic._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Comic deletada com sucesso');
  });
});

describe('Testes Automatizados para Criador', () => {
  beforeAll(async () => {
    await Criador.deleteMany({});
  });

  it('Deve criar um novo criador', async () => {
    const newCriador = {
      nome: 'Mark Millar',
      funcao: 'Escritor',
      hqsContribuidas: 'Guerra Civil'
    };

    const response = await request(app)
      .post('/criador')
      .send(newCriador);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.nome).toBe(newCriador.nome);
  });

  it('Deve obter um criador por ID', async () => {
    const criador = new Criador({
      nome: 'Steve McNiven',
      funcao: 'Desenhista',
      hqsContribuidas: 'Guerra Civil'
    });
    await criador.save();

    const response = await request(app).get(`/criador/${criador._id}`);

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe(criador.nome);
  });

  it('Deve atualizar um criador existente', async () => {
    const criador = new Criador({
      nome: 'Joe Quesada',
      funcao: 'Editor',
      hqsContribuidas: 'Guerra Civil'
    });
    await criador.save();

    const updatedCriadorData = {
      funcao: 'Editor Chefe'
    };

    const response = await request(app)
      .put(`/criador/${criador._id}`)
      .send(updatedCriadorData);

    expect(response.status).toBe(200);
    expect(response.body.funcao).toBe(updatedCriadorData.funcao);
  });

  it('Deve excluir um criador existente', async () => {
    const criador = new Criador({
      nome: 'Brian Michael Bendis',
      funcao: 'Roteirista',
      hqsContribuidas: 'Guerra Civil'
    });
    await criador.save();

    const response = await request(app).delete(`/criador/${criador._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Criador deletado com sucesso');
  });
});

describe('Testes Automatizados para Personagem', () => {
  beforeAll(async () => {
    await Personagem.deleteMany({});
  });

  it('Deve criar um novo personagem', async () => {
    const newPersonagem = {
      nome: 'Homem de Ferro',
      descrição: 'Tony Stark é um industrial bilionário, inventor e empresário, além de ser um dos super-heróis mais inteligentes e tecnologicamente avançados do mundo.',
      url: 'https://example.com/homem-de-ferro.jpg'
    };

    const response = await request(app)
      .post('/personagem')
      .send(newPersonagem);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.nome).toBe(newPersonagem.nome);
  });

  it('Deve obter um personagem por ID', async () => {
    const personagem = new Personagem({
      nome: 'Capitão América',
      descrição: 'Steve Rogers é um super-soldado americano, que luta pela justiça e liberdade, liderando os Vingadores em momentos de crise.',
      url: 'https://example.com/capitao-america.jpg'
    });
    await personagem.save();

    const response = await request(app).get(`/personagem/${personagem._id}`);

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe(personagem.nome);
  });

  it('Deve atualizar um personagem existente', async () => {
    const personagem = new Personagem({
      nome: 'Homem-Aranha',
      descrição: 'Peter Parker é um jovem que adquiriu superpoderes após ser picado por uma aranha radioativa. Ele usa seus poderes para combater o crime em Nova York.',
      url: 'https://example.com/homem-aranha.jpg'
    });
    await personagem.save();

    const updatedPersonagemData = {
      descrição: 'Peter Parker, também conhecido como Homem-Aranha, é um dos mais icônicos super-heróis da Marvel.'
    };

    const response = await request(app)
      .put(`/personagem/${personagem._id}`)
      .send(updatedPersonagemData);

    expect(response.status).toBe(200);
    expect(response.body.descrição).toBe(updatedPersonagemData.descrição);
  });

  it('Deve excluir um personagem existente', async () => {
    const personagem = new Personagem({
      nome: 'Thor',
      descrição: 'Thor Odinson é o deus do trovão e príncipe de Asgard. Ele é um dos membros mais poderosos e nobres dos Vingadores.',
      url: 'https://example.com/thor.jpg'
    });
    await personagem.save();

    const response = await request(app).delete(`/personagem/${personagem._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Personagem deletado com sucesso');
  });
});
