import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Animated, // For animations
  Easing, // For animation easing
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
  { id: '6', grapheme: 'f', phoneme: '/f/', exampleWord: 'fish', image: 'https://via.placeholder.com/100x100/FFD700/FFFFFF?text=🐟' },
  { id: '7', grapheme: 'g', phoneme: '/g/', exampleWord: 'grape', image: 'https://via.placeholder.com/100x100/800080/FFFFFF?text=🍇' },
  { id: '8', grapheme: 'h', phoneme: '/h/', exampleWord: 'hat', image: 'https://via.placeholder.com/100x100/FF0000/FFFFFF?text=🎩' },
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
  correctGreen: '#4CAF50', // Green for correct answers
  incorrectRed: '#F44336', // Red for incorrect answers
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
  const [questionType, setQuestionType] = useState<'grapheme' | 'phoneme'>('grapheme'); // Test grapheme or phoneme
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const scaleAnim = useRef(new Animated.Value(1)).current; // For button press animation

  useEffect(() => {
    generateQuestion();
  }, [currentIndex, questionType]);

  const generateQuestion = () => {
    const currentSound = PHONICS_DATA[currentIndex];
    const allOtherSounds = PHONICS_DATA.filter((_, idx) => idx !== currentIndex);

    let correctOption: string;
    let incorrectOptions: string[] = [];

    if (questionType === 'grapheme') {
      correctOption = currentSound.grapheme.toUpperCase();
      incorrectOptions = allOtherSounds
        .sort(() => 0.5 - Math.random())
        .slice(0, 2) // Get 2 random incorrect graphemes
        .map((s) => s.grapheme.toUpperCase());
    } else { // questionType === 'phoneme'
      correctOption = currentSound.phoneme;
      incorrectOptions = allOtherSounds
        .sort(() => 0.5 - Math.random())
        .slice(0, 2) // Get 2 random incorrect phonemes
        .map((s) => s.phoneme);
    }

    const newOptions = [correctOption, ...incorrectOptions].sort(() => 0.5 - Math.random());
    setOptions(newOptions);
    setSelectedOption(null);
    setFeedback(null);
  };

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    const currentSound = PHONICS_DATA[currentIndex];
    let isCorrect: boolean;

    if (questionType === 'grapheme') {
      isCorrect = option === currentSound.grapheme.toUpperCase();
    } else {
      isCorrect = option === currentSound.phoneme;
    }

    if (isCorrect) {
      setFeedback('correct');
      // Play correct sound effect (not implemented yet)
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.1, duration: 100, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start();
    } else {
      setFeedback('incorrect');
      // Play incorrect sound effect (not implemented yet)
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 0.9, duration: 100, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start();
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % PHONICS_DATA.length);
    setQuestionType(questionType === 'grapheme' ? 'phoneme' : 'grapheme'); // Alternate question type
    generateQuestion(); // Re-generate options for new index/type
  };

  const currentSound = PHONICS_DATA[currentIndex];

  return (
    <View style={gameStyles.container}>
      <TouchableOpacity onPress={onGoBack} style={gameStyles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={30} color={COLORS.darkGray} />
      </TouchableOpacity>
      <Text style={gameStyles.title}>Match the Sound!</Text>

      <Animated.View style={[gameStyles.card, { transform: [{ scale: scaleAnim }] }]}>
        <Image source={{ uri: currentSound.image }} style={gameStyles.image} />
        {questionType === 'grapheme' ? (
          <Text style={gameStyles.promptText}>Which letter makes this sound?</Text>
        ) : (
          <Text style={gameStyles.promptText}>What sound does '{currentSound.grapheme.toUpperCase()}' make?</Text>
        )}
      </Animated.View>

      <View style={gameStyles.optionsContainer}>
        {options.map((option, index) => {
          const isCorrect = (questionType === 'grapheme' && option === currentSound.grapheme.toUpperCase()) ||
                          (questionType === 'phoneme' && option === currentSound.phoneme);
          const isSelected = selectedOption === option;

          return (
            <TouchableOpacity
              key={index}
              style={[
                gameStyles.optionButton,
                isSelected && feedback === 'correct' && { backgroundColor: COLORS.correctGreen },
                isSelected && feedback === 'incorrect' && { backgroundColor: COLORS.incorrectRed },
                isSelected && feedback === 'incorrect' && !isCorrect && { borderWidth: 2, borderColor: COLORS.white }, // Highlight wrong choice
                isSelected && feedback === 'incorrect' && isCorrect && { backgroundColor: COLORS.correctGreen }, // Show correct if selected
                feedback && !isSelected && isCorrect && { borderWidth: 2, borderColor: COLORS.correctGreen }, // Show correct if not selected but is correct
              ]}
              onPress={() => !feedback && handleOptionPress(option)} // Disable press after feedback
              disabled={!!feedback}
            >
              <Text style={gameStyles.optionText}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {feedback && (
        <TouchableOpacity style={gameStyles.nextButton} onPress={handleNext}>
          <Text style={gameStyles.nextButtonText}>Next Challenge!</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'games' | 'stories' | 'myStuff'>('home');
  const [currentScreen, setCurrentScreen] = useState<'home' | 'learnAndPlay'>('home');

  const handleTabPress = (tab: 'home' | 'games' | 'stories' | 'myStuff') => {
    setActiveTab(tab);
    console.log(`Navigated to: ${tab}`);
    if (tab === 'games') {
      setCurrentScreen('learnAndPlay');
    } else {
      setCurrentScreen('home');
    }
  };

  const navigateToLearnAndPlay = () => {
    setCurrentScreen('learnAndPlay');
    setActiveTab('games');
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
              size={30}
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
    paddingVertical: 18,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 3 },
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
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  appWordmark: {
    flex: 1,
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    fontFamily: 'System', // Placeholder for playful font like 'Chewy-Regular'
    textAlign: 'center',
  },
  settingsIcon: {
    marginLeft: 10,
  },
  contentFeed: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  contentFeedContainer: {
    alignItems: 'center',
  },
  card: {
    width: '90%',
    borderRadius: 25,
    padding: 20,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 10,
  },
  cardIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
    resizeMode: 'contain',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 5,
    fontFamily: 'System',
  },
  cardDescription: {
    fontSize: 15,
    color: COLORS.darkGray,
    fontFamily: 'System',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.vibrantOrange,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 80,
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
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
    color: COLORS.darkGray,
    fontFamily: 'System',
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
    padding: 20,
    alignItems: 'center',
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
    width: '90%',
    justifyContent: 'center',
    marginBottom: 30,
    minHeight: 200, // Ensure card has minimum height
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: COLORS.pastelGreen,
  },
  promptText: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.darkGray,
    fontFamily: 'System',
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: COLORS.sunshineYellow,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    margin: 8,
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    minWidth: 100,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    fontFamily: 'System',
  },
  nextButton: {
    backgroundColor: COLORS.grassGreen,
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
  },
  nextButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
    fontFamily: 'System',
  },
});

registerRootComponent(App);