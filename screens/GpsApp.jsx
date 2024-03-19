import React, { useState,  useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { APIKEY } from '../config/apikey';

const BASE_URL = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${APIKEY}`;

const GpsApp = () => {
    // Variables d'état pour stocker la latitude, la longitude et les données de localisation
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [fetchPosition, setFetchPosition] = useState(true);

    // variables d'état pour stocker les données de localisation obtenues avec Fetch et Axios
    const [locationFetch, setLocationFetch] = useState({ country: "", city: "" });
    const [locationAxios, setLocationAxios] = useState({ country: "", city: "" });

    // Position actuelle de l'utilisateur au chargement de l'application
    useLayoutEffect(() => {
        Geolocation.requestAuthorization();
        Geolocation.getCurrentPosition(position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
    }, [fetchPosition]);
    
    // Fonction pour obtenir la localisation avec Axios
    const getApiWithAxios = () => {
      axios.get(`${BASE_URL}&q=${latitude}%2C${longitude}`)
      .then(response => setLocationAxios(
        { country: response.data.Country.LocalizedName, city: response.data.LocalizedName }))
      .catch(error => console.log(error))
    }
    // Fonction pour obtenir la localisation avec Fetch
    const getApiWithFetch = () => {
      fetch(`${BASE_URL}&q=${latitude}%2C${longitude}`)
      .then(response => response.json())
      .then(data => setLocationFetch(
        { country: data.Country.LocalizedName, city: data.LocalizedName }))
      .catch(error => console.log(error))
    }
    
    // Fonction pour rafraîchir la position
    const reload = () => {
      setFetchPosition(state => (!state));
    }

    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <TouchableOpacity onPress={reload}>
            <Text style={styles.button}>Refresh</Text>
          </TouchableOpacity>
          <Text>Latitude : {latitude}</Text>
          <Text>Longitude : {longitude}</Text>
          <TouchableOpacity onPress={getApiWithFetch}>
            <Text style={styles.button}>Get location with Fetch</Text>
          </TouchableOpacity>
          <Text>Location : {locationFetch.country} {locationFetch.city}</Text>
          <TouchableOpacity onPress={getApiWithAxios}>
            <Text style={styles.button}>Get location with Axios</Text>
          </TouchableOpacity>
          <Text>Location : {locationAxios.country} {locationAxios.city}</Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0096c7',
    color: '#f1faee',
    padding: 10,
    marginVertical: 5,
    textAlign: 'center',
    borderRadius: 5,
  },
});

export default GpsApp;
