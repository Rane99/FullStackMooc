import express from 'express';

const router = express.Router();

import diagnoseService from '../services/diagnoseService';

router.get('/', (_req, res) => {
    console.log("hi")
    res.send(diagnoseService.getEntries());
  });

export default router;