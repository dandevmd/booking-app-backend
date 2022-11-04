"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter_1 = __importDefault(require("./authRouter"));
const usersRouter_1 = __importDefault(require("./usersRouter"));
const hotelsRouter_1 = __importDefault(require("./hotelsRouter"));
const roomsRouter_1 = __importDefault(require("./roomsRouter"));
//initialize router
const router = (0, express_1.Router)();
//use Routers
router.use('/auth', authRouter_1.default);
router.use('/users', usersRouter_1.default);
router.use('/hotels', hotelsRouter_1.default);
router.use('/rooms', roomsRouter_1.default);
exports.default = router;
