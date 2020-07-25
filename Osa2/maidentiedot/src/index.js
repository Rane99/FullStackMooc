import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom';



const Country = (props) => {


  const showCountry = () => {

    const requestOne = axios.get('https://restcountries.eu/rest/v2/all')
    console.log(props.name, 'fssfda')
    const requestTwo = axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${props.name}`)

    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
      const responseOne = responses[0]
      const responseTwo = responses[1]



      const filteredData = responseOne.data.filter(maa => maa.name === props.name)
      console.log(props.name)
      console.log(filteredData)
      console.log(responseTwo)


      const temp = responseTwo.data.current.temperature
      const wind = responseTwo.data.current.wind_speed
      const icon = responseTwo.data.current.weather_icons

      ReactDOM.render(<OneCountry name={filteredData[0].name} capital={filteredData[0].capital} population={filteredData[0].population} languages={filteredData[0].languages} flag={filteredData[0].flag} temperature={temp}  wind={wind} icon={icon} />, document.getElementById('root'))

    })).catch(errors => {
      console.log(errors)
    })

  }
  return (
    <div>
      {props.name} <button onClick={showCountry}>show</button>

    </div>
  )


}

const OneCountry = (props) => {


  return (
    <div>
      <h2>{props.name}</h2>

      capital {props.capital} <br />
      population {props.population}
      <h3>languages</h3>
      {console.log(props.languages)}

      <ul>
        {props.languages.map(lang =>


          <li key={lang.iso639_1}> {lang.name} </li>
        )}
      </ul>


      <img src={props.flag} alt="my image" width="300" height="250" />

      <h3>weather in {props.capital}</h3>
      <p>temperature: {props.temperature} Celsius</p> 
      <img src={props.icon} alt="my image" width="100" height="100" />
      <p>wind: {props.wind} mph</p> 


    </div>
  )
}

const Countries = (props) => {

  if (props.data.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (props.data.length > 1) {
    return (
      <div>

        {props.data.map(maa =>

          <Country key={maa.name} name={maa.name} state={props.state} />
        )}
      </div>
    )
  } else if (props.data.length == 1) {
    console.log(props.data[0].name, 'eka')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${props.data[0].name}`)
      .then(response => {

        console.log(response.data)
        console.log(props.data[0].name)
        console.log("djas")

        const temp = response.data.current.temperature
        console.log(temp)
        const wind = response.data.current.wind_speed
        const icon = response.data.current.weather_icons

        ReactDOM.render(<OneCountry name={props.data[0].name} capital={props.data[0].capital} population={props.data[0].population} languages={props.data[0].languages} flag={props.data[0].flag} temperature={temp} wind={wind} icon={icon} />, document.getElementById('root'))


      })

    return (
      <div>

        loading...

      </div>
    )
  } else if (props.data.length == 0) {
    return (
      <div>
        no data yet
      </div>
    )
  }
}


const App = () => {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')


  const handleCountryChange = (event) => {

    setCountry(event.target.value)




    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {


        const filteredData = response.data.filter(maa => maa.name.includes(country))

        setCountries(filteredData)
      })




  }


  return (
    <div>


      <label htmlFor="country">find countries </label>
      <input type="text" id="country"
        value={country}
        onChange={handleCountryChange} />

      <Countries data={countries} />

    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))

