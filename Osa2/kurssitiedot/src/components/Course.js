import React from 'react'

const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  
  const Part = (props) => {
  
    return (
  
      <div>
        <p>
          {props.name} {props.exercises}
        </p>
  
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
  
  
  
        {props.parts.map(part =>
        
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
  
      </div>
    )
  
  
  }
  
  const Total = (props) => {
  
    const total =
      props.parts.reduce((s, p) => s + p.exercises, 0)
  
    return (
      <div>
        <p>Number of exercises {total}</p>
      </div>
    )
  }
  
  const Course = (props) => {
  
    return (
      <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
  
      </div>
    )
  
  }

  export default Course