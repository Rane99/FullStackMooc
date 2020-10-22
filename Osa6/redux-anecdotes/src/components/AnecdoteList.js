import React from 'react'
import { voteAnecdote } from '.././reducers/anecdoteReducer'
import {showNotification} from '.././reducers/notificationReducer'
import { connect } from 'react-redux'








const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes

    const vote = (id) => {
        
        
        const anec = anecdotes.find(elem => elem.id === id)

        const newAnecdote = { ...anec, votes: anec.votes+1 }
        props.voteAnecdote(id, newAnecdote)
        
        props.showNotification(`you voted '${anec.content}'`, 5)
    }



    return (
        <div>

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapDispatchToProps = {
    voteAnecdote,
    showNotification,
  }

const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes,
    }
  }

const ConnectedAnecdotesList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotesList