
interface Content {
    name: string;
    exerciseCount: number;
}

const Total = ({courseParts}: {courseParts: Array<Content>}) => {

    return <p>Number of exercises{" "}{courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} </p>
}

export default Total