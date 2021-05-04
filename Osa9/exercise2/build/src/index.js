"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var diagnoses_1 = __importDefault(require("./routes/diagnoses"));
var patients_1 = __importDefault(require("./routes/patients"));
var app = express_1.default();
app.use(express_1.default.json());
var cors = require('cors');
app.use(cors());
var PORT = 3001;
app.get('/api/ping', function (_req, res) {
    console.log('someone pinged here');
    res.send('pong');
});
app.use('/api/diagnoses', diagnoses_1.default);
app.use('/api/patients', patients_1.default);
app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
