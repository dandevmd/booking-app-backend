"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsController = void 0;
const database_1 = require("../database");
class RoomsController {
    constructor() {
        this.createRoom = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { title, price, description, max_people, unavailable_dates } = req.body;
            const { id: hotels_id } = req.params;
            try {
                const newRoom = yield database_1.pool.query("INSERT INTO rooms (title, price, description, max_people, unavailable_dates,hotels_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [title, price, description, max_people, unavailable_dates, hotels_id]);
                res.status(201).send(newRoom.rows[0]);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(500).json({
                        message: error.message,
                        file: "roomsController.ts",
                        method: "createRoom",
                    });
                }
            }
        });
        this.updateRoom = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id: room_id } = req.params;
            const { title, price, description, max_people, unavailable_dates } = req.body;
            try {
                const updateRoom = yield database_1.pool.query("UPDATE rooms SET title = COALESCE($1, title), price = COALESCE($2, price), description = COALESCE($3, description), max_people = COALESCE($4, max_people), unavailable_dates = COALESCE($5, unavailable_dates) WHERE room_id = $6 RETURNING *", [title, price, description, max_people, unavailable_dates, room_id]);
                res.status(200).send("Room updated successfully");
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(500).json({
                        message: error.message,
                        file: "roomsController.ts",
                        method: "updateRoom",
                    });
                }
            }
        });
        this.deleteRoom = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id: room_id } = req.params;
            try {
                const deleteRoom = yield database_1.pool.query("DELETE FROM rooms WHERE room_id = $1 RETURNING *", [room_id]);
                res.status(200).send("Room deleted successfully");
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(500).json({
                        message: error.message,
                        file: "roomsController.ts",
                        method: "deleteRoom",
                    });
                }
            }
        });
        this.getRooms = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                //get rooms and rooms array from db
                const rooms = yield database_1.pool.query("SELECT * FROM rooms");
                res.status(200).json(rooms.rows);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(500).json({
                        message: error.message,
                        file: "roomsController.ts",
                        method: "getRooms",
                    });
                }
            }
        });
        this.getRoom = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id: room_id } = req.params;
            try {
                const room = yield database_1.pool.query("SELECT * FROM rooms WHERE room_id = $1", [
                    room_id,
                ]);
                res.status(200).json(room.rows[0]);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(500).json({
                        message: error.message,
                        file: "roomsController.ts",
                        method: "getRoom",
                    });
                }
            }
        });
    }
}
exports.roomsController = new RoomsController();
