"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var isString = function (text) {
    return typeof text === 'string' || text instanceof String;
};
var parseGeneral = function (comment) {
    if (!comment || !isString(comment)) {
        throw new Error('Incorrect or missing string');
    }
    return comment;
};
var isDate = function (date) {
    return Boolean(Date.parse(date));
};
var parseDate = function (date) {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
var isGender = function (param) {
    return Object.values(types_1.Gender).includes(param);
};
var parseGender = function (gender) {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
var toNewPatientyEntry = function (_a) {
    var name = _a.name, dateOfBirth = _a.dateOfBirth, ssn = _a.ssn, gender = _a.gender, occupation = _a.occupation;
    var newEntry = {
        name: parseGeneral(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseGeneral(ssn),
        gender: parseGender(gender),
        occupation: parseGeneral(occupation)
    };
    return newEntry;
};
exports.default = toNewPatientyEntry;
