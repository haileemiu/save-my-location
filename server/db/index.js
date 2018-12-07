const pgp = require('pg-promise')();

const db = pgp('postgres://haileemiu@localhost:5432/save-my-location');

module.exports = db;
