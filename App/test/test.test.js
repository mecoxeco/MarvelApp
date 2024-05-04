const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Comic = require('../src/Comic_src/ComicSchema');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await Comic.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Testes Automatizados para Comic', () => {
  it('Deve criar um novo comic', async () => {
    const newComic = {
      title: 'Spider-Man: Far From Home',
      description: 'Marvel comic featuring Spider-Man',
      publicationDate: '2022-01-01',
      coverUrl: 'https://example.com/spider-man-far-from-home.jpg'
    };

    const response = await request(app)
      .post('/comic')
      .send(newComic);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(newComic.title);
  });

  it('Deve obter um comic por ID', async () => {
    const comic = new Comic({
      title: 'Avengers: Endgame',
      description: 'Marvel comic featuring Avengers',
      publicationDate: '2021-01-01',
      coverUrl: 'https://example.com/avengers-endgame.jpg'
    });
    await comic.save();

    const response = await request(app).get(`/comic/${comic._id}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(comic.title);
  });

  it('Deve atualizar um comic existente', async () => {
    const comic = new Comic({
      title: 'Black Panther',
      description: 'Marvel comic featuring Black Panther',
      publicationDate: '2020-01-01',
      coverUrl: 'https://example.com/black-panther.jpg'
    });
    await comic.save();

    const updatedComic = {
      title: 'Black Panther: Wakanda Forever',
      description: 'Updated Marvel comic featuring Black Panther',
      publicationDate: '2020-12-01',
      coverUrl: 'https://example.com/black-panther-wakanda-forever.jpg'
    };

    const response = await request(app)
      .put(`/comic/${comic._id}`)
      .send(updatedComic);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedComic.title);
  });

  it('Deve deletar um comic existente', async () => {
    const comic = new Comic({
      title: 'Thor: Ragnarok',
      description: 'Marvel comic featuring Thor',
      publicationDate: '2019-01-01',
      coverUrl: 'https://example.com/thor-ragnarok.jpg'
    });
    await comic.save();

    const response = await request(app).delete(`/comic/${comic._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Comic deletada com sucesso');
  });
});

// Continuação dos testes para Criador e Personagem...
