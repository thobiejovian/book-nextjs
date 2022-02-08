const Room = require("../models/room");
const mongoose = require("mongoose");
const rooms  = require("../data/rooms.json");

mongoose.connect("mongodb://localhost:27017/bookit", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const seedRooms = async () => {
    try{
        await Room.deleteMany();
        console.log("rooms are deleted");
        await Room.insertMany(rooms);
        console.log("All Rooms are added");
        process.exit()
    } catch(error) {
        console.log(error.message);
        process.exit()
    }
}

seedRooms();