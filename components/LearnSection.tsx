import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import RewardsBar from '../RewardsBar'; // Assuming RewardsBar is in the parent directory or needs to be moved

interface LearnSectionProps {
  onProgressPress: () => void;
  onGemsPress: () => void;
  onRewardsPress: () => void;
}

const LearnSection: React.FC<LearnSectionProps> = ({ onProgressPress, onGemsPress, onRewardsPress }) => {
  return (
    <View style={styles.mainCard}>
      <View style={styles.cardHeaderBanner}>
        <Text style={styles.cardHeaderTitle}>LEARN</Text>
      </View>
      
      <Text style={styles.roadmapSub}>Phonics Roadmap</Text>

      <View style={styles.roadmapFlow}>
        <View style={styles.phaseBadgeContainer}>
          <Image source={require('../assets/treehouse_phase2.png')} style={styles.illustrationImage} />
          <Text style={styles.phaseText}>Phase 2</Text>
        </View>

        <View style={styles.pathDashedLine} />

        <View style={styles.phaseBadgeContainer}>
          <Image source={require('../assets/rocket_phase5.png')} style={styles.illustrationImage} />
          <Text style={styles.phaseText}>Phase 5</Text>
        </View>
      </View>

      <RewardsBar
        onProgressPress={onProgressPress}
        onGemsPress={onGemsPress}
        onRewardsPress={onRewardsPress}
      />

      <View style={styles.learnOptions}>
        <TouchableOpacity onPress={onProgressPress} style={styles.learnOptionButton}>
          <Image source={require('../assets/icon_progress.png')} style={styles.learnOptionIcon} />
          <Text style={styles.learnOptionText}>PROGRESS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onGemsPress} style={styles.learnOptionButton}>
          <Image source={require('../assets/icon_gems.png')} style={styles.learnOptionIcon} />
          <Text style={styles.learnOptionText}>GEMS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRewardsPress} style={styles.learnOptionButton}>
          <Image source={require('../assets/icon_rewards.png')} style={styles.learnOptionIcon} />
          <Text style={styles.learnOptionText}>REWARDS</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#FFF176',
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
    backgroundColor: '#FFD54F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeaderTitle: { fontSize: 22, fontFamily: 'Chewy-Regular', color: '#37474F', letterSpacing: 1 },

  roadmapSub: { textAlign: 'center', fontSize: 16, fontWeight: '700', color: '#78909C', marginBottom: 12 },

  roadmapFlow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    position: 'relative',
  },
  phaseBadgeContainer: { alignItems: 'center', zIndex: 2 },
  illustrationImage: {
    width: 72,
    height: 72,
    resizeMode: 'contain',
  },
  phaseText: { fontSize: 13, fontWeight: '800', color: '#455A64', marginTop: 6 },
  pathDashedLine: {
    width: 60,
    height: 0,
    borderWidth: 2,
    borderColor: '#B0BEC5',
    borderStyle: 'dashed',
    marginHorizontal: -8,
  },

  learnOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    flexWrap: 'wrap',
  },
  learnOptionButton: {
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
    flexBasis: '28%', // roughly 3 items per row
  },
  learnOptionIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  learnOptionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
});

export default LearnSection;
