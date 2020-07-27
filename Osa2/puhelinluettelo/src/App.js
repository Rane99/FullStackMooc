import React, { useState, useEffect } from 'react'
import axios from 'axios'
import phoneBookService from './phonebook'
import './index.css'


const Person = (props) => {



    return (

        <div>

            {props.name} {props.number} <button onClick={() => props.remove(props.id, props.name)}>delete</button>


        </div>
    )
}

const Persons = (props) => {
    return (
        <div>

            {props.persons.map(person =>

                <Person key={person.id} id={person.id} name={person.name} number={person.number} remove={props.remove} />
            )}

        </div>
    )


}
const Filter = (props) => {

    return (
        <div>
            filter shown with: <input
                value={props.filter}
                onChange={props.handleFilterChange} />
        </div>
    )
}

const PersonForm = (props) => {
    return (
        <form onSubmit={props.addName}>
            <div>
                name: <input
                    value={props.newName}
                    onChange={props.handleNameChange} />
            </div>
            <div>
                number: <input
                    value={props.newNumber}
                    onChange={props.handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="success">
        {message}
      </div>
    )
  }

  const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setNewFilter] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)


    useEffect(() => {
        phoneBookService
            .getAll()
            .then(data => {
                console.log(data)
                setPersons(data)
            })
    }, [])

    const remove = (id,name) => {
        phoneBookService
            .remove(id)
            .then(data => {

                console.log("DATA", data)
                setSuccessMessage(
                    `Deleted ${name} `
                  )
                  setTimeout(() => {
                    setSuccessMessage(null)
                  }, 5000)
                setPersons(persons.filter(per => per.id !== id))
            })
    }

    const update = (id, updatedNumber) => {
        const per = persons.find(n => n.id === id)
        const changedPerson = { ...per, number: updatedNumber }

        phoneBookService
            .update(id, changedPerson)
            .then(data => {

                setSuccessMessage(
                        `Ubdated ${data.name} `
                      )
                      setTimeout(() => {
                        setSuccessMessage(null)
                      }, 5000)
                setPersons(persons.map(per => per.id !== id ? per : data))
            }).catch(error => {

                setErrorMessage(
                    `Information of  ${changedPerson.name} has already been removed from the server `
                  )
                  setTimeout(() => {
                    setErrorMessage(null)
                  }, 5000)


                setPersons(persons.filter(n => n.id !== id))
            })
    }



    const handleNameChange = (event) => {

        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {

        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {

        setNewFilter(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault()


        const nameObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 100

        }

        var found = false
        var i

        for (i = 0; i < persons.length; i++) {
            if (persons[i].name === nameObject.name) {
                found = true
            }
        }

        if (found) {
            const r = window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one?`)
            if (r == true) {
                const henkilö = persons.find(n => n.name === nameObject.name)
                console.log(henkilö)
                const hId = henkilö.id
                console.log(hId)
                update(hId, nameObject.number)
            } else {
                console.log("false")
            }
        } else {


            phoneBookService
                .create(nameObject)
                .then(data => {

                    setSuccessMessage(
                        `Added ${nameObject.name} `
                      )
                      setTimeout(() => {
                        setSuccessMessage(null)
                      }, 5000)

                    setPersons(persons.concat(data))

                })

        }


        setNewName('')
        setNewNumber('')
    }

    const personsToShow = persons.filter(person => person.name.includes(filter))

    return (
        <div>
            
            <h2>Phonebook</h2>
            <Notification message={successMessage} />
            <ErrorNotification message={errorMessage} />
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons persons={personsToShow} remove={remove} />
        </div>
    )

}

export default App