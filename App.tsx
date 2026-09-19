import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { registerRootComponent } from 'expo';

// ── Types ──────────────────────────────────────────────
interface Sound {
  id: string;
  grapheme: string;
  phoneme: string;
  exampleWord: string;
  image: string; // URL to an image for the word
}

// ── Data ──────────────────────────────────────────────
const PHONICS_DATA: Sound[] = [
  { id: '1', grapheme: 'a', phoneme: '/æ/', exampleWord: 'apple', image: 'https://via.placeholder.com/100x100/FF5733/FFFFFF?text=🍎' },
  { id: '2', grapheme: 'b', phoneme: '/b/', exampleWord: 'ball', image: 'https://via.placeholder.com/100x100/33FF57/FFFFFF?text=⚽' },
  { id: '3', grapheme: 'c', phoneme: '/k/', exampleWord: 'cat', image: 'https://via.placeholder.com/100x100/3357FF/FFFFFF?text=🐱' },
  { id: '4', grapheme: 'd', phoneme: '/d/', exampleWord: 'dog', image: 'https://via.placeholder.com/100x100/FF33FB/FFFFFF?text=🐶' },
  { id: '5', grapheme: 'e', phoneme: '/ɛ/', exampleWord: 'egg', image: 'https://via.placeholder.com/100x100/33FFF7/FFFFFF?text=🥚' },
];

const COLORS = {
  skyBlue: '#87CEEB',
  sunshineYellow: '#FFD700',
  grassGreen: '#7CFC00',
  tomatoRed: '#FF6347',
  pastelBlue: '#A7D9FF',
  pastelGreen: '#C8E6C9',
  pastelPurple: '#D1C4E9',
  white: '#FFFFFF',
  darkGray: '#333333',
  lightGray: '#F0F0F0',
  orange: '#FFA500',
  vibrantOrange: '#FF7F50', // A more vibrant orange for bottom nav
  teal: '#008080',
  pink: '#FFC0CB',
};

// Icons - Using more playful placeholders
const adventureSunIcon = 'https://via.placeholder.com/60x60/FFD700/FFFFFF?text=☀️';
const bookIcon = 'https://via.placeholder.com/80x80/7CFC00/FFFFFF?text=📖'; // Larger, more friendly
const castleIcon = 'https://via.placeholder.com/80x80/FFD700/FFFFFF?text=🏰';
const trophyIcon = 'https://via.placeholder.com/80x80/D1C4E9/FFFFFF?text=🏆';

interface CategoryCardProps {
  title: string;
  description: string;
  backgroundColor: string;
  icon: string;
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  backgroundColor,
  icon,
  onPress,
}) => (
  <TouchableOpacity style={[styles.card, { backgroundColor }]} onPress={onPress}>
    <Image source={{ uri: icon }} style={styles.cardIcon} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  </TouchableOpacity>
);

interface BottomNavItemProps {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  isFocused: boolean;
  onPress: () => void;
}

