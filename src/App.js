import React, {useEffect, useState} from 'react'
import phoneService from './services/phoneNumbers'
import './index.css'


const NumbersForm = (props) =>{ 
  let listOfPeople = []
  listOfPeople = props.currentlyInPhonebook.filter(person => person.name.toLowerCase().includes(props.filteredOutPeople.toLowerCase()))
  if(listOfPeople === ''){
    listOfPeople = [...props.currentlyInPhonebook]
   }

  return (
    <div>
      {listOfPeople.map(person =>
        <div key= {person.name}> {person.name} {person.phone} <button onClick = {() => props.personToRemove([person.id, person.name])}>delete</button></div>)}
    </div>    
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit = {props.addPerson}>
      <div>
        name: <input
          value = {props.valuePerson}
          onChange = {props.onNameChange}/>
      </div>
      <div>
        number: <input
          value = {props.valuePhone}
          onChange = {props.onNumberChange}/>
        </div>
        <div>
          <button type = "submit">add</button>
        </div>
    </form>
  )
}

const FilterForm = (props) => {
  
  return(
    <div>
        Filter shown with: <input 
         value = {props.filterPeopleByName}
         onChange = {props.onNameFilter}
         />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterPeopleByName, setFilterPeopleByName] = useState('')

  useEffect(() => {
    phoneService
      .getAll()
      .then(currentPhonebook => {
        setPersons(currentPhonebook)
      }) 
  }, [])

  const addName = (event) => {
    
    event.preventDefault()
    if (newName === '' || newPhone === ''){
      return window.alert(`Fields cannot be empty`)
    }

    let getID
    persons.find(person =>{
      return getID = person.name === newName? person.id : null
    })
    if (getID !== null){
      const isConfirmed =  window.confirm(`${newName} is already added to phonebook. Would you like to replace the old number with a new one?`)

      if(isConfirmed){
      phoneService
        .updateNumber([getID, {name: newName, phone: newPhone}])
        .then(updateNumber =>{
        setPersons(persons.map(person => person.name !== newName? person : updateNumber))  
        setNewName('')
        setNewPhone('')
        })
      }

    }
    else{
      phoneService
        .create({name: newName, phone: newPhone})
        .then(userInfo => {
        setPersons(persons.concat(userInfo))
        setNewName('')
        setNewPhone('')
        })
    }
  }

  const removePerson = (event) => {
    const [id, name] = event;
    const isConfirmed = window.confirm(`Do you want to delete ${name}?`);

    if(isConfirmed){
    phoneService
      .removePerson(id)
      .then(() => {
      setPersons(persons.filter(person => person.id !== id))
      })
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

  const handleNameFiltering = (event) => {
    console.log(event.target.value)
    setFilterPeopleByName(event.target.value)
  }


  return(
    <div>
      <h2>Phonebook</h2>
      <FilterForm filterOutNames = {filterPeopleByName} currentlyInPhonebook = {persons} onNameFilter = {handleNameFiltering}/>
      <h2>Add a new</h2>
      <PersonForm valuePerson = {newName} valuePhone = {newPhone} onNameChange = {handleNameChange} onNumberChange = {handlePhoneNumber} addPerson = {addName}/>
      <h2>Numbers</h2>
      <NumbersForm currentlyInPhonebook = {persons} filteredOutPeople = {filterPeopleByName} personToRemove = {removePerson}/>


    </div>
  )
}

export default App