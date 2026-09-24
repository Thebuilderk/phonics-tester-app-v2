import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface HeaderProps {
  onAvatarPress?: (avatar: string) => void;
}

export default function Header({ onAvatarPress }: HeaderProps) {
  return (
    <LinearGradient colors={['#E8F5E9', '#C5E1A5']} style={styles.topHeader}>
      <View style={styles.headerLeft}>
        <Text style={styles.sunIcon}>☀️</Text>
        <View>
          <Text style={styles.brandTitle}>LANA PHONICS</Text>
          <Text style={styles.brandSub}>TESTER UK</Text>
        </View>
      </View>

      <View style={styles.avatarRow}>
        {['🦊', '🦉', '🤖'].map((avatar, idx) => (
          <TouchableOpacity 
            key={idx} 
            style={styles.avatarPill} 
            onPress={() => onAvatarPress && onAvatarPress(avatar)}
          >
            <Text style={styles.avatarIcon}>{avatar}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  sunIcon: { fontSize: 28, marginRight: 8 },
  brandTitle: { fontSize: 20, fontFamily: 'Chewy-Regular', color: '#0288D1' },
  brandSub: { fontSize: 10, fontWeight: '800', color: '#FF6F00', marginTop: -2 },
  avatarRow: { flexDirection: 'row' },
  avatarPill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 6,
    marginLeft: 6,
    elevation: 2,
  },
  avatarIcon: { fontSize: 18 },
});
