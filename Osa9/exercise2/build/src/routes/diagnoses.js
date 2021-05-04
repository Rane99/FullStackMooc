"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var diagnoseService_1 = __importDefault(require("../services/diagnoseService"));
router.get('/', function (_req, res) {
    console.log("hi");
    res.send(diagnoseService_1.default.getEntries());
});
exports.default = router;
