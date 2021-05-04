
const calculateBmi = (args: Array<string>) : string => {
    

    if (args.length < 2) throw new Error('Not enough arguments');
    if (args.length > 2) throw new Error('Too many arguments');

    if(isNaN(Number(args[0]))){
        throw new Error('Provided values were not numbers!');
    }
    if(isNaN(Number(args[1]))){
        throw new Error('Provided values were not numbers!');
    }


    const height2 = Number(args[0]) /100;
    const bmi = Number(args[1])/(height2*height2); 

    if (bmi<18.5) {
        return "not Normal (unhealthy weight) too skinny";
    } else if (bmi>18.5 && bmi <25) {

        return "Normal (healthy weight)";
    } else if (bmi>25) {
        return " not Normal (unhealthy weight) too fat";
    }

    return "default";
};


try {
    process.argv.shift();
    process.argv.shift();
    console.log(calculateBmi(process.argv));
}catch (e) {
    console.log('Error, something bad happened');
}


export { calculateBmi };