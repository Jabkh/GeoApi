import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import axios from 'axios';

const FLAG_BASE_URL = 'https://flagcdn.com';

const FlagApp = () => {
  const [height, setHeight] = useState('w20');
  const [id, setId] = useState('fr');
  const [flagUrl, setFlagUrl] = useState(null);
  const [originalSize, setOriginalSize] = useState({ width: null, height: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${FLAG_BASE_URL}/${height}/${id}.png`);
        setFlagUrl(response.config.url);

        // Taille d'origine de l'image
        Image.getSize(response.config.url, (width, height) => {
          setOriginalSize({ width, height });
        });
      } catch (error) {
        console.error('Error fetching flag:', error);
      }
    };

    fetchData();
  }, [height, id]);

  const handleCountryChange = (country) => {
    setId(country);
  };

  const handleSizeChange = (size) => {
    setHeight(size);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => handleCountryChange('fr')} style={({ pressed }) => [styles.button, { backgroundColor: pressed ? '#0056b3' : '#007bff' }, id === 'fr' && styles.activeButton]}>
          <Text style={styles.buttonText}>France</Text>
        </Pressable>
        <Pressable onPress={() => handleCountryChange('it')} style={({ pressed }) => [styles.button, { backgroundColor: pressed ? '#0056b3' : '#007bff' }, id === 'it' && styles.activeButton]}>
          <Text style={styles.buttonText}>Italie</Text>
        </Pressable>
        <Pressable onPress={() => handleCountryChange('ml')} style={({ pressed }) => [styles.button, { backgroundColor: pressed ? '#0056b3' : '#007bff' }, id === 'ml' && styles.activeButton]}>
          <Text style={styles.buttonText}>Belgique</Text>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => handleSizeChange('w20')} style={({ pressed }) => [styles.button, { backgroundColor: pressed ? '#0056b3' : '#007bff' }, height === 'w20' && styles.activeButton]}>
          <Text style={styles.buttonText}>Size: 20</Text>
        </Pressable>
        <Pressable onPress={() => handleSizeChange('w80')} style={({ pressed }) => [styles.button, { backgroundColor: pressed ? '#0056b3' : '#007bff' }, height === 'w80' && styles.activeButton]}>
          <Text style={styles.buttonText}>Size: 80</Text>
        </Pressable>
        <Pressable onPress={() => handleSizeChange('w160')} style={({ pressed }) => [styles.button, { backgroundColor: pressed ? '#0056b3' : '#007bff' }, height === 'w160' && styles.activeButton]}>
          <Text style={styles.buttonText}>Size:160</Text>
        </Pressable>
      </View>
      {flagUrl && (
        <View style={styles.flagContainer}>
          <Image source={{ uri: flagUrl }} style={{ width: originalSize.width, height: originalSize.height, marginBottom: 10 }} />
          <Text>Taille d'origine : {originalSize.width} x {originalSize.height}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
  },
  activeButton: {
    backgroundColor: '#0056b3',
  },
  flagContainer: {
    alignItems: 'center',
  },
});

export default FlagApp;