const pgp = require('pg-promise')();

const db = pgp('postgres://initial@localhost:5432/save-my-location');

module.exports = db;
