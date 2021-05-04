import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

import patientsService from '../services/patientService';
import toNewPatientEntry from '../utils';

router.get('/', (_req, res) => {
    console.log("patientRouter")
    res.send(patientsService.getNonSensitiveEntries());
  });

  router.get('/:id', (req, res) => {
    console.log("requested id")
    const id = req.params.id
    const patient = patientsService.findById(id);
    
    if (patient) {
      res.send(patient);
    } else {
      res.sendStatus(404);
    }
  });


  router.post('/', (req, res) => {
      try{

        const newPatient = toNewPatientEntry(req.body);
    
        const newEntry = patientsService.addPatient(newPatient);
        res.json(newEntry);
      }catch (e) {
        res.status(400).send(e.message);
      }

    
  });


  router.post('/:id/entries', (req, res) => {
    try{

      console.log("requested id")
      const id = req.params.id
      const entry = req.body ;
      console.log(entry.type);
      console.log(entry);

      const patient = patientService.addPatientEntries(entry, id);
      
      if (patient) {
        res.send(patient);
      } else {
        res.sendStatus(404);
      }
    }catch (e) {
      res.status(400).send(e.message);
    }

  
});

export default router;