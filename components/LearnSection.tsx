import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

interface LearnSectionProps {
  onProgressPress: () => void;
  onGemsPress: () => void;
  onRewardsPress: () => void;
}

const LearnSection: React.FC<LearnSectionProps> = ({ onProgressPress, onGemsPress, onRewardsPress }) => {
  return (
    <View style={styles.learnOptionsContainer}> 
      <TouchableOpacity style={styles.optionCard} onPress={() => console.log("Roadmap Pressed")}>
        <Image source={require('../assets/assets/treehouse_phase2.png')} style={styles.roadmapIcon} />
        <Image source={require('../assets/assets/rocket_phase5.png')} style={styles.roadmapIcon} />
        <Text style={styles.optionText}>Roadmap</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionCard} onPress={onProgressPress}>
        <Image source={require('../assets/assets/icon_progress.png')} style={styles.optionIcon} />
        <Text style={styles.optionText}>PROGRESS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionCard} onPress={onGemsPress}>
        <Image source={require('../assets/assets/icon_gems.png')} style={styles.optionIcon} />
        <Text style={styles.optionText}>GEMS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionCard} onPress={onRewardsPress}>
        <Image source={require('../assets/assets/icon_rewards.png')} style={styles.optionIcon} />
        <Text style={styles.optionText}>REWARDS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  learnOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 10,
    marginTop: 15, // Add some top margin as per original design
  },
  optionCard: {
    backgroundColor: '#E0FFFF', // Light cyan, as per previous static HTML
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '48%', // Roughly 2 items per row
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  roadmapIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  optionIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  optionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4682B4', // Steel blue
    marginTop: 5,
    textAlign: 'center',
  },
});

export default LearnSection;