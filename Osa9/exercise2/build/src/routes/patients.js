"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var patientService_1 = __importDefault(require("../services/patientService"));
var utils_1 = __importDefault(require("../utils"));
router.get('/', function (_req, res) {
    console.log("patientRouter");
    res.send(patientService_1.default.getNonSensitiveEntries());
});
router.post('/', function (req, res) {
    try {
        var newPatient = utils_1.default(req.body);
        var newEntry = patientService_1.default.addPatient(newPatient);
        res.json(newEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = router;
