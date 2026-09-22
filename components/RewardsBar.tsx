import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

interface RewardsBarProps {
  onProgressPress: () => void;
  onGemsPress: () => void;
  onRewardsPress: () => void;
}

const RewardsBar: React.FC<RewardsBarProps> = ({ onProgressPress, onGemsPress, onRewardsPress }) => {
  return (
    <View style={styles.rewardsBar}>
      <TouchableOpacity onPress={onProgressPress} style={styles.rewardsBarItem}>
        <Image source={require('../assets/icon_progress.png')} style={styles.icon} />
        <Text style={styles.rewardsBarLabel}>PROGRESS</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onGemsPress} style={styles.rewardsBarItem}>
        <Image source={require('../assets/icon_gems.png')} style={styles.icon} />
        <Text style={styles.rewardsBarLabel}>GEMS</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRewardsPress} style={styles.rewardsBarItem}>
        <Image source={require('../assets/icon_rewards.png')} style={styles.icon} />
        <Text style={styles.rewardsBarLabel}>REWARDS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rewardsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#E0F2F7',
    borderRadius: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  rewardsBarItem: {
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  rewardsBarLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0288D1',
  },
});

export default RewardsBar;
