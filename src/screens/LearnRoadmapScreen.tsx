import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const LearnRoadmapScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Learning Roadmap</Text>
        <Text style={styles.subtitle}>Track your phonics journey step-by-step!</Text>

        <View style={styles.card}>
          <Text style={styles.stepTitle}>Stage 1: Single Sounds</Text>
          <Text style={styles.stepDesc}>Master basic vowel and consonant sounds.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.stepTitle}>Stage 2: Blends & Digraphs</Text>
          <Text style={styles.stepDesc}>Combine sounds like sh, ch, and th.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    padding: 20,
    alignItems: 'center',
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
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#27AE60',
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 14,
    color: '#555555',
  },
});

export default LearnRoadmapScreen;