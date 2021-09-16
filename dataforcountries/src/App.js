import React, {useEffect, useState} from 'react'
import axios from 'axios'
import index from './index.css'

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
  let myCountry = []
  listOfCountries = props.countryData.filter(country => country.name.toLowerCase().includes(props.countryToFind.toLowerCase()))
  console.log('list', listOfCountries)
  console.log('countryToFind', props.countryToFind)
  if(listOfCountries.length === 1){
    myCountry = listOfCountries;
    <input
      value = {props.countryToFind}
      onChange = {props.onMyCountryNameChange}
    />
    return(
      <div>
        <h1><b>{myCountry[0].name}</b></h1>
        Capital: {myCountry[0].capital}<br></br>
        Population: {myCountry[0].population.toLocaleString()}<br></br>

        <h2><b>Languages</b></h2> 
        {myCountry.map(country => country.languages.map(languages => 
          <div><li className = "align_languages">{languages.name}</li></div>))}

        <img className="flag" src= {myCountry[0].flag}/>    
      </div>
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
      <CountrySearch countryName = {countryToFind} onCountryNameChange = {handleCountryName}/>
      <DesiredCountry countryData = {countries} countryToFind = {countryToFind} />
    </div>
  );
}

export default App;
