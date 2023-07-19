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
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const config_1 = require("./config");
const app_1 = __importDefault(require("./app"));
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    yield (0, config_1.connectDB)(String(config_1.MONGO_URI));
    yield (0, app_1.default)(app);
    const backend = http_1.default.createServer(app);
    backend
        .listen(config_1.PORT, () => {
        console.log(`backend running in background...`);
    })
        .on("listening", () => console.log(`Backend Service listening on port ${config_1.PORT}...`))
        .on("error", (err) => {
        console.log(err);
        process.exit();
    });
});
startApp();
