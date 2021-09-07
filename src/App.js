import React, {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', phone: '111'},
    {name: 'John', phone: '222'},
    {name: 'Daniel', phone: '333'},
    {name: 'Pamela', phone: '444'}
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [patternMatch, setPatternMatch] = useState('')

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

  const FindPattern = (props) => {
    let filteredArray = []
    filteredArray = persons.filter(person => person.name.toLowerCase().includes(props.pattern.toLowerCase()))
    if(props.pattern === ''){
     filteredArray = persons
    }
    
    // *** Infinite loop below***


    // if (persons.map(person => person.name.includes(props.pattern))) {
    //   setPatternMatch(patternMatch.concat(props.pattern))
    //   console.log('test')
      
    // }
    return(
      <div>
        {filteredArray.map(name =>
          <div key={name.name}> {name.name} {name.phone}</div>
          )} 
      </div>
    )
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneNumber = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  const handlePatternMatching = (event) => {
    console.log(event.target.value)
    setPatternMatch(event.target.value)
  }



  return(
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with: <input
          value = {patternMatch}
          onChange = {handlePatternMatching}/>
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
      <FindPattern pattern = {patternMatch}/>


    </div>
  )
}

export default App