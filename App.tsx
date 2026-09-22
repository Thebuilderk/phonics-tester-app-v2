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
  Modal,
  TextInput,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { Audio } from 'expo-av';
import { registerRootComponent } from 'expo';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Chewy_400Regular } from '@expo-google-fonts/chewy';

// IMPORT CUSTOM COMPONENTS FROM ROOT DIRECTORY
import Header from './Header';
import RewardsBar from './RewardsBar';
import NavigationBar, { TabType } from './NavigationBar';

SplashScreen.preventAutoHideAsync();

// STATIC AUDIO REGISTRY
const SOUND_ASSETS: { [key: string]: any } = {
  alien: require('./assets/sounds/alien.mp3'),
  arrow: require('./assets/sounds/arrow.mp3'),
  back: require('./assets/sounds/back.mp3'),
  bar: require('./assets/sounds/bar.mp3'),
  beak: require('./assets/sounds/beak.mp3'),
  blast: require('./assets/sounds/blast.mp3'),
  blot: require('./assets/sounds/blot.mp3'),
  boom: require('./assets/sounds/boom.mp3'),
  chapter: require('./assets/sounds/chapter.mp3'),
  chase: require('./assets/sounds/chase.mp3'),
  check: require('./assets/sounds/check.mp3'),
  chess: require('./assets/sounds/chess.mp3'),
  chin: require('./assets/sounds/chin.mp3'),
  chip: require('./assets/sounds/chip.mp3'),
  chop: require('./assets/sounds/chop.mp3'),
  clean: require('./assets/sounds/clean.mp3'),
  coin: require('./assets/sounds/coin.mp3'),
  crab: require('./assets/sounds/crab.mp3'),
  crack: require('./assets/sounds/crack.mp3'),
  deck: require('./assets/sounds/deck.mp3'),
  dolphin: require('./assets/sounds/dolphin.mp3'),
  dress: require('./assets/sounds/dress.mp3'),
  drill: require('./assets/sounds/drill.mp3'),
  drink: require('./assets/sounds/drink.mp3'),
  gloom: require('./assets/sounds/gloom.mp3'),
  grateful: require('./assets/sounds/grateful.mp3'),
  high: require('./assets/sounds/high.mp3'),
  hill: require('./assets/sounds/hill.mp3'),
  kick: require('./assets/sounds/kick.mp3'),
  lock: require('./assets/sounds/lock.mp3'),
  phope: require('./assets/sounds/phope.mp3'),
  pumpkin: require('./assets/sounds/pumpkin.mp3'),
  quog: require('./assets/sounds/quog.mp3'),
  shark: require('./assets/sounds/shark.mp3'),
  shed: require('./assets/sounds/shed.mp3'),
  shell: require('./assets/sounds/shell.mp3'),
  shin: require('./assets/sounds/shin.mp3'),
  shop: require('./assets/sounds/shop.mp3'),
  sing: require('./assets/sounds/sing.mp3'),
  thankful: require('./assets/sounds/thankful.mp3'),
  vanish: require('./assets/sounds/vanish.mp3'),
  white: require('./assets/sounds/white.mp3'),
  zoom: require('./assets/sounds/zoom.mp3'),
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
  definition?: string;
  wordClass?: string;
}

const PHONICS_CURRICULUM: PhonicsWord[] = [
  { id: 1, word: 'chin', isAlien: false, phonicsType: 'Digraph ch', phase: 3, segments: [{ text: 'ch', type: 'line' }, { text: 'i', type: 'dot' }, { text: 'n', type: 'dot' }], definition: 'The bottom part of your face below your mouth.', wordClass: 'Noun' },
  { id: 2, word: 'quog', isAlien: true, phonicsType: 'Alien Word', phase: 3, segments: [{ text: 'qu', type: 'line' }, { text: 'o', type: 'dot' }, { text: 'g', type: 'dot' }] },
  { id: 3, word: 'shark', isAlien: false, phonicsType: 'Digraph sh / ar', phase: 3, segments: [{ text: 'sh', type: 'line' }, { text: 'ar', type: 'line' }, { text: 'k', type: 'dot' }], definition: 'A large fish with sharp teeth that lives in the sea.', wordClass: 'Noun' },
  { id: 4, word: 'phope', isAlien: true, phonicsType: 'Split Digraph', phase: 5, segments: [{ text: 'ph', type: 'line' }, { text: 'o_e', type: 'line' }, { text: 'p', type: 'dot' }] },
  { id: 5, word: 'gloom', isAlien: false, phonicsType: 'Digraph oo', phase: 3, segments: [{ text: 'gl', type: 'line' }, { text: 'oo', type: 'line' }, { text: 'm', type: 'dot' }], definition: 'Partial or total darkness.', wordClass: 'Noun' },
  { id: 6, word: 'grateful', isAlien: false, phonicsType: 'Multi-syllable', phase: 5, segments: [{ text: 'gr', type: 'line' }, { text: 'a', type: 'dot' }, { text: 'te', type: 'line' }, { text: 'f', type: 'dot' }, { text: 'u', type: 'dot' }, { text: 'l', type: 'dot' }], definition: 'Feeling or showing thanks.', wordClass: 'Adjective' },
  { id: 7, word: 'dolphin', isAlien: false, phonicsType: 'Digraph ph', phase: 5, segments: [{ text: 'd', type: 'dot' }, { text: 'o', type: 'dot' }, { text: 'l', type: 'dot' }, { text: 'ph', type: 'line' }, { text: 'i', type: 'dot' }, { text: 'n', type: 'dot' }], definition: 'A smart sea mammal.', wordClass: 'Noun' },
  { id: 8, word: 'pumpkin', isAlien: false, phonicsType: 'Multi-syllable', phase: 4, segments: [{ text: 'p', type: 'dot' }, { text: 'u', type: 'dot' }, { text: 'm', type: 'dot' }, { text: 'p', type: 'dot' }, { text: 'k', type: 'dot' }, { text: 'i', type: 'dot' }, { text: 'n', type: 'dot' }], definition: 'A large round orange vegetable.', wordClass: 'Noun' },
];

