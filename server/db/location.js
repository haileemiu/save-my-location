const db = require('.');

// Get all locations from db
const getLocations = () => {
    const query = 'SELECT * FROM "location";';

    return db.any(query);
}

// Add current location longitude and latitude to db
const addLocation = (latitude, longitude) => {
    const query = `INSERT INTO "location" ("coordinates") 
    VALUES ($1);`;

    return db.none(query, [ latitude + ',' + longitude]);
}

module.exports = { getLocations, addLocation };
