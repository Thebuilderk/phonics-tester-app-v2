import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function TestScreen({ onNavigate }: { onNavigate: (screen: any) => void }) {
  const [placedLetters, setPlacedLetters] = useState<(string | null)[]>([null, null, null]);
  const availableLetters = ['C', 'A', 'T'];

  const handleLetterPress = (letter: string) => {
    const nextEmptyIndex = placedLetters.indexOf(null);
    if (nextEmptyIndex !== -1) {
      const updated = [...placedLetters];
      updated[nextEmptyIndex] = letter;
      setPlacedLetters(updated);
    }
  };

  const handleSlotPress = (index: number) => {
    const updated = [...placedLetters];
    updated[index] = null;
    setPlacedLetters(updated);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.homeBtn} onPress={() => onNavigate('HOME')}>
          <Text style={styles.homeText}>🏠 HOME</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TEST 1: CAT</Text>
      </View>

      {/* Test Canvas */}
      <View style={styles.card}>
        <Text style={styles.targetWord}>CAT</Text>
        <TouchableOpacity style={styles.soundBtn}>
          <Text style={styles.soundText}>🔊 PLAY SOUND</Text>
        </TouchableOpacity>

        {/* Source Letter Cards */}
        <View style={styles.letterBank}>
          {availableLetters.map((char, i) => (
            <TouchableOpacity key={i} style={styles.letterCard} onPress={() => handleLetterPress(char)}>
              <Text style={styles.letterText}>{char}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Target Drag/Drop Slots */}
        <View style={styles.slotsRow}>
          {placedLetters.map((char, index) => (
            <TouchableOpacity key={index} style={styles.slot} onPress={() => handleSlotPress(index)}>
              <Text style={styles.slotText}>{char || '---'}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Submit Action */}
        <TouchableOpacity style={styles.submitBtn} onPress={() => alert('Word Submitted!')}>
          <Text style={styles.submitText}>SUBMIT ▶</Text>
          <Text style={styles.submitSub}>CHECK MY ANSWER</Text>
        </TouchableOpacity>

        {/* Progress Tracker Bar */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Test progress: 1 of 5 words</Text>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: '20%' }]} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#7DD3FC', padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  homeBtn: { backgroundColor: '#0284C7', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16 },
  homeText: { color: '#FFF', fontWeight: 'bold' },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#FFF', marginLeft: 20 },
  card: { flex: 1, backgroundColor: '#FFF', borderRadius: 24, padding: 20, alignItems: 'center' },
  targetWord: { fontSize: 42, fontWeight: '900', color: '#9333EA', letterSpacing: 4 },
  soundBtn: { backgroundColor: '#22C55E', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginVertical: 10 },
  soundText: { color: '#FFF', fontWeight: 'bold' },
  letterBank: { flexDirection: 'row', gap: 16, marginVertical: 16 },
  letterCard: { backgroundColor: '#BAE6FD', width: 60, height: 60, borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#0284C7' },
  letterText: { fontSize: 28, fontWeight: '900', color: '#0369A1' },
  slotsRow: { flexDirection: 'row', gap: 16, marginVertical: 12 },
  slot: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#94A3B8', justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed' },
  slotText: { fontSize: 20, fontWeight: 'bold', color: '#334155' },
  submitBtn: { backgroundColor: '#22C55E', borderRadius: 20, paddingHorizontal: 24, paddingVertical: 10, alignItems: 'center', marginTop: 'auto' },
  submitText: { color: '#FFF', fontWeight: '900', fontSize: 16 },
  submitSub: { color: '#DCFCE7', fontSize: 10, fontWeight: 'bold' },
  progressContainer: { width: '100%', marginTop: 16, alignItems: 'center' },
  progressText: { fontSize: 12, fontWeight: 'bold', color: '#0284C7', marginBottom: 4 },
  progressBarTrack: { width: '80%', height: 10, backgroundColor: '#E2E8F0', borderRadius: 5, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#0284C7' },
});