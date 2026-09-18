import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import { phonicWords } from '../data/phonicsData';

const LearningScreen = ({ navigation }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWord = phonicWords[currentWordIndex];

  const speakWord = () => {
    if (currentWord) {
      Speech.speak(currentWord.word);
    }
  };

  const nextWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % phonicWords.length);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learning Zone</Text>
      {currentWord && (
        <View>
          <Text style={styles.word}>{currentWord.word}</Text>
          <Button title="Hear Word" onPress={speakWord} />
        </View>
      )}
      <Button title="Next Word" onPress={nextWord} />
      <Button title="Go to Rewards" onPress={() => navigation.navigate('Rewards')} />
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
  word: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#007bff',
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
    color: '#555',
  },
});

export default LearningScreen;

export default LearningScreen;
