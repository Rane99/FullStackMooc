"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var patients_json_1 = __importDefault(require("../../data/patients.json"));
var uuid_1 = require("uuid");
var patients = patients_json_1.default;
var getEntries = function () {
    return patients;
};
var getNonSensitiveEntries = function () {
    return patients.map(function (_a) {
        var id = _a.id, name = _a.name, dateOfBirth = _a.dateOfBirth, gender = _a.gender, occupation = _a.occupation;
        return ({
            id: id,
            name: name,
            dateOfBirth: dateOfBirth,
            gender: gender,
            occupation: occupation,
        });
    });
};
var addPatient = function (entry) {
    var newPatient = __assign({ id: uuid_1.v1() }, entry);
    patients.push(newPatient);
    return newPatient;
};
exports.default = { getEntries: getEntries, getNonSensitiveEntries: getNonSensitiveEntries, addPatient: addPatient };
