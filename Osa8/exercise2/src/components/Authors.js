import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select';

const Authors = (props) => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  

  const result = useQuery(ALL_AUTHORS)

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log("ERROR")
      console.log(error)
    }
  })

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const submit = async (event) => {
    event.preventDefault()

    

    editAuthor({  variables: { name: name.value, setBornTo: Number(born) } })
    
    console.log('change born')

    setName('')
    setBorn('')
    
  }

  const authors = result.data.allAuthors

  const options = authors.map(a => ({value: a.name, label: a.name}))

  
 

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>

      <div>
      <form onSubmit={submit}>
        
        <Select
        defaultValue={name}
        onChange={setName}
        options={options}
      />
        
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
       
        <button type='submit'>update author</button>
      </form>
    </div>

    </div>
  )
}

export default Authors