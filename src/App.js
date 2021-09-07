import React, {useState} from 'react'


const Filter = (props) => {
  let listOfPeople = []
  listOfPeople = props.filterOutNames[1].filter(person => person.name.toLowerCase().includes(props.filterOutNames[0].toLowerCase()))
  //Fix this. We can't mutate state in react
  if(props.filterOutNames[0] === ''){
   listOfPeople = [...props.filterOutNames[1]]
  }
  
  return(
    <div>
      {listOfPeople.map(name =>
        <div key={name.name}> {name.name} {name.phone}</div>
        )} 
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', phone: '111'},
    {name: 'John', phone: '222'},
    {name: 'Daniel', phone: '333'},
    {name: 'Pamela', phone: '444'}
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterPeopleByName, setFilterPeopleByName] = useState('')

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

  const handleNameFiltering = (event) => {
    console.log(event.target.value)
    setFilterPeopleByName(event.target.value)
  }



  return(
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with: <input
          value = {filterPeopleByName}
          onChange = {handleNameFiltering}/>
          {/* <FindPattern pattern = {patternMatch}/> */}
        </div>
      <form onSubmit = {addName}>
        <div>
          <h2>Add a new</h2>
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
        {/* <div> debug: {newName}</div> */}
      </form>
      <h2>Numbers</h2>
      <Filter filterOutNames = {[filterPeopleByName, persons]}/>


    </div>
  )
}

export default App