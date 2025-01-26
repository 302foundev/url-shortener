"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
process.loadEnvFile();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;
app.get('/', (req, res) => {
    res.send("Hello world");
});
app.listen(PORT, () => {
    console.log("Server runing on: ", 'http://localhost:', PORT);
});
