import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect } from 'react';
import './components/style.css'
import { useState } from 'react';

function App() {
  const apiKey = "f06efb9fc4cc400992a24f1a65a6aa02";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  //function to fetch api requests 
  const getWeatherDetails = (cityName) => {
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey //different requests would be sent for different input cities 
    //fetching api request,storing the response in console and catching the error otherwise 
    axios.get(apiURL).then((response) => { //if i get the url,then consoel.log the response
      console.log("response", response.data);
      setData(response.data);
    }).catch((error) => {
      console.log('error', error); //incase youdont get a response,catch and console the error 
      setError(true);

    })
  }
  //after we enter the input in te searchBar,catch the entered text 
  const handleChangeInput = (e) => {
    console.log(e.target.value);
    setInputCity(e.target.value);
    // handleSearch(e.target.value);
  }

  //after we click submit
  const handleSearch = () => {
    console.log("I am being clicked");
    //call the api and do the required job 
    getWeatherDetails(inputCity);

  }
  //useEffect hook used which would implement stuff when the page reloads 
  useEffect(() => {
    getWeatherDetails("delhi")
  }, []); //empty array means will only run once after  the page reloads

  return (

    <>

      <div className='weatherBg'>
        <div className='container'>


          <div className="row gap-3">
            <div className='col-md-8'>

              <input type="text" className="form-control" placeholder="type city name" onChange={handleChangeInput} value={inputCity} />
            </div >
            <div className='col-md-4'>
              <button className='btn btn-primary' type="button" onClick={handleSearch}>Search</button>
            </div>
          </div>
          <div className='row'>
            <div className="col-md-12 text-center mt-5">
              <div className='shadow rounded weatherResultBox '>
                <img className="weatherIcon" src='https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png' alt="weather icon" />
                {!error &&
                  <>
                    <h5 className='weatherCity'>{data?.name}</h5>
                    <h6 className='weatherTemp'>{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>  {/*//if data is defined then move on to main*/}

                    {/* <h6 className='weatherTemp'>{data.weather[0].main}</h6> */}
                    {data && <h6 className='weatherTemp'>{data?.weather[0]?.main}</h6>}
                  </>
                }
                {error && <h1>DATA NOT FOUND</h1>}
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  );
}

export default App;
