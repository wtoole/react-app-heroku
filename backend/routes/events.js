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
    const numPlayers = 0;
    const playerList = [];
    const idnum = Number(req.body.idnum);
    time = req.body.time;

    const newEvent = new Event({
        eventName,
        description,
        directions,
        minPlayers,
        maxPlayers,
        date,
        numPlayers,
        playerList,
        time,
        idnum
    });


    console.log("Before the save");

    newEvent.save()
    .then(() => res.json('Event Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Event.findById(req.params.id)
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Event.findById(req.params.id)
    .then(event => {
    event.eventName = req.body.eventName;
    event.description = req.body.description;
    event.directions = req.body.directions;
    event.minPlayers = Number(req.body.minPlayers);
    event.maxPlayers = Number(req.body.maxPlayers);
    event.date = Date.parse(req.body.date);
    event.numPlayers = Number(req.body.numPlayers);
    event.playerList = req.body.playerList;
    event.idnum = Number(req.body.idnum);
    event.time = req.body.time;

    event.save()
    .then(() => res.json('Event updated!'))
    .catch(err => res.status(400).json('Error:' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});





module.exports = router;