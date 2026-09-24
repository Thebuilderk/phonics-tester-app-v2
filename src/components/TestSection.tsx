import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';

interface PhonicsWord {
  id: number;
  word: string;
  isAlien: boolean;
  phonicsType: string;
  phase: number;
  segments: any[];
}

interface TestSectionProps {
  currentWord: PhonicsWord;
  score: number;
  totalQuestions?: number;
  onStartTest: () => void;
  mascotAnim: Animated.Value;
}

const TestSection: React.FC<TestSectionProps> = ({
  currentWord,
  score,
  totalQuestions = 10,
  onStartTest,
  mascotAnim,
}) => {
  return (
    <View style={styles.testSectionContainer}>
      <Text style={styles.sectionTitle}>TEST</Text>
      <Text style={styles.testWord}>{currentWord.word}</Text>
      <Text style={styles.scoreText}>{score}/{totalQuestions}</Text>
      <Animated.Image 
        source={require('../../assets/zorgo_mascot.png')} 
        style={[styles.mascot, { transform: [{ translateY: mascotAnim }] }]} 
      />
      <TouchableOpacity style={styles.startTestButton} onPress={onStartTest}>
        <Text style={styles.startTestButtonText}>START TEST</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  testSectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Chewy-Regular',
    color: '#8A2BE2',
    marginBottom: 10,
    textAlign: 'center',
  },
  testWord: {
    fontSize: 48,
    fontFamily: 'Chewy-Regular',
    color: '#FF4500',
    marginVertical: 10,
  },
  scoreText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  mascot: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  startTestButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  startTestButtonText: {
    fontSize: 24,
    fontFamily: 'Chewy-Regular',
    color: '#FFFFFF',
  },
});

export default TestSection;