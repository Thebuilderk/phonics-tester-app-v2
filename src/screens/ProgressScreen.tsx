import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function ProgressScreen({ onNavigate }: { onNavigate: (screen: any) => void }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MY PROGRESS!</Text>
        <TouchableOpacity style={styles.homeBtn} onPress={() => onNavigate('HOME')}>
          <Text style={styles.homeText}>🏠 HOME</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsRow}>
        {/* Module 1 */}
        <View style={[styles.moduleCard, { borderColor: '#F97316' }]}>
          <View style={[styles.moduleHeader, { backgroundColor: '#F97316' }]}>
            <Text style={styles.moduleTitle}>LETTER SOUNDS</Text>
          </View>
          <Text style={styles.statusText}>MASTERED!</Text>
          <Text style={styles.percentText}>85%</Text>
          <Text style={styles.subDetail}>LEVEL 8</Text>
          <Text style={styles.masteredList}>MASTERED: a, s, m, t, p, i...</Text>
        </View>

        {/* Module 2 */}
        <View style={[styles.moduleCard, { borderColor: '#22C55E' }]}>
          <View style={[styles.moduleHeader, { backgroundColor: '#22C55E' }]}>
            <Text style={styles.moduleTitle}>BLENDING WORDS</Text>
          </View>
          <Text style={styles.statusText}>LEARNING...</Text>
          <Text style={styles.percentText}>60%</Text>
          <Text style={styles.subDetail}>LEVEL 5</Text>
          <Text style={styles.masteredList}>MASTERED: cat, dog, sun...</Text>
        </View>

        {/* Module 3 */}
        <View style={[styles.moduleCard, { borderColor: '#A855F7' }]}>
          <View style={[styles.moduleHeader, { backgroundColor: '#A855F7' }]}>
            <Text style={styles.moduleTitle}>READING STORIES</Text>
          </View>
          <Text style={styles.statusText}>EXPLORING!</Text>
          <Text style={styles.percentText}>40%</Text>
          <Text style={styles.subDetail}>STORY 3</Text>
          <Text style={styles.masteredList}>COMPLETED: The Big Cat</Text>
        </View>
      </View>

      {/* Completion History Feed */}
      <View style={styles.historyBox}>
        <Text style={styles.historyTitle}>COMPLETION HISTORY</Text>
        <ScrollView style={styles.historyList}>
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>⭐ ACHIEVEMENT UNLOCKED: Level 1-5 Letter Sounds!</Text>
            <Text style={styles.historyDate}>3 days ago</Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>✅ LESSON COMPLETED: Phonics Fun 'cat' & 'dog'!</Text>
            <Text style={styles.historyDate}>Yesterday</Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>📖 STORY READ: The Big Cat!</Text>
            <Text style={styles.historyDate}>Today</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#BAE6FD', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 26, fontWeight: '900', color: '#0369A1' },
  homeBtn: { backgroundColor: '#EAB308', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16 },
  homeText: { color: '#FFF', fontWeight: 'bold' },
  cardsRow: { flexDirection: 'row', gap: 10, height: 180 },
  moduleCard: { flex: 1, backgroundColor: '#FFF', borderRadius: 16, borderWidth: 2, overflow: 'hidden', alignItems: 'center' },
  moduleHeader: { width: '100%', paddingVertical: 6, alignItems: 'center' },
  moduleTitle: { color: '#FFF', fontWeight: '900', fontSize: 11 },
  statusText: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginTop: 8 },
  percentText: { fontSize: 22, fontWeight: '900', color: '#0284C7', marginVertical: 2 },
  subDetail: { fontSize: 10, fontWeight: 'bold', color: '#475569' },
  masteredList: { fontSize: 9, color: '#64748B', marginTop: 'auto', marginBottom: 8, textAlign: 'center', paddingHorizontal: 4 },
  historyBox: { flex: 1, backgroundColor: '#FFF', borderRadius: 16, marginTop: 12, padding: 12 },
  historyTitle: { fontSize: 14, fontWeight: '900', color: '#0369A1', marginBottom: 8 },
  historyList: { flex: 1 },
  historyItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  historyText: { fontSize: 11, fontWeight: 'bold', color: '#334155' },
  historyDate: { fontSize: 10, color: '#94A3B8' },
});