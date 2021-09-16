import React, {useEffect, useState} from 'react'
import axios from 'axios'

const CountrySearch = (props) => {

  return(
    <div>
      find countries <input
      value = {props.countryToFind}
      onChange = {props.onCountryName}
      />
    </div>
  )
}

const CountryDatabase = (props) => {

  let listOfCountries = []
  listOfCountries = props.countryData.filter(country => country.name.toLowerCase().includes(props.countryToFind.toLowerCase()))
  console.log('list', listOfCountries)
  if(listOfCountries.length > 10){
    return(
      <div>
        <p>Too many matches. specify another filter</p>
      </div>
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

function App() {

  const [countries, setCountries] = useState([])
  const [countryToFind, setCountryToFind] = useState('')
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

  return (
    <div>
      <CountrySearch countryName = {countryToFind} onCountryName = {handleCountryName}/>
      <CountryDatabase countryData = {countries} countryToFind = {countryToFind}/>
    </div>
  );
}

export default App;
