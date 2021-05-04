import express from 'express';
const app = express();
app.use(express.json());
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {

    if(isNaN(Number(_req.query.weight))){
        res.status(400);
        res.send(JSON.stringify({ error: "malformatted parameters"}));
    }
    if(isNaN(Number(_req.query.height))){
        res.status(400);
        res.send(JSON.stringify({ error: "malformatted parameters" }));
    }


    const weight = String(_req.query.weight);
    const height = String(_req.query.height);

    

    
    res.send(JSON.stringify({ weight: weight, height: height, bmi: calculateBmi([height, weight]) }));
  });


  app.post('/exercises', (req, res) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any= req.body;
    console.log("DATA ",data.target);



    if(data.target==undefined){
        res.status(400);
        res.send(JSON.stringify({ error: "parameters missing"}));
    }
    if(data.daily_exercises==undefined){
        res.status(400);
        res.send(JSON.stringify({ error: "parameters missing"}));
    }

    if(isNaN(Number(data.target))){
        res.status(400);
        res.send(JSON.stringify({ error: "malformatted parameters"}));
    }
  
    for (let i=0; i<data.daily_exercises.length; i++) {

        if(isNaN(Number(data.daily_exercises[i]))){
            res.status(400);
            res.send(JSON.stringify({ error: "malformatted parameters"}));
        }
    }

    const lista = [data.target].concat(data.daily_exercises);
  
    const result = calculateExercises(lista);
    res.json(result);
  });



const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
