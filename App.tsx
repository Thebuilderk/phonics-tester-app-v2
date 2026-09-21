import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Audio } from 'expo-av';
import { registerRootComponent } from 'expo';

// STATIC AUDIO REGISTRY (Expo requires static require calls for local assets)
const SOUND_ASSETS: { [key: string]: any } = {
  // Add your sound key and filename mappings here:
  bell: require('./assets/sounds/bell.wav'),
  dog: require('./assets/sounds/dog.wav'),
  // fin: require('./assets/sounds/fin.mp3'),
};

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);

  // Play audio asset function
  async function playSound(soundKey: string) {
    try {
      // Unload previous sound if playing
      if (soundObject) {
        await soundObject.unloadAsync();
      }

      const audioRequire = SOUND_ASSETS[soundKey];
      if (!audioRequire) {
        console.warn(`Sound '${soundKey}' not found in SOUND_ASSETS registry.`);
        return;
      }

      const { sound } = await Audio.Sound.createAsync(audioRequire);
      setSoundObject(sound);
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  // Cleanup sound on unmount
  useEffect(() => {
    return soundObject
      ? () => {
          soundObject.unloadAsync();
        }
      : undefined;
  }, [soundObject]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E0F7FA" />

      {/* HEADER SECTION */}
      <View style={styles.header}>
        <View style={styles.mascotContainer}>
          <Text style={styles.mascotText}>☀️</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>LANA PHONICS</Text>
          <Text style={styles.appSubtitle}>TESTER</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton} activeOpacity={0.7}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* CORE CONTENT CARDS */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* CARD 1: LEARN & PLAY (Tap to play sound) */}
        <TouchableOpacity
          style={[styles.card, styles.cardYellow]}
          activeOpacity={0.85}
          onPress={() => playSound('bell')}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardEmojiGroup}>🧸 🚀 ⚽</Text>
            <Text style={styles.cardMascot}>🦊</Text>
          </View>
          <Text style={styles.cardTitle}>Learn & Play</Text>
          <Text style={styles.cardDescription}>
            Interactive phonics lessons, sound matching & fun games! (Tap to hear sound)
          </Text>
          <View style={[styles.ctaButton, styles.ctaYellow]}>
            <Text style={styles.ctaTextDark}>LISTEN 🔊</Text>
          </View>
        </TouchableOpacity>

        {/* CARD 2: STORY TIME */}
        <TouchableOpacity
          style={[styles.card, styles.cardGreen]}
          activeOpacity={0.85}
          onPress={() => playSound('dog')}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardEmojiGroup}>📖 🌙 ⭐</Text>
            <Text style={styles.cardMascot}>🦉</Text>
          </View>
          <Text style={styles.cardTitle}>Story Time</Text>
          <Text style={styles.cardDescription}>
            Read-along phonics adventures & bedtime story journeys.
          </Text>
          <View style={[styles.ctaButton, styles.ctaGreen]}>
            <Text style={styles.ctaTextLight}>READ NOW ➔</Text>
          </View>
        </TouchableOpacity>

        {/* CARD 3: MY PROGRESS */}
        <TouchableOpacity
          style={[styles.card, styles.cardBlue]}
          activeOpacity={0.85}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardEmojiGroup}>🎨 🖌️ ✨</Text>
            <Text style={styles.cardMascot}>🦕</Text>
          </View>
          <Text style={styles.cardTitle}>My Progress</Text>
          <Text style={styles.cardDescription}>
            Track mastered sounds, collect stars & unlock badges!
          </Text>
          <View style={[styles.ctaButton, styles.ctaBlue]}>
            <Text style={styles.ctaTextLight}>EXPLORE ➔</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* BOTTOM NAVIGATION DOCK */}
      <View style={styles.bottomDock}>
        <TouchableOpacity
          style={[styles.navItem, activeTab === 'Home' && styles.navItemActive]}
          onPress={() => setActiveTab('Home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={[styles.navLabel, activeTab === 'Home' && styles.navLabelActive]}>
            HOME
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'Games' && styles.navItemActive]}
          onPress={() => setActiveTab('Games')}
        >
          <Text style={styles.navIcon}>🎮</Text>
          <Text style={[styles.navLabel, activeTab === 'Games' && styles.navLabelActive]}>
            GAMES
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'Stories' && styles.navItemActive]}
          onPress={() => setActiveTab('Stories')}
        >
          <Text style={styles.navIcon}>📚</Text>
          <Text style={[styles.navLabel, activeTab === 'Stories' && styles.navLabelActive]}>
            STORIES
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'My Stuff' && styles.navItemActive]}
          onPress={() => setActiveTab('My Stuff')}
        >
          <Text style={styles.navIcon}>🎒</Text>
          <Text style={[styles.navLabel, activeTab === 'My Stuff' && styles.navLabelActive]}>
            MY STUFF
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#B2EBF2',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  mascotContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF9C4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotText: { fontSize: 26 },
  titleContainer: { alignItems: 'center' },
  appTitle: { fontSize: 20, fontWeight: '900', color: '#0288D1', letterSpacing: 1 },
  appSubtitle: { fontSize: 14, fontWeight: '800', color: '#FF6F00', letterSpacing: 2 },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingsIcon: { fontSize: 20 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardYellow: { borderColor: '#FFD54F' },
  cardGreen: { borderColor: '#81C784' },
  cardBlue: { borderColor: '#64B5F6' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cardEmojiGroup: { fontSize: 22 },
  cardMascot: { fontSize: 32 },
  cardTitle: { fontSize: 22, fontWeight: '900', color: '#37474F', marginBottom: 6 },
  cardDescription: { fontSize: 14, fontWeight: '600', color: '#78909C', lineHeight: 20, marginBottom: 16 },
  ctaButton: { borderRadius: 30, paddingVertical: 12, alignItems: 'center', justifyContent: 'center' },
  ctaYellow: { backgroundColor: '#FFCA28' },
  ctaGreen: { backgroundColor: '#66BB6A' },
  ctaBlue: { backgroundColor: '#42A5F5' },
  ctaTextDark: { fontSize: 16, fontWeight: '900', color: '#3E2723', letterSpacing: 1 },
  ctaTextLight: { fontSize: 16, fontWeight: '900', color: '#FFFFFF', letterSpacing: 1 },
  bottomDock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: '#FFF8E1',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#FFE082',
    paddingBottom: 10,
    elevation: 10,
  },
  navItem: { alignItems: 'center', justifyContent: 'center', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16 },
  navItemActive: { backgroundColor: '#FFE082' },
  navIcon: { fontSize: 22, marginBottom: 2 },
  navLabel: { fontSize: 10, fontWeight: '800', color: '#8D6E63' },
  navLabelActive: { color: '#E65100' },
});