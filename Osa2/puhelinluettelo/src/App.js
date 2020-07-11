import React, { useState } from 'react'


const Person = (props) => {

    return (

        <div>
            <p>
                {props.name} {props.number}
            </p>

        </div>
    )
}

const Persons = (props) => {
    return (
        <div>

            {props.persons.map(person =>

                <Person key={person.id} name={person.name} number={person.number} />
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

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setNewFilter] = useState('')



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
            id: persons.length + 1

        }

        var found = false
        var i

        for (i = 0; i < persons.length; i++) {
            if (persons[i].name === nameObject.name) {
                found = true
            }
        }

        if (found) {
            alert(`${nameObject.name} is already added to phonebook`)
        } else {
            setPersons(persons.concat(nameObject))
        }


        setNewName('')
        setNewNumber('')
    }

    const personsToShow = persons.filter(person => person.name.includes(filter))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            <Persons persons={personsToShow} />
        </div>
    )

}

export default App