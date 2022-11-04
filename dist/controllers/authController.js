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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const hashPassword_1 = __importDefault(require("../utils/hashPassword"));
const generateJwtToken_1 = __importDefault(require("../utils/generateJwtToken"));
const comparePassword_1 = __importDefault(require("../utils/comparePassword"));
const database_1 = require("../database");
class AuthController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, role, country, city, phone_number } = req.body;
                const is_admin = role ? role : false;
                // check if user exists
                const candidate = yield database_1.pool.query("SELECT * FROM users WHERE email = $1", [email]);
                if (candidate.rows.length > 0) {
                    return res.status(400).json({ message: "User already exists" });
                }
                // hash password
                const hashedPassword = yield (0, hashPassword_1.default)(password);
                // create user
                const newUser = yield database_1.pool.query("INSERT INTO users (name, email, password, is_admin, country, city, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [name, email, hashedPassword, is_admin, country, city, phone_number]);
                //generate jwt token
                if (newUser.rows.length > 0) {
                    const token = (0, generateJwtToken_1.default)(newUser.rows[0].email, newUser.rows[0].user_id, newUser.rows[0].is_admin);
                    // set cookie
                    return res
                        .cookie("auth_token", token, {
                        httpOnly: true,
                    })
                        .status(201)
                        .json({ newUser: newUser.rows[0], token });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        message: error.message || "Something went in registerFunc Backend",
                        file: "authController",
                        method: "registerFunc",
                    });
                }
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // check if user exists
                const candidate = yield database_1.pool.query("SELECT * FROM users WHERE email = $1", [email]);
                if (candidate.rows.length === 0) {
                    return res.status(400).json({ message: "User does not exist" });
                }
                const { email: user_email, password: user_password, user_id, is_admin, } = candidate.rows[0];
                // compare password
                const isMatch = yield (0, comparePassword_1.default)(password, user_password);
                if (!isMatch) {
                    return res
                        .status(400)
                        .json({ message: "Password or email is incorrect" });
                }
                //generate jwt token
                const token = (0, generateJwtToken_1.default)(user_email, user_id, is_admin);
                // set cookie
                return res
                    .cookie("auth_token", token, {
                    httpOnly: true,
                })
                    .status(200)
                    .json({ token });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        message: error.message || "Something went in loginFunc Backend",
                        file: "authController",
                        method: "loginFunc",
                    });
                }
            }
        });
    }
}
exports.authController = new AuthController();
