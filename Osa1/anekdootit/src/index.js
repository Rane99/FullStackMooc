import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const MostVoted = (props) => {

  var n = props.votes[0]
  var index = 0
  var i
  for (i = 0; i < 5; i++) {

    if (props.votes[i] > n) {
      console.log(props.votes[i])
      n = props.votes[i]
      index = i
    }
  }

  return (

    <p>{props.anecdotes[index]}</p>
  )

}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))
  

  const updateVotes = () => {

    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br></br>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={() => updateVotes()} text="vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * 6))} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <MostVoted votes={votes} anecdotes={props.anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)