import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'



const Books = (props) => {
  const [genre, setGenre] = useState(null)

  const result = useQuery(ALL_BOOKS)
  
  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

 

  let books = result.data.allBooks

  if(genre!=null){
    
    books = books.filter(b =>  b.genres.includes(genre))
  }
  console.log("BOOKS: ", books)
  

  

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => setGenre("refactoring")}>refactoring</button>
      <button onClick={() => setGenre("agile")}>agile</button>
      <button onClick={() => setGenre("patterns")}>patterns</button>
      <button onClick={() => setGenre("design")}>design</button>
      <button onClick={() => setGenre("crime")}>crime</button>
      <button onClick={() => setGenre("classic")}>classic</button>
      <button onClick={() => setGenre(null)}>all genres</button>
     
    </div>
  )
}

export default Books