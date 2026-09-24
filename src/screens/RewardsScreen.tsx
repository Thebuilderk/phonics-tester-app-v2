import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const BADGES = [
  { id: '1', title: 'A-Z Explorer', desc: 'Completed A-Z!', bg: '#3B82F6', icon: '🚀', unlocked: true },
  { id: '2', title: 'Sight Word Master', desc: '20 Words Read!', bg: '#3B82F6', icon: '📖', unlocked: true },
  { id: '3', title: 'Speedy Reader', desc: 'Fluent Level!', bg: '#06B6D4', icon: '🐰', unlocked: true },
  { id: '4', title: 'Quiz Champion', desc: 'Got a perfect score!', bg: '#3B82F6', icon: '🏅', unlocked: true },
  { id: '5', title: 'Phonics Hero', desc: 'Mastered blending!', bg: '#F97316', icon: '🦉', unlocked: true },
  { id: '6', title: 'Perfect Week', desc: 'Logged in 7 days!', bg: '#06B6D4', icon: '📅', unlocked: true },
  { id: '7', title: 'Word Builder', desc: 'Built 50 Words!', bg: '#22C55E', icon: '🧩', unlocked: true },
  { id: '8', title: 'Daily Goal', desc: 'Hit daily targets!', bg: '#A855F7', icon: '👑', unlocked: true },
  { id: '9', title: 'Locked Badge', desc: 'Keep Learning!', bg: '#94A3B8', icon: '🔒', unlocked: false },
  { id: '10', title: 'Locked Badge', desc: 'Keep Learning!', bg: '#94A3B8', icon: '🔒', unlocked: false },
];

export default function RewardsScreen({ onNavigate }: { onNavigate: (screen: any) => void }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.homeBtn} onPress={() => onNavigate('HOME')}>
          <Text style={styles.homeText}>🏠 HOME</Text>
        </TouchableOpacity>
        <Text style={styles.title}>REWARDS ⭐</Text>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {BADGES.map((badge) => (
          <View
            key={badge.id}
            style={[
              styles.badgeCard,
              { backgroundColor: badge.unlocked ? badge.bg : '#CBD5E1' }
            ]}
          >
            <Text style={styles.badgeIcon}>{badge.icon}</Text>
            <Text style={styles.badgeTitle}>{badge.title}</Text>
            <Text style={styles.badgeDesc}>{badge.desc}</Text>
            {badge.unlocked && <View style={styles.checkMark}><Text style={styles.checkText}>✓</Text></View>}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#38BDF8', padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  homeBtn: { backgroundColor: '#F97316', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16 },
  homeText: { color: '#FFF', fontWeight: 'bold' },
  title: { fontSize: 28, fontWeight: '900', color: '#FFF', marginLeft: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' },
  badgeCard: { width: '18%', height: 120, borderRadius: 20, padding: 8, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  badgeIcon: { fontSize: 28 },
  badgeTitle: { color: '#FFF', fontWeight: '900', fontSize: 11, textAlign: 'center', marginTop: 4 },
  badgeDesc: { color: '#F0FDF4', fontSize: 9, textAlign: 'center', marginTop: 2 },
  checkMark: { position: 'absolute', bottom: 6, right: 6, backgroundColor: '#22C55E', borderRadius: 8, width: 16, height: 16, justifyContent: 'center', alignItems: 'center' },
  checkText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
});