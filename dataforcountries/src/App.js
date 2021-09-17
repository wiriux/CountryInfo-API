import React, {useEffect, useState} from 'react'
import axios from 'axios'
import index from './index.css'

const DisplayCountry = (props) => {
  if (!props.country) return <div></div>;
  return(
    <div>
    <h1><b>{props.country.name}</b></h1>
    Capital: {props.country.capital}<br></br>
    Population: {props.country.population.toLocaleString()}<br></br>

    <h2><b>Languages</b></h2>
    {props.country.languages.map(languages =>
      <div><li className = "align_languages">{languages.name}</li></div>)}

    <img className="flag" src= {props.country.flag}/>
  </div>
  )
}

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
  if(props.countryToFind === ''){props.setCountryToDisplay(null)}
  if(listOfCountries.length === 1){
    myCountry = listOfCountries;
    console.log('my country', myCountry);
    props.setCountryToDisplay(myCountry[0]);
    return null

  }else if (listOfCountries.length > 10){
    return(
      <p>Too many matches, specify another filter</p>
    )

  }else{

    return(
      <div>
        {listOfCountries.map(country =>
          <div key ={country.name}> {country.name} <button onClick = {() => props.setCountryToDisplay(country)}>show</button></div>)}
      </div>
    )
  }
}

function App() {

  const [countries, setCountries] = useState([])
  const [countryToFind, setCountryToFind] = useState('')
  const [country, setMyCountry] = useState('')


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

  const handleDisplayCountry = (event) => {
    setMyCountry(event)
    console.log('event when show button is clicked:', event)

  }

  return (
    <div>
      <CountrySearch countryName = {countryToFind} onCountryNameChange = {handleCountryName}/>
      <DesiredCountry countryData = {countries} countryToFind = {countryToFind} setCountryToDisplay = {handleDisplayCountry}/>
      <DisplayCountry country={country} />
    </div>
  );
}


export default App;