import React, {useEffect, useState} from 'react'
import axios from 'axios'

const CountrySearch = (props) => {

  return(
    <div>
      find countries <input
      value = {props.countryName}
      onChange = {props.onCountryNameChange}
      />
    </div>
  )
}

const DesiredCountry = (props) => {

  let listOfCountries = []
  listOfCountries = props.countryData.filter(country => country.name.toLowerCase().includes(props.countryToFind.toLowerCase()))
  console.log('list', listOfCountries)
  console.log('countryToFind', props.countryToFind)
  if(listOfCountries.length === 1){
    <input
      value = {props.countryToFind}
      onChange = {props.onMyCountryNameChange}
    />
    return(
      null
    )

  }else if (listOfCountries.length > 10){
    return(
      <p>Too many matches, specify another filter</p>
    )

  }else{

    return(
      <div>
        {listOfCountries.map(country => 
          <div key ={country.name}> {country.name}</div>)}
      </div>
    )
  }
}

const PrintDesiredCountry = (props) => {
  console.log('my country is', props.country)
  return(
    <div>
      name {props.country}
    </div>
  )
}

function App() {

  const [countries, setCountries] = useState([])
  const [countryToFind, setCountryToFind] = useState('')
  const [myCountry, setMyCountry] = useState('')
  useEffect(() =>{
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response =>{
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }, [])

  const handleCountryName = (event) => {
    console.log(event.target.value)
    setCountryToFind(event.target.value)
  }

  const handleMyCountry = (event) => {
    console.log(event.target.value)
    setMyCountry(event.target.value)
  }

  return (
    <div>
      <CountrySearch countryName = {countryToFind} onCountryNameChange = {handleCountryName}/>
      <DesiredCountry countryData = {countries} countryToFind = {countryToFind} onMyCountryNameChange = {handleMyCountry}/>
      <PrintDesiredCountry country = {myCountry}/>
    </div>
  );
}

export default App;
