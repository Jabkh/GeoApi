import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const CountryApp = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const filteredCountries = countries.filter(country =>
    country.translations.fra.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un pays"
        onChangeText={text => setSearchTerm(text)}
      />
      <ScrollView>
        {filteredCountries.map(country => (
          <View key={country.name.common} style={styles.card}>
            <Image
              style={styles.image}
              source={{ uri: country.flags.png }}
              resizeMode="cover"
            />
            <View style={styles.cardBody}>
              <Text style={styles.title}>{country.translations.fra.common}</Text>
              <Text>Capitale: {country.capital}</Text>
              <Text>Région: {country.region}</Text>
              <Text>Population: {country.population}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  card: {
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  cardBody: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default CountryApp;