import React, {useState} from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    {name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.find((person => person.name === newName))){
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
    }
    else{
    setPersons(persons.concat({name: newName , phone: newPhone}))
    setNewName('')
    setNewPhone('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneNumber = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }


  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addName}>
        <div>
          name: <input 
            value = {newName}
            onChange = {handleNameChange}/>
        </div>
        <div>
          number: <input
            value = {newPhone}
            onChange = {handlePhoneNumber}/>
        </div>
        <div>
          <button type = "submit">add</button>
        </div>
        <div> debug: {newName}</div>
      </form>
      <h2>Numbers</h2>
        {persons.map(name =>
          <div key={name.name}> {name.name} {name.phone}</div>
          )} 

    </div>
  )
}

export default App