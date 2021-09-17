import React, {useEffect, useState} from 'react'
import axios from 'axios'
import index from './index.css'

const DisplayCountry = (props) => {
  if (!props.country) return <div></div>;
  if(props.weather === '') return <div></div>
  console.log('weather contains:', props.weather)
  return(
    <div>
    <h1><b>{props.country.name} </b></h1>
    Capital: {props.country.capital}<br></br>
    Population: {props.country.population.toLocaleString()}<br></br>

    <h2><b>Languages</b></h2>
    {props.country.languages.map(languages =>
      <div><li className = "align_languages">{languages.name}</li></div>)}
    

    <img className="flag" src= {props.country.flag}/>
    <h2><b>Weather in {props.weather.location.name}</b></h2>
    Temperature: {props.weather.current.temperature} celsius
    <img className="weather_icon" src= {props.weather.current.weather_icons[0]}/>
    Wind: {props.weather.current.wind_speed} mph direction {props.weather.current.wind_dir}





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

  }else if (listOfCountries.length > 10){
    return(
      <p>Too many matches, specify another filter</p>
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



  useEffect(() =>{
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response =>{
      console.log('promise fulfilled countries')
      setCountries(response.data)
    })
  }, [])

  const city = 'Papeetē'
  const api_key = 'cf523d2f3ec2dfba9656fcce17f70aa1'
  console.log('key', api_key)
  console.log('show country:', showCountry)
  useEffect(() =>{
    if(!showCountry) {return null}
    axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${showCountry.capital}`)
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
    console.log('event when show button is clicked:', event)

  }

  const handleShowCountry = (event) => {
    console.log('event for weather', event)
    setShowCountry(event)

  }

  const handleSetWeather = (event) => {
    setWeather(event)

  }

  return (
    <div>
      <CountrySearch countryName = {countryToFind} onCountryNameChange = {handleCountryName}/>
      <DesiredCountry countryData = {countries} countryToFind = {countryToFind} setCountryToDisplay = {handleDisplayCountry} setShowCountry = {handleShowCountry} setWeather = {handleSetWeather}/>
      <DisplayCountry country={country} weather = {weather}/>
    </div>
  );
}


export default App;