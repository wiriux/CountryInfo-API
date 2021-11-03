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

const Notification = ({message}) => {
  if(message === null){
    return null
  }
  return(
    <div className="userAdded">
      {message}
    </div>
  )
}

const ErrorNotification = ({message}) => {
  if(message === null){
    return null
  }
  return(
    <div className="userNotFound">
      {message}
    </div>
  )
}



const App = () => {
  const [persons, setPersons] = useState([
    
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterPeopleByName, setFilterPeopleByName] = useState('')
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(null)
  const [displayError, setDisplayUserError] = useState(null)

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
        setDisplaySuccessMessage(`${newName}'s number has been updated`)
        })
        .catch(error =>{
          setDisplayUserError(error.response.data.error)
          setTimeout(() => {
            setDisplayUserError(null)
        }, 2000);
          })  

        setTimeout(() => {
        setDisplaySuccessMessage(null)
    }, 2000);
      }
    }
    else{
      phoneService
        .create({name: newName, phone: newPhone})
        .then(userInfo => {
        setPersons(persons.concat(userInfo))
        setNewName('')
        setNewPhone('')
        setDisplaySuccessMessage(`Added ${newName}`)
        setTimeout(() => {
          setDisplaySuccessMessage(null)
      }, 2000);
        })
        .catch(error =>{
          setDisplayUserError(error.response.data.error)
          setTimeout(() => {
            setDisplayUserError(null)
        }, 5000);
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
      .catch(error =>{
        setDisplayUserError(`${newName} has already been removed from database`)
        setTimeout(() => {
          setDisplayUserError(null)
      }, 2000);
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
      <Notification message={displaySuccessMessage}/>
      <ErrorNotification message={displayError}/>
      <FilterForm filterOutNames = {filterPeopleByName} currentlyInPhonebook = {persons} onNameFilter = {handleNameFiltering}/>
      <h2>Add a new</h2>
      <PersonForm valuePerson = {newName} valuePhone = {newPhone} onNameChange = {handleNameChange} onNumberChange = {handlePhoneNumber} addPerson = {addName}/>
      <h2>Numbers</h2>
      <NumbersForm currentlyInPhonebook = {persons} filteredOutPeople = {filterPeopleByName} personToRemove = {removePerson}/>


    </div>
  )
}

export default App