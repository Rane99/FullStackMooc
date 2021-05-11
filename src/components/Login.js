import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    

    const [ login, result ] = useMutation(LOGIN, {
        
        onError: (error) => {
          console.log("LOGIN ERROR")
          console.log(error)
        }
      })

      useEffect(() => {
        if ( result.data ) {
          const token = result.data.login.value
          console.log("TOKEN: ", token)
          props.setToken(token)
          localStorage.setItem('user-token', token)
        }
      }, [result.data]) // eslint-disable-line

      if (!props.show) {
        return null
      }

    const submit = async (event) => {
        event.preventDefault()
    
        login({  variables: { username, password } })
        
        console.log('login')
    
        setUsername('')
        setPassword('')
        
      }

    return (
        <div>
          <form onSubmit={submit}>
            <div>
              name
              <input
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type='submit'>login</button>
          </form>
        </div>
      )
}

export default Login