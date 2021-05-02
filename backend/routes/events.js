const router = require('express').Router();
let Event = require('../models/event.model');

router.route('/').get((req, res) => {
    Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const eventName = req.body.eventName;
    const description = req.body.description;
    const directions = req.body.directions;
    const minPlayers = Number(req.body.minPlayers);
    const maxPlayers = Number(req.body.maxPlayers);
    const date = Date.parse(req.body.date);

    const newEvent = new Event({
        eventName,
        description,
        directions,
        minPlayers,
        maxPlayers,
        date,
    });


    console.log("Before the save");

    newEvent.save()
    .then(() => res.json('Event Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;