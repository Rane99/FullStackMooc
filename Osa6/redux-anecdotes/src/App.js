import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { hideNotification } from './reducers/notificationReducer'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'


const App = () => {

  const dispatch = useDispatch()
  const showNotification = useSelector(state => state.notification.action)
  console.log("STATE", showNotification)

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])



  if (showNotification == 'SHOW') {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList />

      </div>
    )
  }





  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <AnecdoteList />

    </div>
  )
}

export default App