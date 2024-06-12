import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Style.css";
import { useDebounce } from "use-debounce";
import { AiOutlineEllipsis } from "react-icons/ai";

function App() {
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const [cityName, setCityName] = useState("");
  const [debouncedText] = useDebounce(cityName, 1000);

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // console.log(`lat,log`);
    const fetchWeatherData = async () => {
      try {
        if (debouncedText) {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${debouncedText}&appid=8de9b5b85f17fa19e60c94df4c0e5bc2`
          );
          console.log(response);

          setWeatherData(response.data);
        }
      } catch (err) {
        setError("Failed to fetch weather data");
      }
    };

    fetchWeatherData();
  }, [apiKey, apiUrl, debouncedText]);
  // useEffect(() => {
  //   // Log weatherData only when it's not null
  //   if (weatherData) {
  //     const data = weatherData;
  //     console.log
  //   }
  // }, [weatherData]);
  console.log(weatherData.main);

  console.log(weatherData.weather);

  const handleChange = (event) => {
    setCityName(event.target.value);
  };

  console.log(cityName);
  return (
    <div className="container">
      <div className="row">
        <div class="col-6 mx-auto">
          <div className="d-flex justify-content-center align-items-center  mt-15">
            {" "}
            <div className="top-section">
              <h1 className="heading text-center  ">Weather App</h1>
              <form className="search-bar">
                <input
                  type="text"
                  id={weatherData.id}
                  placeholder="Enter city name"
                  value={cityName}
                  onChange={handleChange}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-section">
        <div className="row">
          <div className="card-dgn">
            <div class="col-6 mx-auto">
              {/* {error && <p className="error">{error}</p>}
              {!error && !weatherData && <p>Loading...</p>} */}

              {!error && weatherData && weatherData.main && (
                <>
                  <div className="city d-flex justify-content-center">
                    {" "}
                    <div>
                      <h4 className="city-name">{weatherData.name}</h4>

                      <span className="icon d-flex justify-content-center ">
                        <AiOutlineEllipsis />
                      </span>
                    </div>
                  </div>
                  <div className="weather-section">
                    <p className=" temp">{weatherData.main.temp}°C</p>
                    <div className="max-min-temp">
                      <h5 className="max-min-name">
                        {weatherData.weather[0].description}
                      </h5>
                      <p className="max">Max: {weatherData.main.temp_max}°C</p>
                      <p className="min">Min: {weatherData.main.temp_min}°C</p>
                    </div>
                  </div>
                  <div className="img-section">
                    <img
                      src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                      alt={weatherData.weather[0].description}
                    />
                  </div>
                  <div className="feel-secton d-flex">
                    <p className="feel-like">
                      Feels like: {weatherData.main.feels_like}°C{" "}
                    </p>
                    <p className="feel-like">
                      {" "}
                      Humidity: {weatherData.main.humidity}%{" "}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
