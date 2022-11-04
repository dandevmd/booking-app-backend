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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelsController = void 0;
const database_1 = require("../database");
class HotelsController {
    constructor() {
        this.createHotel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, type, city, address, country, distance, photos, description, cheapest_price, title, } = req.body;
                const rating = req.body.rating ? req.body.rating : null;
                const featured = req.body.featured ? req.body.featured : false;
                const newHotel = yield database_1.pool.query("INSERT INTO hotels (name, type, city, address, country, distance, photos, description, cheapest_price, featured, title, rating) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *", [
                    name,
                    type,
                    city,
                    address,
                    country,
                    distance,
                    photos,
                    description,
                    cheapest_price,
                    featured,
                    title,
                    rating,
                ]);
                res.status(201).json(newHotel.rows[0]);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        message: error.message,
                        file: "hotelsController",
                        method: "createHotel",
                    });
                }
            }
        });
        this.updateHotel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, type, city, address, country, distance, photos, description, cheapest_price, title, } = req.body;
                const rating = req.body.rating ? req.body.rating : null;
                const rooms = req.body.rooms ? req.body.rooms : null;
                const featured = req.body.featured ? req.body.featured : false;
                const updateHotel = yield database_1.pool.query("UPDATE hotels SET name = $1, type = $2, city = $3, address = $4, country = $5, distance = $6, photos = $7, description = $8, cheapest_price = $9, featured = $10, title = $11, rating = $12, rooms = $13 WHERE hotels_id = $14 RETURNING *", [
                    name,
                    type,
                    city,
                    address,
                    country,
                    distance,
                    photos,
                    description,
                    cheapest_price,
                    featured,
                    title,
                    rating,
                    rooms,
                    id,
                ]);
                res.status(200).json(updateHotel.rows[0]);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        message: error.message,
                        file: "hotelsController",
                        method: "updateHotel",
                    });
                }
            }
        });
        this.deleteHotel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deleteHotel = yield database_1.pool.query("DELETE FROM hotels WHERE hotels_id = $1", [id]);
                res.status(200).json({ message: "Hotel deleted successfully" });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        message: error.message,
                        file: "hotelsController",
                        method: "deleteHotel",
                    });
                }
            }
        });
        this.getAllHotels = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.query, { limit, featured, min, max } = _a, others = __rest(_a, ["limit", "featured", "min", "max"]);
                let allHotels;
                if (min && max && featured && limit) {
                    allHotels = yield database_1.pool.query(`SELECT * FROM hotels WHERE featured = $1 AND cheapest_price BETWEEN $2 AND $3 LIMIT $4`, [featured, min, max, limit]);
                }
                else {
                    allHotels = yield database_1.pool.query(`SELECT * FROM hotels `);
                }
                res.status(200).json(allHotels.rows);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        message: error.message,
                        file: "hotelsController",
                        method: "getAllHotels",
                    });
                }
            }
        });
        this.getHotelById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const hotel = yield database_1.pool.query("SELECT * FROM hotels WHERE hotels_id = $1", [id]);
                res.status(200).json(hotel.rows[0]);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        message: error.message,
                        file: "hotelsController",
                        method: "getHotelById",
                    });
                }
            }
        });
        this.getHotelsByCity = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cities = req.query.cities;
            const cityArr = cities && cities.split(",");
            console.log(cityArr, ">>>>>>>>>>>>>>>");
            try {
                if (cityArr && cityArr.length > 0) {
                    const hotels = yield database_1.pool.query("SELECT * FROM hotels WHERE city = ANY($1)", [cityArr]);
                    if (hotels.rows.length > 0) {
                        //how much hotels are in same city
                        const hotelsInCity = hotels.rows.reduce((acc, hotel) => {
                            acc[hotel.city] = acc[hotel.city] ? acc[hotel.city] + 1 : 1;
                            return acc;
                        }, {});
                        return res.status(200).json(hotelsInCity);
                    }
                }
                return;
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        message: error.message,
                        file: "hotelsController",
                        method: "getHotelsByCity",
                    });
                }
            }
        });
        this.getHotelsByType = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const types = req.query.types;
            const typeArr = types && types.split(",");
            try {
                if (typeArr && typeArr.length > 0) {
                    const hotels = yield database_1.pool.query("SELECT * FROM hotels WHERE type = ANY($1)", [typeArr]);
                    return res.status(200).json(hotels.rows);
                }
                return;
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        message: error.message,
                        file: "hotelsController",
                        method: "getHotelsByType",
                    });
                }
            }
        });
    }
}
exports.hotelsController = new HotelsController();
