import React, {useState} from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    {name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.find((person => person.name === newName))){
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
    }
    else{
    setPersons(persons.concat({name: newName}))
    setNewName('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
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
          <button type = "submit">add</button>
        </div>
        <div> debug: {newName}</div>
      </form>
      <h2>Numbers</h2>
        {persons.map(name =>
          <div key={name.name}> {name.name}</div>
          )} 

    </div>
  )
}

export default App