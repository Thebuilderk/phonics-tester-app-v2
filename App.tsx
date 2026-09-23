import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Animated,
  useWindowDimensions,
  Image
} from 'react-native';
import { Audio } from 'expo-av';
import { registerRootComponent } from 'expo';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Chewy_400Regular } from '@expo-google-fonts/chewy';
import { LinearGradient } from 'expo-linear-gradient';

import NavigationBar, { TabType } from './NavigationBar';
import AvatarCustomizer from './components/AvatarCustomizer';
import LearnSection from './components/LearnSection';
import TestSection from './components/TestSection';
import RewardsBar from './components/RewardsBar';

SplashScreen.preventAutoHideAsync();

const SOUND_ASSETS: { [key: string]: any } = {
  chin: require('./assets/sounds/chin.mp3'),
  quog: require('./assets/sounds/quog.mp3'),
  shark: require('./assets/sounds/shark.mp3'),
  phope: require('./assets/sounds/phope.mp3'),
  gloom: require('./assets/sounds/gloom.mp3'),
  grateful: require('./assets/sounds/grateful.mp3'),
  dolphin: require('./assets/sounds/dolphin.mp3'),
  pumpkin: require('./assets/sounds/pumpkin.mp3'),
};

interface PhonemeSegment {
  text: string;
  type: 'dot' | 'line';
}

interface PhonicsWord {
  id: number;
  word: string;
  isAlien: boolean;
  phonicsType: string;
  phase: number;
  segments: PhonemeSegment[];
}

const PHONICS_CURRICULUM: PhonicsWord[] = [
  { id: 1, word: 'chin', isAlien: false, phonicsType: 'Digraph ch', phase: 3, segments: [{ text: 'ch', type: 'line' }, { text: 'i', type: 'dot' }, { text: 'n', type: 'dot' }] },
  { id: 2, word: 'cat', isAlien: false, phonicsType: 'CVC Word', phase: 2, segments: [{ text: 'c', type: 'dot' }, { text: 'a', type: 'dot' }, { text: 't', type: 'dot' }] },
  { id: 3, word: 'shark', isAlien: false, phonicsType: 'Digraph sh / ar', phase: 3, segments: [{ text: 'sh', type: 'line' }, { text: 'ar', type: 'line' }, { text: 'k', type: 'dot' }] },
  { id: 4, word: 'gloom', isAlien: false, phonicsType: 'Vowel Team oo', phase: 4, segments: [{ text: 'gl', type: 'line' }, { text: 'oo', type: 'line' }, { text: 'm', type: 'dot' }] },
  { id: 5, word: 'phope', isAlien: true, phonicsType: 'Alien Word', phase: 5, segments: [{ text: 'ph', type: 'line' }, { text: 'o', type: 'dot' }, { text: 'pe', type: 'line' }] },
];

