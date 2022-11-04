"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    const token = req.cookies.auth_token;
    if (!token) {
        res.status(401).send("Access Denied");
        return next();
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        // @ts-ignore
        //poti da orice denumire vrei ca initial e goala
        res.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send("Invalid Token");
    }
}
exports.default = verifyToken;
