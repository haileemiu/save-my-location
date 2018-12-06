const router = require('express').Router();
const locationDb = require('../db/location');

// Get stored locations from save-my-location db
// Send locations back to client
router.get('/', (req, res) => {
    locationDb.getLocations()
        .then((results) => { res.send(results) })
        .catch((error) => {
            console.log('Error in getting locations:', error);
            res.sendStatus(500);
        })
})

// Add location to db
router.post('/', (req, res) => {
    console.log(req.body); // FOR DEV
    locationDb.addLocation(req.body.longitude, req.body.latitude)
        .then(() => { res.sendStatus(200) })
        .catch((error) => {
            console.log('Error in adding location:', error);
            res.sendStatus(500)
        })
})

module.exports = router;
