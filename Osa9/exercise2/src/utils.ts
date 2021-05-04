import { NewPatient, Gender } from './types';

type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };



const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };
  
  const parseGeneral = (comment: unknown): string => {
    if (!comment || !isString(comment)) {
      throw new Error('Incorrect or missing string');
    }
  
    return comment;
  };
  
  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

  const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

  const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };

const toNewPatientyEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatient => {

    const newEntry: NewPatient = {
      name: parseGeneral(name),
      dateOfBirth: parseDate(dateOfBirth),
      ssn: parseGeneral(ssn),
      gender: parseGender(gender),
      occupation: parseGeneral(occupation),
      entries: [],
    };
  
    return newEntry;
  };

  export default toNewPatientyEntry;