import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

export type TabType = 'Home' | 'Games' | 'Stories' | 'My Stuff';

interface NavigationBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const NAVIGATION_ICONS: Record<string, any> = {
  home: require('./assets/sun_logo.png'), // Using sun_logo.png as a placeholder for home
  games: require('./assets/nav_games.png'),
  stories: require('./assets/nav_stories.png'),
  stuff: require('./assets/nav_stuff.png'),
};

export default function NavigationBar({ activeTab, setActiveTab }: NavigationBarProps) {
  const tabs: { key: TabType; icon: any; label: string }[] = [
    { key: 'Home', icon: NAVIGATION_ICONS.home, label: 'HOME' },
    { key: 'Games', icon: NAVIGATION_ICONS.games, label: 'GAMES' },
    { key: 'Stories', icon: NAVIGATION_ICONS.stories, label: 'STORIES' },
    { key: 'My Stuff', icon: NAVIGATION_ICONS.stuff, label: 'MY STUFF' },
  ];

  return (
    <View style={styles.bottomDock}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.dockItem, isActive && styles.dockActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Image source={tab.icon} style={styles.dockIcon} />
            <Text style={styles.dockLabel}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomDock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75, // Increased height for icons and labels
    backgroundColor: '#8a2be2', // Blue violet
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 5,
    borderTopColor: '#6a0dad', // Darker blue violet
  },
  dockItem: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  dockActive: {
    backgroundColor: '#9370DB', // Medium Purple for active tab
  },
  dockIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 2,
  },
  dockLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});