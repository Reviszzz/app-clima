import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  useEffect(() => {
    if (lat && lon) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8314655608cef395d87b30f949596ce6`;

      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
    }
  }, [lat, lon]);

  const lotAndLon = (event) => {
    if (event.key === "Enter") {
      const city = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=8314655608cef395d87b30f949596ce6`;

      axios
        .get(city)
        .then(({ data }) => {
          const { lat, lon } = data[0];
          setLat(lat);
          setLon(lon);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="main">
        <input
          type="text"
          placeholder="Buscar"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={lotAndLon}
        />
        <h1>{data.name}</h1>
        {
          data.main ? <h1>{data.main.temp}°</h1> : null
        }
        {
          data.weather ? <h1>Clima: {data.weather[0].description
          }</h1> : null
        }
        <div className="footer">
          <footer>
            <div className="text-footer">
              { data.main ? <h4>maxTemperatura: {data.main.temp_max}</h4> : null}
              { data.main ? <h4>minTemperatura: {data.main.temp_min}</h4> : null}
              { data.main ? <h4>Humedad: {data.main.humidity}</h4> : null}
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