export default function App() {
  const [fontsLoaded] = useFonts({ 'Chewy-Regular': Chewy_400Regular });
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);

  // Mascot Pulse Animation
  const mascotAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(mascotAnim, { toValue: 1.05, duration: 900, useNativeDriver: true }),
        Animated.timing(mascotAnim, { toValue: 1.0, duration: 900, useNativeDriver: true }),
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
      <StatusBar barStyle="dark-content" backgroundColor="#C5E1A5" />

      {/* REPLACED: TOP BRAND HEADER */}
      <Header onAvatarPress={(avatar) => console.log('Avatar pressed:', avatar)} />

      {/* MAIN CONTENT AREA */}
      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        {(activeTab === 'Home' || isTablet) ? (
          <View style={[styles.dashboardGrid, isTablet && styles.dashboardTablet]}>
            {/* LEARN SECTION CARD */}
            <View style={[styles.mainCard, styles.learnCard]}>
              <View style={styles.cardHeaderBanner}>
                <Text style={styles.cardHeaderTitle}>LEARN</Text>
              </View>
              <Text style={styles.roadmapSub}>Phonics Roadmap</Text>

              <View style={styles.roadmapFlow}>
                <View style={styles.phaseBadge}>
                  <Text style={{ fontSize: 28 }}>🌳</Text>
                  <Text style={styles.phaseText}>Phase 2</Text>
                </View>
                <Text style={styles.pathDot}>•••</Text>
                <View style={[styles.phaseBadge, styles.activePhase]}>
                  <Text style={{ fontSize: 28 }}>🚀</Text>
                  <Text style={styles.phaseText}>Phase 5</Text>
                </View>
              </View>

              {/* REPLACED: REWARDS & QUICK NAV BAR */}
              <RewardsBar
                onProgressPress={() => setActiveTab('Learn')}
                onGemsPress={() => console.log('Gems clicked')}
                onRewardsPress={() => console.log('Rewards clicked')}
              />
            </View>

            {/* TEST SECTION CARD */}
            <View style={[styles.mainCard, styles.testCard]}>
              <View style={[styles.cardHeaderBanner, styles.testHeaderBanner]}>
                <Text style={styles.cardHeaderTitle}>TEST</Text>
              </View>

              <View style={styles.testDisplayContainer}>
                <View style={styles.wordDisplayBox}>
                  <Text style={styles.wordDisplayText}>{currentWord.word}</Text>
                  <View style={styles.phonemeRow}>
                    {currentWord.segments.map((seg, i) => (
                      <View key={i} style={styles.segmentDotLine}>
                        <Text style={styles.segText}>{seg.text}</Text>
                        {seg.type === 'dot' ? <View style={styles.pDot} /> : <View style={styles.pLine} />}
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.scoreGauge}>
                  <Text style={styles.scoreGaugeText}>{score}</Text>
                  <Text style={styles.scoreGaugeTotal}>/ 40</Text>
                </View>
              </View>

              <View style={styles.mascotArea}>
                <Animated.View style={[styles.mascotWrapper, { transform: [{ scale: mascotAnim }] }]}>
                  <Text style={{ fontSize: 64 }}>👽</Text>
                  <View style={styles.speechBubble}>
                    <Text style={styles.speechText}>Hi! I'm Zorgo!</Text>
                  </View>
                </Animated.View>

                <View style={styles.actionColumn}>
                  <TouchableOpacity style={styles.micCircleBtn} onPress={() => playSound(currentWord.word)}>
                    <Text style={{ fontSize: 24 }}>🎤</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.startTestBtn} onPress={() => setActiveTab('Test')}>
                    <Text style={styles.startTestText}>START TEST</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ) : null}

        {/* DETAILED LEARN VIEW */}
        {activeTab === 'Learn' && !isTablet && (
          <View style={styles.fullTabContent}>
            <Text style={styles.sectionHeading}>Phonics Curriculum Lessons</Text>
            {PHONICS_CURRICULUM.map((item) => (
              <View key={item.id} style={styles.lessonItemCard}>
                <Text style={styles.lessonWord}>{item.word}</Text>
                <Text style={styles.lessonType}>{item.phonicsType} • Phase {item.phase}</Text>
                <TouchableOpacity style={styles.playBtn} onPress={() => playSound(item.word)}>
                  <Text style={styles.playBtnText}>🔊 Listen & Blend</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* DETAILED TEST VIEW */}
        {activeTab === 'Test' && !isTablet && (
          <View style={styles.fullTabContent}>
            <Text style={styles.sectionHeading}>Screening Check Mode</Text>
            <View style={styles.singleTestContainer}>
              <Text style={styles.bigWord}>{currentWord.word}</Text>
              <TouchableOpacity
                style={styles.actionBtnGreen}
                onPress={() => {
                  setScore((s) => s + 1);
                  setCurrentWordIndex((i) => (i + 1) % PHONICS_CURRICULUM.length);
                }}
              >
                <Text style={styles.btnTextWhite}>MARK CORRECT ✅</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* REPLACED: BOTTOM NAVIGATION DOCK */}
      <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
}

registerRootComponent(App);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E0F2F1' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollBody: { paddingHorizontal: 14, paddingTop: 14, paddingBottom: 90 },
  dashboardGrid: { flexDirection: 'column' },
  dashboardTablet: { flexDirection: 'row', justifyContent: 'space-between' },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 3,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },
  learnCard: { borderColor: '#FFF099', flex: 1, marginRight: Platform.OS === 'web' ? 6 : 0 },
  testCard: { borderColor: '#81D4FA', flex: 1, marginLeft: Platform.OS === 'web' ? 6 : 0 },
  cardHeaderBanner: {
    backgroundColor: '#FFD54F',
    alignSelf: 'center',
    paddingHorizontal: 28,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: -26,
    marginBottom: 8,
  },
  testHeaderBanner: { backgroundColor: '#4FC3F7' },
  cardHeaderTitle: { fontSize: 20, fontFamily: 'Chewy-Regular', color: '#37474F' },
  roadmapSub: { textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: '#78909C' },
  roadmapFlow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 16 },
  phaseBadge: { alignItems: 'center', backgroundColor: '#F5F5F5', padding: 10, borderRadius: 16 },
  activePhase: { backgroundColor: '#E3F2FD', borderWidth: 2, borderColor: '#29B6F6' },
  phaseText: { fontSize: 12, fontWeight: 'bold', color: '#37474F', marginTop: 4 },
  pathDot: { fontSize: 20, color: '#B0BEC5', marginHorizontal: 12 },
  testDisplayContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  wordDisplayBox: {
    borderWidth: 2,
    borderColor: '#B2EBF2',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    flex: 1,
  },
  wordDisplayText: { fontSize: 36, fontFamily: 'Chewy-Regular', color: '#263238' },
  phonemeRow: { flexDirection: 'row', marginTop: 4 },
  segmentDotLine: { alignItems: 'center', marginHorizontal: 4 },
  segText: { fontSize: 14, fontWeight: 'bold', color: '#37474F' },
  pDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FF7043', marginTop: 2 },
  pLine: { width: 16, height: 4, borderRadius: 2, backgroundColor: '#FF7043', marginTop: 2 },
  scoreGauge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: '#FF7043',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  scoreGaugeText: { fontSize: 16, fontWeight: 'bold', color: '#D84315' },
  scoreGaugeTotal: { fontSize: 9, color: '#78909C' },
  mascotArea: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 },
  mascotWrapper: { flexDirection: 'row', alignItems: 'center' },
  speechBubble: { backgroundColor: '#E8F5E9', padding: 8, borderRadius: 12, marginLeft: 6 },
  speechText: { fontSize: 10, fontWeight: 'bold', color: '#2E7D32' },
  actionColumn: { alignItems: 'center' },
  micCircleBtn: { backgroundColor: '#FF7043', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  startTestBtn: { backgroundColor: '#FF7043', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
  startTestText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 },
  fullTabContent: { padding: 8 },
  sectionHeading: { fontSize: 22, fontFamily: 'Chewy-Regular', color: '#37474F', marginBottom: 12 },
  lessonItemCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 2, borderColor: '#B2EBF2' },
  lessonWord: { fontSize: 24, fontFamily: 'Chewy-Regular', color: '#0288D1' },
  lessonType: { fontSize: 12, color: '#78909C' },
  playBtn: { marginTop: 8, backgroundColor: '#E0F7FA', padding: 8, borderRadius: 10, alignSelf: 'flex-start' },
  playBtnText: { color: '#00838F', fontWeight: 'bold', fontSize: 12 },
  singleTestContainer: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 30, alignItems: 'center' },
  bigWord: { fontSize: 48, fontFamily: 'Chewy-Regular', color: '#37474F', marginBottom: 20 },
  actionBtnGreen: { backgroundColor: '#66BB6A', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 20 },
  btnTextWhite: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
});