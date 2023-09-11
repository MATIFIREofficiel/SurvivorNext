import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const WeatherWidget = ({ city="Paris", apiKey="95c3a0ad67e9a863db54f6d882f56804" }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching weather data: ', error);
      });
  }, [city, apiKey]);

  if (!weatherData) {
    return null;
  }

  const { main, weather, name } = weatherData;

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{name}</Text>
      <Text style={styles.temperature}>
        {Math.round(main.temp - 273.15)}°C
      </Text>
      <Image
        style={styles.weatherIcon}
        source={{
          uri: `https://openweathermap.org/img/w/${weather[0].icon}.png`,
        }}
      />
      <Text style={styles.description}>{weather[0].description}</Text>
      <Text style={styles.date}>
        {/* {moment().format('MMMM D, YYYY h:mm A')} */}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 32,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  description: {
    textTransform: 'capitalize',
  },
  date: {
    marginTop: 10,
  },
});

export default WeatherWidget;
