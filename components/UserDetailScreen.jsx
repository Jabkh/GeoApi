import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserDetailScreen = ({ route }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom :</Text>
      <Text style={styles.value}>{user.name}</Text>

      <Text style={styles.label}>Email :</Text>
      <Text style={styles.value}>{user.email}</Text>

      <Text style={styles.label}>Nom d'utilisateur :</Text>
      <Text style={styles.value}>{user.username}</Text>

      <Text style={styles.label}>Téléphone :</Text>
      <Text style={styles.value}>{user.phone}</Text>

      <Text style={styles.label}>Site Web :</Text>
      <Text style={styles.value}>{user.website}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default UserDetailScreen;
