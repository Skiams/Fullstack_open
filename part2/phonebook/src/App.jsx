import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newNotif, setNewNotif] = useState("")


  useEffect(() => {
    personService.getAll()
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const  handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if (!person)
        return

    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService.del(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
    else
      return
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    if (persons.some(person => person.number === newNumber))
      return window.alert(`${newNumber} is already added to phonebook`)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, 
      replace the old number with a new one?`
      )) {
        const updatedPerson = {
          ...existingPerson, 
          number: newNumber 
        }
        personService.update(existingPerson.id, updatedPerson)
        .then(response => {
          setPersons(persons.map(person => 
            person.id === existingPerson.id ? response.data : person))
          setNewName('')
          setNewNumber('')
          setNewNotif(`Updated ${newName}'s number`)
        })
        
      }
      return
    }

    const personObject = {
    name: newName,
    number: newNumber,
    }
    personService.create(personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
      setNewNotif(`Added ${newName}`)
    })
  }

  let personsToShow = persons

  if (newFilter)
     personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNotif} />
      <Filter value={newFilter} handler={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm add={addPerson} name={newName} number={newNumber} 
          nameChange={handleNameChange} numChange={handleNumberChange}/>    
      <h3>Numbers</h3>
      <Persons list={personsToShow} handler={deletePerson}/>
    </div>
  )
}

export default App