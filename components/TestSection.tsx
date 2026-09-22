import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { Audio } from 'expo-av';
import { useFonts, Chewy_400Regular } from '@expo-google-fonts/chewy';

interface PhonemeSegment {
  text: string;
  type: 'dot' | 'line';
}

interface PhonicsWord {
  id: number;
  word: string;
  isAlien: boolean;
  phonicsType: string;
  phase: number;
  segments: PhonemeSegment[];
}

interface TestSectionProps {
  currentWord: PhonicsWord;
  score: number;
  onStartTest: () => void;
  playSound: (soundKey: string) => void;
  mascotAnim: Animated.Value;
}

const TestSection: React.FC<TestSectionProps> = ({
  currentWord,
  score,
  onStartTest,
  playSound,
  mascotAnim,
}) => {
  const [fontsLoaded] = useFonts({ 'Chewy-Regular': Chewy_400Regular });

  if (!fontsLoaded) {
    return null; // Or a loading indicator
  }

  return (
    <View style={styles.mainCard}>
      <View style={styles.cardHeaderBanner}>
        <Text style={styles.cardHeaderTitle}>TEST</Text>
      </View>

      {/* Word Card & Score Gauge */}
      <View style={styles.testDisplayContainer}>
        <View style={styles.wordDisplayCard}>
          <Text style={styles.wordDisplayText}>{currentWord.word}</Text>
          <View style={styles.phonemeRow}>
            {currentWord.segments.map((seg, i) => (
              <View key={i} style={styles.segmentDotLine}>
                <Text style={styles.segText}>{seg.text}</Text>
                {seg.type === 'dot' ? (
                  <View style={styles.pDot} />
                ) : (
                  <View style={styles.pLine} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Score Dial */}
        <View style={styles.scoreGaugeRing}>
          <Text style={styles.scoreGaugeText}>{score}</Text>
          <Text style={styles.scoreGaugeTotal}>/ 40</Text>
        </View>
      </View>

      {/* Mascot & Play Action Area */}
      <View style={styles.mascotArea}>
        <Animated.View style={[styles.mascotWrapper, { transform: [{ translateY: mascotAnim }] }]}>
          <Image source={require('../assets/zorgo_mascot.png')} style={styles.mascotAvatar} />
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>Hi! I'm Zorgo! Start Test!</Text>
          </View>
        </Animated.View>

        <View style={styles.actionColumn}>
          <TouchableOpacity style={styles.micCircleBtn} onPress={() => playSound(currentWord.word)}>
            <Text style={{ fontSize: 24, color: '#FFFFFF' }}>🎤</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.startTestBtn} onPress={onStartTest}>
            <Text style={styles.startTestText}>START TEST</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#B2EBF2',
    padding: 20,
    marginBottom: 16,
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
    flex: 1, // Allow it to take up available space
  },
  cardHeaderBanner: {
    alignSelf: 'center',
    paddingHorizontal: 36,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: -34,
    marginBottom: 12,
    backgroundColor: '#4FC3F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeaderTitle: { fontSize: 22, fontFamily: 'Chewy-Regular', color: '#37474F', letterSpacing: 1 },

  testDisplayContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  wordDisplayCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#E0F7FA',
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingVertical: 14,
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  wordDisplayText: { fontSize: 42, fontFamily: 'Chewy-Regular', color: '#263238' },
  phonemeRow: { flexDirection: 'row', marginTop: 4, gap: 6 },
  segmentDotLine: { alignItems: 'center' },
  segText: { fontSize: 16, fontWeight: '800', color: '#37474F' },
  pDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF7043', marginTop: 4 },
  pLine: { width: 22, height: 4, borderRadius: 2, backgroundColor: '#FF7043', marginTop: 4 },

  scoreGaugeRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#FF7043',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 14,
    shadowColor: '#FF7043',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  scoreGaugeText: { fontSize: 18, fontWeight: '900', color: '#D84315' },
  scoreGaugeTotal: { fontSize: 10, fontWeight: '700', color: '#B0BEC5' },

  mascotArea: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  mascotWrapper: { flexDirection: 'row', alignItems: 'center' },
  mascotAvatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    resizeMode: 'contain',
  },
  speechBubble: {
    backgroundColor: '#F1F8E9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#DCEDC8',
  },
  speechText: { fontSize: 12, fontWeight: '800', color: '#33691E' },

  actionColumn: { alignItems: 'center', gap: 8 },
  micCircleBtn: {
    backgroundColor: '#FF7043',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF7043',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  startTestBtn: {
    backgroundColor: '#66BB6A', // Green color for Start Test button
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#388E3C', // Darker green shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  startTestText: { color: '#FFFFFF', fontWeight: '900', fontSize: 13, letterSpacing: 0.5 },
});

export default TestSection;
