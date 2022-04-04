
# Trybe Futebol Clube ⚽

O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽

## Objetivo
 Devenvolver um back-end dockerizado utilizando modelagem de dados através do `Sequelize`, respeitando regras de negócio propostas e uma API capaz de ser consumida por um front-end já provido.


## Stack utilizada

**Front-end:** `React`, `Context API`

**Back-end:** `Node`, `Express`, `TypeScript`, `Sequelize`, `Docker / Docker Compose`, `MySQL`


## Habilidades

- Realizar a dockerização dos apps, network, volume e compose;
 - Modelar dados com **MySQL** através do **Sequelize**;
 - Criar e associar tabelas usando `models` do `sequelize`;
 - Construir uma **API REST** com endpoints para consumir os models criados;
 - Fazer um `CRUD` utilizando `ORM`;

## Screenshot

Página de Classificação: 

<img src="https://github.com/natanielsantos159/trybe-futebol-clube/blob/nataniel-santos-trybe-futebol-clube/front-example.png?raw=true" />

## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:natanielsantos159/trybe-futebol-clube.git
```

Entre no diretório do projeto

```bash
  cd trybe-futebol-clube
```

Instale as dependências

```bash
  npm install
```

### Rodando com Docker Compose
Entre no diretório app

```bash
  cd app
```

Rode esse comando 
```bash
  npm run compose:up
```

Acesse o app através do endpoint https://localhost:3000

Para parar a execução dos containers: 
```bash
  npm run compose:down
```




## Rodando os testes do backend

Entre no diretório do backend

```bash
  cd app/backend
```
Rode o seguinte comando

```bash
  npm run test
```

Para saber a cobertura dos testes
```bash
  npm run test:coverage
```
## Feedback

Se você tiver algum feedback, por favor entre em contato por meio de nathan.santos159@hotmail.com

