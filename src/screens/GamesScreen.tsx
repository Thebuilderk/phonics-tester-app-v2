import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const GamesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Phonics Games</Text>
        <Text style={styles.subtitle}>Fun interactive activities coming soon!</Text>

        <TouchableOpacity 
          style={styles.gameCard} 
          onPress={() => console.log('Game selected')}
        >
          <Text style={styles.gameTitle}>🎮 Word Matcher</Text>
          <Text style={styles.gameDescription}>Match letters to their phonics sounds.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 30,
    textAlign: 'center',
  },
  gameCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3498DB',
    marginBottom: 6,
  },
  gameDescription: {
    fontSize: 14,
    color: '#555555',
  },
});

export default GamesScreen;