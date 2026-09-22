import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  ActivityIndicator,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { Audio } from 'expo-av';
import { registerRootComponent } from 'expo';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Chewy_400Regular } from '@expo-google-fonts/chewy';

import Header from './Header';
import RewardsBar from './RewardsBar';
import NavigationBar, { TabType } from './NavigationBar';

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
];

export default function App() {
  const [fontsLoaded] = useFonts({ 'Chewy-Regular': Chewy_400Regular });
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);

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

      {/* HEADER */}
      <Header onAvatarPress={(avatar) => console.log('Avatar pressed:', avatar)} />

      {/* MAIN CONTENT DASHBOARD */}
      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        {(activeTab === 'Home' || isTablet) ? (
          <View style={[styles.dashboardGrid, isTablet && styles.dashboardTablet]}>
            
            {/* --- LEARN CARD --- */}
            <View style={[styles.mainCard, styles.learnCard]}>
              <View style={[styles.cardHeaderBanner, styles.learnHeaderBanner]}>
                <Text style={styles.cardHeaderTitle}>LEARN</Text>
              </View>
              
              <Text style={styles.roadmapSub}>Phonics Roadmap</Text>

              {/* Path / Roadmap Graphic View */}
              <View style={styles.roadmapFlow}>
                <View style={styles.phaseBadgeContainer}>
                  <View style={styles.illustrationCircle}>
                    <Text style={{ fontSize: 40 }}>🏡</Text>
                  </View>
                  <Text style={styles.phaseText}>Phase 2</Text>
                </View>

                {/* Dashed connector path */}
                <View style={styles.pathDashedLine} />

                <View style={styles.phaseBadgeContainer}>
                  <View style={[styles.illustrationCircle, styles.activePhaseCircle]}>
                    <Text style={{ fontSize: 40 }}>🚀</Text>
                  </View>
                  <Text style={styles.phaseText}>Phase 5</Text>
                </View>
              </View>

              <RewardsBar
                onProgressPress={() => setActiveTab('Learn')}
                onGemsPress={() => console.log('Gems clicked')}
                onRewardsPress={() => console.log('Rewards clicked')}
              />
            </View>

            {/* --- TEST CARD --- */}
            <View style={[styles.mainCard, styles.testCard]}>
              <View style={[styles.cardHeaderBanner, styles.testHeaderBanner]}>
                <Text style={styles.cardHeaderTitle}>TEST</Text>
              </View>

              {/* Word Card & Score Gauge */}
              <View style={styles.testDisplayContainer}>
                <View style={styles.wordDisplayCard}>
                  <Text style={styles.wordDisplayText}>{currentWord.word}</Text>
                  <View style={styles.phonemeRow}>
                    {currentWord.segments.map((seg, i) => (
                      <View key={i} style={styles.segmentDotLine}>
                        <Text style={styles.segText}>{seg.text}</Text>
                        {seg.type === 'dot' ? (
                          <View style={styles.pDot} />
                        ) : (
                          <View style={styles.pLine} />
                        )}
                      </View>
                    ))}
                  </View>
                </View>

                {/* Score Dial */}
                <View style={styles.scoreGaugeRing}>
                  <Text style={styles.scoreGaugeText}>{score}</Text>
                  <Text style={styles.scoreGaugeTotal}>/ 40</Text>
                </View>
              </View>

              {/* Mascot & Play Action Area */}
              <View style={styles.mascotArea}>
                <Animated.View style={[styles.mascotWrapper, { transform: [{ translateY: mascotAnim }] }]}>
                  <View style={styles.mascotAvatarCircle}>
                    <Text style={{ fontSize: 52 }}>👽</Text>
                  </View>
                  <View style={styles.speechBubble}>
                    <Text style={styles.speechText}>Hi! I'm Zorgo!</Text>
                  </View>
                </Animated.View>

                <View style={styles.actionColumn}>
                  <TouchableOpacity style={styles.micCircleBtn} onPress={() => playSound(currentWord.word)}>
                    <Text style={{ fontSize: 24, color: '#FFFFFF' }}>🎤</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.startTestBtn} 
                    onPress={() => {
                      setScore((s) => s + 1);
                      setCurrentWordIndex((i) => (i + 1) % PHONICS_CURRICULUM.length);
                    }}
                  >
                    <Text style={styles.startTestText}>START TEST</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
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

  /* --- CARDS DESIGN (Depth & Soft Borders) --- */
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    borderWidth: 4,
    padding: 20,
    marginBottom: 16,
    // Soft shadow/elevation layer
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  learnCard: { borderColor: '#FFF176', flex: 1 },
  testCard: { borderColor: '#B2EBF2', flex: 1 },

  cardHeaderBanner: {
    alignSelf: 'center',
    paddingHorizontal: 36,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: -34,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  learnHeaderBanner: { backgroundColor: '#FFD54F' },
  testHeaderBanner: { backgroundColor: '#4FC3F7' },
  cardHeaderTitle: { fontSize: 22, fontFamily: 'Chewy-Regular', color: '#37474F', letterSpacing: 1 },

  roadmapSub: { textAlign: 'center', fontSize: 16, fontWeight: '700', color: '#78909C', marginBottom: 12 },

  /* Roadmap / Path Illustration */
  roadmapFlow: { 
    flexDirection: 'row', 
    justify: 'center', 
    alignItems: 'center', 
    marginVertical: 12,
    position: 'relative',
  },
  phaseBadgeContainer: { alignItems: 'center', zIndex: 2 },
  illustrationCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F1F8E9',
    borderWidth: 3,
    borderColor: '#C8E6C9',
    justify: 'center',
    alignItems: 'center',
  },
  activePhaseCircle: {
    backgroundColor: '#E1F5FE',
    borderColor: '#29B6F6',
    borderWidth: 4,
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

  /* Test Card Displays */
  testDisplayContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  wordDisplayCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#E0F7FA',
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingVertical: 14,
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  wordDisplayText: { fontSize: 42, fontFamily: 'Chewy-Regular', color: '#263238' },
  phonemeRow: { flexDirection: 'row', marginTop: 4, gap: 6 },
  segmentDotLine: { alignItems: 'center' },
  segText: { fontSize: 16, fontWeight: '800', color: '#37474F' },
  pDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF7043', marginTop: 4 },
  pLine: { width: 22, height: 4, borderRadius: 2, backgroundColor: '#FF7043', marginTop: 4 },

  /* Score Gauge Dial */
  scoreGaugeRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#FF7043',
    backgroundColor: '#FFF',
    justify: 'center',
    alignItems: 'center',
    marginLeft: 14,
    shadowColor: '#FF7043',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  scoreGaugeText: { fontSize: 18, fontWeight: '900', color: '#D84315' },
  scoreGaugeTotal: { fontSize: 10, fontWeight: '700', color: '#B0BEC5' },

  /* Mascot & Interactions */
  mascotArea: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  mascotWrapper: { flexDirection: 'row', alignItems: 'center' },
  mascotAvatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#C8E6C9',
    justify: 'center',
    alignItems: 'center',
  },
  speechBubble: { 
    backgroundColor: '#F1F8E9', 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 16, 
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#DCEDC8',
  },
  speechText: { fontSize: 12, fontWeight: '800', color: '#33691E' },

  actionColumn: { alignItems: 'center', gap: 8 },
  micCircleBtn: { 
    backgroundColor: '#FF7043', 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    justify: 'center', 
    alignItems: 'center',
    shadowColor: '#FF7043',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  startTestBtn: { 
    backgroundColor: '#FF7043', 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    borderRadius: 24,
    shadowColor: '#D84315',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  startTestText: { color: '#FFFFFF', fontWeight: '900', fontSize: 13, letterSpacing: 0.5 },
});