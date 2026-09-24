import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import GamesScreen from './src/screens/GamesScreen';
import LearnRoadmapScreen from './src/screens/LearnRoadmapScreen';
import StoriesScreen from './src/screens/StoriesScreen';

import ProgressScreen from './src/screens/ProgressScreen';
import RewardsScreen from './src/screens/RewardsScreen';
import TestScreen from './src/screens/TestScreen';
import BottomNavigationBar from './src/components/BottomNavigationBar';

export type ScreenName = 
  | 'HOME' 
  | 'GAMES' 
  | 'LEARN_ROADMAP' 
  | 'STORIES' 
  | 'PROGRESS' 
  | 'REWARDS'
  | 'TEST';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('HOME');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'HOME':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'GAMES':
        return <GamesScreen onNavigate={setCurrentScreen} />;
      case 'LEARN_ROADMAP':
        return <LearnRoadmapScreen onNavigate={setCurrentScreen} />;
      case 'STORIES':
        return <StoriesScreen onNavigate={setCurrentScreen} />;
      case 'PROGRESS':
        return <ProgressScreen onNavigate={setCurrentScreen} />;
      case 'REWARDS':
        return <RewardsScreen onNavigate={setCurrentScreen} />;
      case 'TEST':
        return <TestScreen onNavigate={setCurrentScreen} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>
      <BottomNavigationBar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#87CEEB' },
  content: { flex: 1 },
});