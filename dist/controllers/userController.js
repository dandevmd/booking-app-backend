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
exports.userController = void 0;
const database_1 = require("../database");
class UserController {
    constructor() {
        this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield database_1.pool.query("SELECT * FROM users");
                res.status(200).json(users.rows);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        message: error.message,
                        file: "userController.ts",
                        method: "getAllUsers",
                    });
                }
            }
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield database_1.pool.query("SELECT * FROM users WHERE user_id = $1", [
                    id,
                ]);
                res.status(200).json(user.rows[0]);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        message: error.message,
                        file: "userController.ts",
                        method: "getUserById",
                    });
                }
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, email, password, country, city, user_avatar, phone_number, is_admin, } = req.body;
                //update only the filled fields
                const user = yield database_1.pool.query("UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), password = COALESCE($3, password), country = COALESCE($4, country), city = COALESCE($5, city), user_avatar = COALESCE($6, user_avatar), phone_number = COALESCE($7, phone_number), is_admin = COALESCE($8, is_admin) WHERE user_id = $9 RETURNING *", [
                    name,
                    email,
                    password,
                    country,
                    city,
                    user_avatar,
                    phone_number,
                    is_admin,
                    id,
                ]);
                res.status(200).json(user.rows[0]);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        message: error.message,
                        file: "userController.ts",
                        method: "updateUser",
                    });
                }
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.pool.query("DELETE FROM users WHERE user_id = $1", [id]);
                res.status(200).json({ message: "User deleted successfully" });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        message: error.message,
                        file: "userController.ts",
                        method: "deleteUser",
                    });
                }
            }
        });
    }
}
exports.userController = new UserController();
