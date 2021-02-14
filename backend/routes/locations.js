var express = require('express');
const { LOCATIONS } = require('../constants/constants')
var router = express.Router();

router.get('/', function(req, res ) {
    res.status(200).json({
        data: Object.values(LOCATIONS)
    })
})

module.exports = router