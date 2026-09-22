import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface RewardsBarProps {
  onProgressPress: () => void;
  onGemsPress?: () => void;
  onRewardsPress?: () => void;
}

export default function RewardsBar({
  onProgressPress,
  onGemsPress,
  onRewardsPress,
}: RewardsBarProps) {
  return (
    <View style={styles.quickNavRow}>
      <TouchableOpacity style={styles.quickBtn} onPress={onProgressPress}>
        <Text style={styles.quickIcon}>📖</Text>
        <Text style={styles.quickText}>PROGRESS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.quickBtn} onPress={onGemsPress}>
        <Text style={styles.quickIcon}>💎</Text>
        <Text style={styles.quickText}>GEMS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.quickBtn} onPress={onRewardsPress}>
        <Text style={styles.quickIcon}>🎁</Text>
        <Text style={styles.quickText}>REWARDS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  quickNavRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 8 },
  quickBtn: {
    backgroundColor: '#FFF8E1',
    borderWidth: 2,
    borderColor: '#FFE082',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 3,
  },
  quickIcon: { fontSize: 18 },
  quickText: { fontSize: 9, fontWeight: 'bold', color: '#E65100', marginTop: 2 },
});