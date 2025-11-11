import { useState } from 'react'

const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.value} onChange={props.handler}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.add}>
      <div>name: <input value={props.name} onChange={props.nameChange}/></div>
      <div>number: <input value={props.number} onChange={props.numChange}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>   
  )  
}

const Persons = (props) => {
  return (
    <ul>
      {props.list.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0164636305' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const  handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName))
      window.alert(`${newName} is already added to phonebook`)
    if (persons.some(person => person.number === newNumber))
      window.alert(`${newNumber} is already added to phonebook`)

    else {
      const personObject = {
      name: newName,
      number: newNumber,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  let personsToShow = persons

  if (newFilter)
     personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} handler={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm add={addPerson} name={newName} number={newNumber} 
          nameChange={handleNameChange} numChange={handleNumberChange}/>    
      <h3>Numbers</h3>
      <Persons list={personsToShow}/>
    </div>
  )
}

export default App