# Document-Management-System-FrontEnd

[![CircleCI](https://circleci.com/gh/andela-jwarugu/dms-frontend.svg?style=svg)](https://circleci.com/gh/andela-jwarugu/dms-frontend)
[![Coverage Status](https://coveralls.io/repos/github/andela-jwarugu/DMS-Frontend/badge.svg?branch=master)](https://coveralls.io/github/andela-jwarugu/DMS-Frontend?branch=master)

## Description

The system manages documents, users and user roles. Each document defines access rights, the document defines which roles can access it. Each document specifies the date it was published. Users are categorized by roles, each user has a role defined for them.

## Installation

You can run this project locally by following this procedure.

* You need NodeJS and MongoDB installed on your machine.
* Clone this repository and cd into the cloned folder.
* Install the project's dependencies:
   `$ npm install`
* Create a .env file with a secret key defined and names of the db.
* Run server:
  `$ npm start`

## Testing

You can run tests by ensuring you have the project set up then running:
* Both front-end and back-end:
  `$ npm test`
* Front-end:
  `$ npm run test:fend`
* Back-end:
  `$ npm run test:bend`
