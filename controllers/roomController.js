import Room from '../models/room';
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "../middlewares/catchAsyncError";
import ApiFeatures from "../utils/apiFeatures";

//create all rooms
const allRooms = catchAsyncError( async (req, res) => {

    const resPerPage = 3;
    const roomsCount = await Room.countDocuments();
    const apiFeatures = new ApiFeatures(Room.find(), req.query)
        .search()
        .filter()

    let rooms = await apiFeatures.query;
    let filteredRoomsCount = rooms.length;
    apiFeatures.pagination(resPerPage);
    rooms = await apiFeatures.query.clone();

    res.status(200).json({
        success: true,
        roomsCount,
        resPerPage,
        filteredRoomsCount,
        rooms
    })
})

// Create new Room = /api/rooms
const newRoom = catchAsyncError(async (req,res) => {
        const room = await Room.create(req.body)
        res.status(200).json({
            success: true,
            room
        })
})

//get room details = /api/rooms/:id
const getSingleRoom = catchAsyncError(async (req, res, next) => {
        const room = await Room.findById(req.query.id);
        if(!room) {
            return next(new ErrorHandler("Room not found with this ID", 404))
        }
        res.status(200).json({
            success: true,
            count: room.length,
            room
        })
})

//update Room details = api/rooms/:id
const updateRoom = catchAsyncError(async (req, res, next) => {
        let room = await Room.findById(req.query.id);
        if(!room) {
            return next(new ErrorHandler("Room not found with this ID", 404))
        }
        room = await Room.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            count: room.length,
            room
        })
})

//Delete Room = api/rooms/:id
const deleteRoom = catchAsyncError(async (req, res, next) => {
        const room = await Room.findById(req.query.id);
        if(!room) {
            return next(new ErrorHandler("Room not found with this ID", 404))
        }
        await room.remove();
        res.status(200).json({
            success: true,
            message: "Room is Deleted"
        })
})

export {
    allRooms,
    newRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom
}