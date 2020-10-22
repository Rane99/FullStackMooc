import React from 'react'
import { connect } from 'react-redux' 
import { addAnecdote } from '.././reducers/anecdoteReducer'

import {showNotification} from '.././reducers/notificationReducer'






const AnecdoteForm = (props) => {




    const add = async (event) => {
        event.preventDefault()
        console.log('add')
        const content = event.target.ane.value
        event.target.ane.value = ''
        
       
        props.addAnecdote(content)
        const string = 'you added '.concat(content)
        props.showNotification(string, 5)
      }
    
      return (
        <div>
         
          <h2>create new</h2>
          <form onSubmit={add}>
            <div><input name="ane"/></div>
            <button type="submit">create</button>
          </form>
        </div>
      )
}

const mapDispatchToProps = {
  addAnecdote,
  showNotification,
}



export default connect(null, mapDispatchToProps)(AnecdoteForm)