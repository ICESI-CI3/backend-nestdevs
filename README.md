<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
# Icesi Marketplace

La Comunidad Universitaria de Icesi actualmente enfrenta desafíos significativos en el proceso de comercialización de sus diversos productos. El uso de WhatsApp como plataforma principal ha llevado a la saturación de los grupos, lo que ha dificultado que los usuarios potenciales conozcan y accedan a los productos disponibles. Esta situación no solo afecta a los compradores, sino también a los vendedores, quienes se ven limitados en su capacidad de promover y vender sus productos de manera efectiva.

Ante esta problemática, surge la necesidad de implementar un sistema de gestión de ventas moderno y eficiente que optimice el proceso de comercialización y brinde una mejor experiencia tanto a los compradores como a los vendedores.


## Instalación

1. Clona este repositorio en tu máquina local.
2. Ejecuta `npm install` para instalar todas las dependencias.

## Configuración

Antes de ejecutar la aplicación, necesitas configurar algunos archivos de configuración:

1. Crea un archivo `.env` en la raíz del proyecto.
2. Agrega las siguientes variables de entorno en el archivo `.env`:

```bash
DB_PASSWORD = Icesi2021
DB_NAME = db_icesi_marketplace

DATABASE_HOST = localhost
DATABASE_PORT = 5432
DATABASE_USER = postgres
DATABASE_PASSWORD = Icesi2021
DATABASE_NAME = db_icesi_marketplace

JWT_SECRET = icesi_marketplace
```


Una vez que hayas instalado las dependencias y configurado los archivos de entorno, puedes ejecutar la aplicación:
`npm start`

# Ejecutar Docker Compose:

Primero debes de tener la aplicación de docker abierta.

Abre una terminal en el directorio donde tienes tu archivo docker-compose.yml y ejecuta el siguiente comando:
`docker-compose up -d`

# Ejecutar las pruebas:
Una vez que todas las dependencias estén instaladas y las variables de entorno estén configuradas, puedes ejecutar las pruebas automatizadas utilizando el siguiente comando:
`npx jest` o `npm test`



