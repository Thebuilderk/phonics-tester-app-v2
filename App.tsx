import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { registerRootComponent } from 'expo';

// ── Types ──────────────────────────────────────────────
interface Sound {
  id: string;
  grapheme: string;
  phoneme: string;
  phonemeIpa: string;
  type: string;
  keywords: string[];
  exampleWords: { word: string; blendingPriority: number }[];
  commonConfusions: string[];
  troubleshootingTip: string;
}

interface PhraseSet {
  id: string;
  setNumber: number;
  label: string;
  sounds: Sound[];
}

interface Phase {
  label: string;
  sets: PhraseSet[];
}

// ── Data (from phonics-phase1-2-structure.json) ────────
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
};

// Placeholder for an asset. In a real app, this would be a local image file.
const adventureSunIcon = 'https://via.placeholder.com/40x40/FFD700/FFFFFF?text=☀️';
const bookIcon = 'https://via.placeholder.com/60x60/7CFC00/FFFFFF?text=📖';
const castleIcon = 'https://via.placeholder.com/60x60/FFD700/FFFFFF?text=🏰';
const trophyIcon = 'https://via.placeholder.com/60x60/D1C4E9/FFFFFF?text=🏆';

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
      size={24}
      color={isFocused ? COLORS.darkGray : COLORS.white}
    />
    <Text
      style={[
        styles.bottomNavItemLabel,
        { color: isFocused ? COLORS.darkGray : COLORS.white },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default function App() {
  const [activeTab, setActiveTab] = React.useState<'home' | 'games' | 'stories' | 'myStuff'>('home');

  // For now, we'll just log the tab change. In a full app, this would change the main content.
  const handleTabPress = (tab: 'home' | 'games' | 'stories' | 'myStuff') => {
    setActiveTab(tab);
    console.log(`Navigated to: ${tab}`);
  };

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
              size={28}
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
          onPress={() => console.log('Learn & Play Pressed')}
        />
        <CategoryCard
          title="Story Time"
          description="Read-along adventures & bedtime stories."
          backgroundColor={COLORS.sunshineYellow}
          icon={castleIcon}
          onPress={() => console.log('Story Time Pressed')}
        />
        <CategoryCard
          title="My Progress"
          description="Track your phonics journey!"
          backgroundColor={COLORS.pastelPurple}
          icon={trophyIcon}
          onPress={() => console.log('My Progress Pressed')}
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
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mascotIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  appWordmark: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    fontFamily: 'Chewy-Regular', // Placeholder for playful font
  },
  settingsIcon: {
    // No specific styles needed for MaterialCommunityIcons beyond size and color
  },
  contentFeed: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  contentFeedContainer: {
    alignItems: 'center',
  },
  card: {
    width: '95%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    resizeMode: 'contain',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.orange,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 70,
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  bottomNavItemLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default function App() {
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [selectedSet, setSelectedSet] = useState<PhraseSet | null>(null);
  const [selectedSound, setSelectedSound] = useState<Sound | null>(null);

  const renderPhaseItem = ({ item }: { item: Phase }) => (
    <TouchableOpacity
      style={[styles.listItem, selectedPhase?.label === item.label && styles.selectedListItem]}
      onPress={() => {
        setSelectedPhase(item);
        setSelectedSet(null);
        setSelectedSound(null);
      }}
    >
      <Text style={styles.listItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderSetItem = ({ item }: { item: PhraseSet }) => (
    <TouchableOpacity
      style={[styles.listItem, selectedSet?.id === item.id && styles.selectedListItem]}
      onPress={() => {
        setSelectedSet(item);
        setSelectedSound(null);
      }}
    >
      <Text style={styles.listItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderSoundItem = ({ item }: { item: Sound }) => (
    <TouchableOpacity
      style={[styles.listItem, selectedSound?.id === item.id && styles.selectedListItem]}
      onPress={() => setSelectedSound(item)}
    >
      <Text style={styles.listItemText}>{item.grapheme} {item.phoneme}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },

});

registerRootComponent(App);