import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const data = {
  weather: [{ id: 0, main: "", description: "", icon: "" }],
  main: {
    temp: 0,
    feels_like: 0,
    temp_max: 0,
    temp_min: 0,
    humidity: 0,
    pressure: 0,
  },
  name: "",
};

export default function HomeScreen() {
  const API_KEY = "0fda6387fae2856cbd30f2f9961586df";
  const [weather, setWeather] = useState(data);

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = () => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=${API_KEY}`
      )
      .then((res) => {
        setWeather(res.data);
        console.log(res.data);
      });
  };

  const convertToCelsius = (temp) => parseInt(temp - 272.15) + "°C";

  return (
    <Container>
      <Row className="justify-content-sm-center">
        <Col sm="auto">
          <Card
            style={{
              width: "20rem",
              marginTop: "2rem",
            }}
          >
            <Card.Header>
              <h1>{weather.name}</h1>
            </Card.Header>
            <Card.Img
              variant="top"
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            ></Card.Img>
            <Card.Body>
              <h2>
                {weather.weather[0].main} {convertToCelsius(weather.main.temp)}
              </h2>
              <h2>Feels like: {convertToCelsius(weather.main.feels_like)}</h2>
              <h2>High: {convertToCelsius(weather.main.temp_max)}</h2>
              <h2>Low: {convertToCelsius(weather.main.temp_min)}</h2>
              <h2>Humidity: {weather.main.humidity}%</h2>
              <h2>Pressure: {weather.main.pressure} hPa</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