export default function App() {
  const [fontsLoaded] = useFonts({ 'Chewy-Regular': Chewy_400Regular });
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  // Smooth floating mascot animation
  const mascotAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(mascotAnim, { toValue: -6, duration: 1200, useNativeDriver: true }),
        Animated.timing(mascotAnim, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const onLayoutRootView = async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  };

  async function playSound(soundKey: string) {
    try {
      if (soundObject) await soundObject.unloadAsync();
      const audioRequire = SOUND_ASSETS[soundKey.toLowerCase()];
      if (!audioRequire) return;
      const { sound } = await Audio.Sound.createAsync(audioRequire);
      setSoundObject(sound);
      await sound.playAsync();
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    return soundObject ? () => { soundObject.unloadAsync(); } : undefined;
  }, [soundObject]);

  const handleStartTest = () => {
    setScore((s) => s + 1);
    setCurrentWordIndex((i) => (i + 1) % PHONICS_CURRICULUM.length);
    // Play a sound for correct answer, show confetti, etc. (future gamification)
  };

  const handleCustomizeAvatar = () => {
    console.log("Navigate to avatar customization screen");
    // This would typically navigate to a separate screen for avatar customization
  };

  const handleSelectAvatar = (avatar: string) => {
    setSelectedAvatar(avatar);
    console.log("Selected avatar:", avatar);
    // Save selected avatar to state or persistence
  };

  const handleProgressPress = () => console.log('Progress clicked');
  const handleGemsPress = () => console.log('Gems clicked');
  const handleRewardsPress = () => console.log('Rewards clicked');

  if (!fontsLoaded) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0288D1" />
      </View>
    );
  }

  const currentWord = PHONICS_CURRICULUM[currentWordIndex];

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar barStyle="dark-content" backgroundColor="#D8F3DC" />

      {/* CUSTOM HEADER AREA */}
      <LinearGradient colors={['#E8F5E9', '#C5E1A5']} style={styles.topHeader}>
        <View style={styles.headerLeft}>
          <Image source={require('./assets/sun_logo.png')} style={styles.sunIcon} />
          <View>
            <Text style={styles.brandTitle}>LANA PHONICS</Text>
            <Text style={styles.brandSub}>TESTER UK</Text>
          </View>
        </View>
        <View style={styles.avatarCustomizerContainer}>
          <AvatarCustomizer onCustomizePress={handleCustomizeAvatar} onAvatarSelect={handleSelectAvatar} />
        </View>
      </LinearGradient>

      {/* MAIN CONTENT DASHBOARD */}
      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        {(activeTab === 'Home') ? (
          <View style={[styles.dashboardGrid, isTablet && styles.dashboardTablet]}>
            {/* LEARN Section */}
            <View style={styles.learnSection}>
              <Text style={styles.sectionTitle}>LEARN</Text>
              <View style={styles.learnOptions}>
                <TouchableOpacity style={styles.optionCard} onPress={() => console.log("Roadmap Pressed")}>
                  <Image source={require('./assets/treehouse_phase2.png')} style={styles.roadmapIcon} />
                  <Image source={require('./assets/rocket_phase5.png')} style={styles.roadmapIcon} />
                  <Text style={styles.optionText}>Roadmap</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionCard} onPress={handleProgressPress}>
                  <Image source={require('./assets/icon_progress.png')} style={styles.optionIcon} />
                  <Text style={styles.optionText}>PROGRESS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionCard} onPress={handleGemsPress}>
                  <Image source={require('./assets/icon_gems.png')} style={styles.optionIcon} />
                  <Text style={styles.optionText}>GEMS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionCard} onPress={handleRewardsPress}>
                  <Image source={require('./assets/icon_rewards.png')} style={styles.optionIcon} />
                  <Text style={styles.optionText}>REWARDS</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* TEST Section */}
            <View style={styles.testSection}>
              <Text style={styles.sectionTitle}>TEST</Text>
              <Text style={styles.testWord}>{currentWord.word}</Text>
              <Text style={styles.scoreText}>{score}/{PHONICS_CURRICULUM.length}</Text>
              <Animated.Image source={require('./assets/zorgo_mascot.png')} style={[styles.mascot, { transform: [{ translateY: mascotAnim }] }]} />
              <TouchableOpacity style={styles.startTestButton} onPress={handleStartTest}>
                <Text style={styles.startTestButtonText}>START TEST</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : activeTab === 'Games' ? (
          <View style={styles.placeholderScreen}><Text style={styles.placeholderText}>Games Section</Text></View>
        ) : activeTab === 'Stories' ? (
          <View style={styles.placeholderScreen}><Text style={styles.placeholderText}>Stories Section</Text></View>
        ) : activeTab === 'My Stuff' ? (
          <View style={styles.placeholderScreen}><Text style={styles.placeholderText}>My Stuff Section</Text></View>
        ) : null}
      </ScrollView>

      {/* DOCK */}
      <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
}

registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9', // Soft landscape green background
  },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollBody: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 100,
  },
  dashboardGrid: { flexDirection: 'column', gap: 16 },
  dashboardTablet: { flexDirection: 'row', gap: 20 },

  // Custom Header Styles
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    position: 'relative', // For absolute positioning of AvatarCustomizer
    zIndex: 10,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  sunIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 8,
  },
  brandTitle: { fontSize: 20, fontFamily: 'Chewy-Regular', color: '#0288D1' },
  brandSub: { fontSize: 10, fontWeight: '800', color: '#FF6F00', marginTop: -2 },
  avatarCustomizerContainer: {
    position: 'absolute',
    right: 16,
    top: 12,
  },

  // Learn Section
  learnSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Chewy-Regular',
    color: '#8A2BE2',
    marginBottom: 10,
    textAlign: 'center',
  },
  learnOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 10,
  },
  optionCard: {
    backgroundColor: '#E0FFFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '48%',
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
    color: '#4682B4',
    marginTop: 5,
  },

  // Test Section
  testSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  testWord: {
    fontSize: 48,
    fontFamily: 'Chewy-Regular',
    color: '#FF4500',
    marginVertical: 10,
  },
  scoreText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  mascot: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  startTestButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  startTestButtonText: {
    fontSize: 24,
    fontFamily: 'Chewy-Regular',
    color: '#FFFFFF',
  },

  // Placeholder screen styles for other tabs
  placeholderScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  placeholderText: {
    fontSize: 24,
    fontFamily: 'Chewy-Regular',
    color: '#607D8B',
  },
});
