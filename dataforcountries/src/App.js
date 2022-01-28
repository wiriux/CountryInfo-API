import React, {useEffect, useState} from 'react'
import axios from 'axios'
import index from './index.css'
require('dotenv').config();

const DisplayCountry = (props) => {
  if (!props.country) return <div></div>;
  if(props.weather === '') return <div></div>
  console.log('weather contains:', props.weather)
  
  return(
    <div>
    <h1><b>{props.country.name} </b></h1>
    Capital: {props.country.capital}<br></br>
    {/* Population: {props.country.population.toLocaleString()}<br></br> */}

    {/* <h2><b>Languages</b></h2>
    {props.country.languages.map(languages =>
      <div><li className = "align_languages">{languages.name}</li></div>)} */}
    {<h2><b>Region</b></h2>}
    Region: {props.country.region}<br></br>  
      
    

    {/* <img className="flag" src= {props.country.flag}/> */}
    <h2><b>Weather in {props.weather.location.name}</b></h2>
    Temperature: {props.weather.current.temp_f} Fahrenheit 
    <img className="weather_icon" src= {props.weather.current.condition.icon}/>
    Wind: {props.weather.current.wind_mph} mph <br></br>Direction: {props.weather.current.wind_dir}


  </div>
  )
}

const CountrySearch = (props) => {

  return(
    <div>
      Find countries <input
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
  if(props.countryToFind === ''){props.setCountryToDisplay(null); props.setShowCountry(null);props.setWeather('') }
  if(listOfCountries.length === 1){
    myCountry = listOfCountries;
    console.log('my country', myCountry);
    props.setCountryToDisplay(myCountry[0]);
    props.setShowCountry(myCountry[0]);
    return null

  }else if (props.countryToFind === ""){
    return(
      <p>List is empty</p>
    )

  }else if (listOfCountries.length > 10){
    return(
      <p>Too many matches. Narrow down your search</p>
    )

  }else{

    return(
      <div>
        {listOfCountries.map(country =>
          <div key ={country.name}> {country.name} <button onClick = {() => (props.setCountryToDisplay(country), props.setShowCountry(country))}>show</button></div>)}
      </div>
    )
  }
}

function App() {

  const [countries, setCountries] = useState([])
  const [countryToFind, setCountryToFind] = useState('')
  const [country, setMyCountry] = useState('')
  const [weather, setWeather] = useState('')
  const [showCountry, setShowCountry] = useState(false)
  




  const country_api_key = process.env.REACT_APP_COUNTRY_API
  useEffect(() =>{
    axios
    .get(`http://api.countrylayer.com/v2/all?access_key=${country_api_key}`)
    .then(response =>{
      console.log('promise fulfilled countries')
      setCountries(response.data)
    })
  }, [])

  const weather_api_key = process.env.REACT_APP_WEATHER_API
  useEffect(() =>{
    if(!showCountry) {return null}
    axios
    .get(`http://api.weatherapi.com/v1/current.json?key=${weather_api_key}&q=${showCountry.capital}`)
    .then(response =>{
      console.log('promise fulfilled weather')
      setWeather(response.data)

    })
  },[showCountry])
  console.log('weather', weather)

  const handleCountryName = (event) => {
    console.log(event.target.value)
    setCountryToFind(event.target.value)
  }

  const handleDisplayCountry = (event) => {
    setMyCountry(event)

  }

  const handleShowCountry = (event) => {
    setShowCountry(event)

  }

  const handleSetWeather = (event) => {
    setWeather(event)

  }

  return (
    <div>
      <CountrySearch countryName = {countryToFind} onCountryNameChange = {handleCountryName}/>
      <DesiredCountry countryData = {countries} countryToFind = {countryToFind} setCountryToDisplay = {handleDisplayCountry} 
        setShowCountry = {handleShowCountry} setWeather = {handleSetWeather} />

      <DisplayCountry country={country} weather = {weather}/>
    </div>
  );
}


export default App;