const BottomNavItem: React.FC<BottomNavItemProps> = ({
  iconName,
  label,
  isFocused,
  onPress,
}) => (
  <TouchableOpacity style={styles.bottomNavItem} onPress={onPress}>
    <MaterialCommunityIcons
      name={iconName}
      size={26} // Slightly larger icons
      color={isFocused ? COLORS.white : COLORS.darkGray} // Inverted colors for focus
    />
    <Text
      style={[
        styles.bottomNavItemLabel,
        { color: isFocused ? COLORS.white : COLORS.darkGray },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

interface PhonicsGameScreenProps {
  onGoBack: () => void;
}

const PhonicsGameScreen: React.FC<PhonicsGameScreenProps> = ({ onGoBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const currentSound = PHONICS_DATA[currentIndex];

  const handleNext = () => {
    setIsRevealed(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % PHONICS_DATA.length);
  };

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <View style={gameStyles.container}>
      <TouchableOpacity onPress={onGoBack} style={gameStyles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={30} color={COLORS.darkGray} />
      </TouchableOpacity>
      <Text style={gameStyles.title}>Learn & Play Phonics!</Text>

      <View style={gameStyles.card}>
        <Image source={{ uri: currentSound.image }} style={gameStyles.image} />
        <Text style={gameStyles.grapheme}>{currentSound.grapheme.toUpperCase()}</Text>
        {isRevealed && (
          <View style={gameStyles.revealSection}>
            <Text style={gameStyles.phoneme}>{currentSound.phoneme}</Text>
            <Text style={gameStyles.exampleWord}>{currentSound.exampleWord}</Text>
          </View>
        )}
      </View>

      <View style={gameStyles.buttonContainer}>
        {!isRevealed && (
          <TouchableOpacity style={gameStyles.actionButton} onPress={handleReveal}>
            <Text style={gameStyles.actionButtonText}>Reveal Answer</Text>
          </TouchableOpacity>
        )}
        {isRevealed && (
          <TouchableOpacity style={gameStyles.actionButton} onPress={handleNext}>
            <Text style={gameStyles.actionButtonText}>Next Word</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'games' | 'stories' | 'myStuff'>('home');
  const [currentScreen, setCurrentScreen] = useState<'home' | 'learnAndPlay'>('home');

  const handleTabPress = (tab: 'home' | 'games' | 'stories' | 'myStuff') => {
    setActiveTab(tab);
    console.log(`Navigated to: ${tab}`);
    // For now, only 'games' tab triggers the PhonicsGameScreen
    if (tab === 'games') {
      setCurrentScreen('learnAndPlay');
    } else {
      setCurrentScreen('home');
    }
  };

  const navigateToLearnAndPlay = () => {
    setCurrentScreen('learnAndPlay');
    setActiveTab('games'); // Highlight games tab when in Learn & Play
  };

  const navigateHome = () => {
    setCurrentScreen('home');
    setActiveTab('home');
  };

  if (currentScreen === 'learnAndPlay') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <PhonicsGameScreen onGoBack={navigateHome} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={[COLORS.skyBlue, COLORS.pastelBlue]} style={styles.headerGradient}>
        <View style={styles.headerContent}>
          <Image source={{ uri: adventureSunIcon }} style={styles.mascotIcon} />
          <Text style={styles.appWordmark}>Lana Phonics Tester</Text>
          <TouchableOpacity onPress={() => console.log('Settings Pressed')}>
            <MaterialCommunityIcons
              name="cog"
              size={30} // Slightly larger settings icon
              color={COLORS.darkGray}
              style={styles.settingsIcon}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.contentFeed} contentContainerStyle={styles.contentFeedContainer}>
        <CategoryCard
          title="Learn & Play"
          description="Interactive phonics lessons & games."
          backgroundColor={COLORS.pastelGreen}
          icon={bookIcon}
          onPress={navigateToLearnAndPlay}
        />
        <CategoryCard
          title="Story Time"
          description="Read-along adventures & bedtime stories."
          backgroundColor={COLORS.sunshineYellow}
          icon={castleIcon}
          onPress={() => console.log('Story Time Pressed')} // Placeholder
        />
        <CategoryCard
          title="My Progress"
          description="Track your phonics journey!"
          backgroundColor={COLORS.pastelPurple}
          icon={trophyIcon}
          onPress={() => console.log('My Progress Pressed')} // Placeholder
        />
      </ScrollView>

      <View style={styles.bottomNav}>
        <BottomNavItem
          iconName="home"
          label="Home"
          isFocused={activeTab === 'home'}
          onPress={() => handleTabPress('home')}
        />
        <BottomNavItem
          iconName="gamepad-variant"
          label="Games"
          isFocused={activeTab === 'games'}
          onPress={() => handleTabPress('games')}
        />
        <BottomNavItem
          iconName="book-open-variant"
          label="Stories"
          isFocused={activeTab === 'stories'}
          onPress={() => handleTabPress('stories')}
        />
        <BottomNavItem
          iconName="briefcase"
          label="My Stuff"
          isFocused={activeTab === 'myStuff'}
          onPress={() => handleTabPress('myStuff')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  headerGradient: {
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 20,
    paddingVertical: 18, // Increased vertical padding
    borderBottomLeftRadius: 25, // More rounded
    borderBottomRightRadius: 25, // More rounded
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 3 }, // More pronounced shadow
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mascotIcon: {
    width: 50, // Larger mascot
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  appWordmark: {
    flex: 1, // Allows wordmark to take available space
    fontSize: 26, // Larger font size
    fontWeight: 'bold',
    color: COLORS.darkGray,
    fontFamily: 'System', // Placeholder for playful font like 'Chewy-Regular'
    textAlign: 'center', // Center wordmark
  },
  settingsIcon: {
    marginLeft: 10,
  },
  contentFeed: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 25, // Increased vertical padding
  },
  contentFeedContainer: {
    alignItems: 'center',
  },
  card: {
    width: '90%', // Slightly narrower cards
    borderRadius: 25, // More rounded
    padding: 20,
    marginBottom: 25, // More space between cards
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 5 }, // More pronounced shadow
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 10,
  },
  cardIcon: {
    width: 70, // Larger icons
    height: 70,
    borderRadius: 35,
    marginRight: 20,
    resizeMode: 'contain',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 22, // Larger title
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 5,
    fontFamily: 'System', // Placeholder for playful font
  },
  cardDescription: {
    fontSize: 15,
    color: COLORS.darkGray,
    fontFamily: 'System', // Placeholder for playful font
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.vibrantOrange, // More vibrant color
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 80, // Taller bottom nav
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  bottomNavItemLabel: {
    fontSize: 13, // Slightly larger label
    fontWeight: 'bold',
    marginTop: 5,
    fontFamily: 'System', // Placeholder for playful font
  },
});

const gameStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.pastelBlue,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: StatusBar.currentHeight + 10 || 40,
    left: 20,
    zIndex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 30,
    fontFamily: 'System',
    textAlign: 'center',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
    width: '90%',
    aspectRatio: 1, // Make card square
    justifyContent: 'center',
    marginBottom: 40,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: COLORS.pastelGreen,
  },
  grapheme: {
    fontSize: 70,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    fontFamily: 'System',
  },
  revealSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  phoneme: {
    fontSize: 35,
    color: COLORS.tomatoRed,
    fontFamily: 'System',
    marginBottom: 10,
  },
  exampleWord: {
    fontSize: 40,
    color: COLORS.teal,
    fontFamily: 'System',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: COLORS.sunshineYellow,
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  actionButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    fontFamily: 'System',
  },
});

registerRootComponent(App);