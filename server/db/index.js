const pgp = require('pg-promise')();

const url = process.env.DATABASE_URL || 'postgres://haileemiu@localhost:5432/save-my-location';

const db = pgp(url);

module.exports = db;
