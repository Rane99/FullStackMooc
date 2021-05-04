interface myInterface {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number }

const calculateExercises = (args: Array<string>): myInterface=> {
    

    let i; 

    for (i=0; i<args.length; i++) {

        if(isNaN(Number(args[i]))){
            throw new Error('Provided values were not numbers!');
        }
    }

    const targetHours = Number(args.shift());
    const hours = args.map(a => Number(a));
    console.log(targetHours);
    
 
    const sum = hours.reduce((a, b) => a + b, 0);
    const avg = (sum / hours.length) || 0;
    const traindays = hours.filter(a => a!=0).length;
    const didSuccess = avg > targetHours;

    let ratingVar = 0;
    let desc = "";
    
    if(avg<targetHours){
        ratingVar = 1;
        desc = "you missed the goal";
    }else if(avg > 2*targetHours){
        ratingVar = 3;
        desc = "you reached the goal very well";
    }else {
        ratingVar = 2;
        desc = "you reached the goal";
    }


    const a = {
        periodLength: hours.length,
        trainingDays: traindays,

        success: didSuccess,
        rating: ratingVar,
        ratingDescription: desc,
        target: targetHours,
        average : avg
        




    };

    return a;
    
};

try {
    process.argv.shift();
    process.argv.shift();
    console.log(calculateExercises(process.argv));
}catch (e) {
    console.log('Error, something bad happened, message');
}

export { calculateExercises };