# App

GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

# Arquitetura de Projeto

## dependencias

- npm init -y
- npm i typescript @type/node tsx tsup -D
- npx tsc --init
- npm i fastify

## start

- npm start:dev: tsx watch src/server.ts
- npm build: tsup src --out-dir dist
- npm start: node dist/server.ts

- .npmrc: save-exact=true -> reinstale todas as libs e as versóes permaneceram exatas!
  obs: renovade: ajustas as versões das libs onde, ele faz um por um, garantindo a integridade do sistema!

- npm i dotenv
- npm i zod
- npm i bcryptjs -> hash de senhas

- npm i prisma
- npx prisma init
- npx prisma generate
- npm i @prisma/client

## Desing Patterns

->
-> Repository Patterns: desacoplar a repsonsabilidade de comunicaçao com o banco da nossa regra de negocio (service)
-> In-Memory Cache: salva os dados em memoria e não no banco de dados! ( deixa os testes extremamente mais rapidos)

## testes

- npm i vitest vite-tsconfig-paths
