"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyUser = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) {
        res.status(401).send("Access Denied");
        return next();
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // @ts-ignore
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send("Invalid Token");
    }
};
exports.verifyToken = verifyToken;
const verifyUser = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        // @ts-ignore
        if (req.user.user_id == req.params.id || req.user.role) {
            next();
        }
        else {
            res.status(401).send("ID does not match");
        }
    });
};
exports.verifyUser = verifyUser;
const verifyAdmin = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        //@ts-ignore
        // console.log(req.user)
        // @ts-ignore
        if (req.user.role) {
            next();
        }
        else {
            res.status(401).send("You are not admin");
        }
    });
};
exports.verifyAdmin = verifyAdmin;
