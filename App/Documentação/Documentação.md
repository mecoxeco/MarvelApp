# MarvelAPP

[![GitHub license](https://img.shields.io/github/license/username/repository)](https://github.com/username/repository/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/username/repository)](https://github.com/username/repository/issues)
[![GitHub stars](https://img.shields.io/github/stars/username/repository)](https://github.com/username/repository/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/username/repository)](https://github.com/username/repository/network)

## Visão Geral

A Marvel Comics API é uma API RESTful que fornece acesso a informações sobre quadrinhos, criadores e personagens da Marvel. Esta API permite criar, recuperar, atualizar e excluir recursos relacionados a quadrinhos, criadores e personagens. Além disso, oferece integração com a API pública da Marvel Comics para recuperar dados de quadrinhos e criadores da Marvel.

## Recursos Disponíveis

- **Comic**: Representa um quadrinho da Marvel.
- **Criador**: Representa um criador de quadrinhos da Marvel.
- **Personagem**: Representa um personagem da Marvel.

## Endpoints

### Comic

- **POST /comic**: Cria uma nova comic.
- **GET /comic/:id**: Obtém uma comic por ID.
- **PUT /comic/:id**: Atualiza uma comic existente.
- **DELETE /comic/:id**: Exclui uma comic existente.
- **GET /comic/marvel-comics**: Obtém quadrinhos da Marvel da API pública da Marvel Comics.

### Criador

- **POST /criador**: Cria um novo criador.
- **GET /criador/:id**: Obtém um criador por ID.
- **PUT /criador/:id**: Atualiza um criador existente.
- **DELETE /criador/:id**: Exclui um criador existente.
- **GET /criador/marvel-criadores**: Obtém criadores da Marvel da API pública da Marvel Comics.

### Personagem

- **POST /personagem**: Cria um novo personagem.
- **GET /personagem/:id**: Obtém um personagem por ID.
- **PUT /personagem/:id**: Atualiza um personagem existente.
- **DELETE /personagem/:id**: Exclui um personagem existente.
- **GET /personagem/marvel-personagens**: Obtém personagens da Marvel da API pública da Marvel Comics.

## Exemplos de Requisições

Criar uma Comic
http
Copy code
POST /comic
Content-Type: application/json

{
  "título": "Guerra Civil #1",
  "descrição": "Guerra Civil é uma série de quadrinhos da Marvel Comics...",
  "publicação": "2006-07-01",
  "capaURL": "https://example.com/guerra-civil-1.jpg"
}
Obter uma Comic por ID
http
Copy code
GET /comic/123
Atualizar uma Comic existente
http
Copy code
PUT /comic/123
Content-Type: application/json

{
  "título": "Guerra Civil #2",
  "descrição": "Guerra Civil é uma série de quadrinhos da Marvel Comics...",
  "publicação": "2006-07-02",
  "capaURL": "https://example.com/guerra-civil-2.jpg"
}
Excluir uma Comic
http
Copy code
DELETE /comic/123
Obter todas as Comics da Marvel
http
Copy code
GET /comic/marvel-comics
Criar um novo Criador
http
Copy code
POST /criador
Content-Type: application/json

{
  "nome": "Stan Lee",
  "funcao": "Escritor",
  "hqsContribuidas": "Homem-Aranha, Quarteto Fantástico"
}
Obter um Criador por ID
http
Copy code
GET /criador/456
Atualizar um Criador existente
http
Copy code
PUT /criador/456
Content-Type: application/json

{
  "funcao": "Editor Chefe"
}
Excluir um Criador
http
Copy code
DELETE /criador/456
Obter todos os Criadores da Marvel
http
Copy code
GET /criador/marvel-criadores
Criar um novo Personagem
http
Copy code
POST /personagem
Content-Type: application/json

{
  "nome": "Homem de Ferro",
  "descrição": "Homem de Ferro é um super-herói fictício...",
  "url": "https://example.com/homem-de-ferro"
}
Obter um Personagem por ID
http
Copy code
GET /personagem/789
Atualizar um Personagem existente
http
Copy code
PUT /personagem/789
Content-Type: application/json

{
  "descrição": "Homem de Ferro é um super-herói bilionário, playboy e filantropo..."
}
Excluir um Personagem
http
Copy code
DELETE /personagem/789
Obter todos os Personagens da Marvel
http
Copy code
GET /personagem/marvel-personagens
