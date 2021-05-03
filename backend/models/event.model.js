const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const eventSchema = new Schema({
    eventName: {type: String, required: true},
    description: {type: String, required: true},
    directions: {type: String, required: true},
    minPlayers: {type: Number, required: true},
    maxPlayers: {type: Number, required: true},
    date: {type: Date, required: true},
    numPlayers: {type: Number, required: true},
    playerList: {type: [String], required: true},
    time: {type: String, required: true},
    idnum: {type: Number, required: true}
}, {
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;