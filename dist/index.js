"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = require("./database");
const routes_1 = __importDefault(require("./routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//check db conectivity
database_1.pool.connect().then(() => {
    console.log("connected to lama_booking database");
});
//initialize port
const PORT = process.env.PORT;
//initialize express
const app = (0, express_1.default)();
//initialize middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
//initialize routes
app.use('/api/v1', routes_1.default);
//listen on port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
