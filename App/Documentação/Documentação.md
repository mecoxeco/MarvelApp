# MarvelAPP

[![GitHub license](https://img.shields.io/github/license/mecoxeco/MarvelApp)](https://github.com/mecoxeco/MarvelApp/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/mecoxeco/MarvelApp)](https://github.com/mecoxeco/MarvelApp/issues)
[![GitHub stars](https://img.shields.io/github/stars/mecoxeco/MarvelApp)](https://github.com/mecoxeco/MarvelApp/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/mecoxeco/MarvelApp)](https://github.com/mecoxeco/MarvelApp/network)

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


## Criar uma Comic

```http
POST /comic
Content-Type: application/json
{
  "título": "Guerra Civil #1",
  "descrição": "Guerra Civil é uma série de quadrinhos da Marvel Comics...",
  "publicação": "2006-07-01",
  "capaURL": "https://example.com/guerra-civil-1.jpg"
}
```

## Obter uma Comic por ID

```http
GET /comic/123
```

## Atualizar uma Comic existente
```http
Content-Type: application/json
{
  "título": "Guerra Civil #2",
  "descrição": "Guerra Civil é uma série de quadrinhos da Marvel Comics...",
  "publicação": "2006-07-02",
  "capaURL": "https://example.com/guerra-civil-2.jpg"
}
```
