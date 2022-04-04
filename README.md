
# Trybe Futebol Clube ⚽

O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽

## Objetivo
 Devenvolver um back-end dockerizado utilizando modelagem de dados através do `Sequelize`, respeitando regras de negócio propostas e uma API capaz de ser consumida por um front-end já provido.


## Stack utilizada
<div align="left">
 <b>Front-end:</b>
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
     <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"/>

</div>
<br/>
<div align="left">
 <b>Back-end:</b>
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
    <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
    <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white"/>
    <img src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white"/>
    <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"/>
    <img src="https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white"/>
    <img src="https://img.shields.io/badge/chai-A30701?style=for-the-badge&logo=chai&logoColor=white"/>
</div> 

## Habilidades

- Realizar a dockerização dos apps, network, volume e compose;
 - Modelar dados com **MySQL** através do **Sequelize**;
 - Criar e associar tabelas usando `models` do `sequelize`;
 - Construir uma **API REST** com endpoints para consumir os models criados;
 - Fazer um `CRUD` utilizando `ORM`;

## Demonstração

Página de Classificação: 

<img src="https://github.com/natanielsantos159/trybe-futebol-clube/blob/nataniel-santos-trybe-futebol-clube/front-example.png?raw=true" />

## Variáveis de Ambiente

Para rodar o backend separadamente, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`PORT`

`DB_USER`

`DB_PASS`

`DB_HOST`

`DB_PORT`
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

