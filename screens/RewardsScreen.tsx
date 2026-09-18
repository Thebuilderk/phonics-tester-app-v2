import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const RewardsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rewards!</Text>
      <Text style={styles.text}>Great job! You earned a star!</Text>
      <Button title="Go Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
    color: '#555',
  },
});

export default RewardsScreen;
