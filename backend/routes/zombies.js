var express = require('express');
const { v4: uuidv4 } = require('uuid');
var { LOCATIONS } = require('../constants/constants')
var router = express.Router();


// No database for this challenge
let zombies = [
    { id: uuidv4(), name: 'Flavio', location: LOCATIONS.Hospital },
    { id: uuidv4(), name: 'Flavio2', location: LOCATIONS.Hospital },
    { id: uuidv4(), name: 'Flavio3', location: LOCATIONS.School },
    { id: uuidv4(), name: 'Flavio4', location: LOCATIONS.Warehouse },
    { id: uuidv4(), name: 'Flavio5', location: LOCATIONS.Hospital },
    { id: uuidv4(), name: 'Flavio', location: LOCATIONS.Hospital },
    { id: uuidv4(), name: 'Flavio2', location: LOCATIONS.Hospital },
    { id: uuidv4(), name: 'Flavio3', location: LOCATIONS.School  },
    { id: uuidv4(), name: 'Flavio4', location: LOCATIONS.School  },
    { id: uuidv4(), name: 'Flavio5', location: LOCATIONS.Warehouse }
]

/* GET zombies listing. */
router.get('/', function(req, res, next) {
    res.status(200).json({
        data: zombies
    })
});

router.patch('/', function(req, res) {
    zombies.forEach(zombie => { 
        const updated_zombie = req.body.zombies.find(({ id }) => zombie.id === id) || {}
        if (updated_zombie.location) {
            zombie.location = updated_zombie.location
        }
        if (updated_zombie.name) {
            zombie.name = updated_zombie.name
        }
    })
    res.status(200).json({
        data: zombies
    })
});

router.get('/:id', function(req, res) {
    const zombie = zombies.find(({ id }) => id === req.params.id)
    if (zombie) {
        res.status(200).json({
            data: zombie
        })
    }
})

router.post('/', function(req, res) {
    const zombie = { id: uuidv4(), name: req.body.name, location: req.body.location }
    zombies.push(zombie)
    res.status(201).json({ data: zombie })
})

module.exports = router;
