import patientData from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient, Entry } from '../types';
import {v1 as uuid} from 'uuid'

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient [] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation,entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,

      }));
  };

  const findById = (id: string): Patient | undefined => {
    return patients.find(d => d.id === id);
  }

  const addPatient = (entry: NewPatient) : Patient => {

    const newPatient = {
        id: uuid(),
        ...entry

    };

    patients.push(newPatient)
    return newPatient;

  }

  const addPatientEntries = (entry: Entry, id: string) : Patient | undefined => {

    const patient = patients.find(d => d.id === id);

    entry.id = uuid();
    entry.date  = new Date().toISOString().slice(0, 10)
    

    if(patient && entry.description && entry.specialist && entry.type){
      patient.entries.push(entry);

      return patient;
    }else{
      return undefined;
    }
    


  }

export default { getEntries, getNonSensitiveEntries, addPatient, findById, addPatientEntries };