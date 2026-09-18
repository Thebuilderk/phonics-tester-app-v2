import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AgeSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Age Group</Text>
      <Button title="Ages 3-5" onPress={() => navigation.navigate('Learning')} />
      <Button title="Ages 6-8" onPress={() => navigation.navigate('Learning')} />
      <Button title="Ages 9+" onPress={() => navigation.navigate('Learning')} />
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
    marginBottom: 30,
    color: '#333',
  },
});

export default AgeSelectionScreen;
