import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

export type TabType = 'Home' | 'Games' | 'Stories' | 'My Stuff';

interface NavigationBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function NavigationBar({ activeTab, setActiveTab }: NavigationBarProps) {
  const tabs: { key: TabType; icon: any; label: string }[] = [
    { key: 'Home', icon: require('./assets/assets/nav_home.png'), label: 'HOME' },
    { key: 'Games', icon: require('./assets/assets/nav_games.png'), label: 'GAMES' },
    { key: 'Stories', icon: require('./assets/assets/nav_stories.png'), label: 'STORIES' },
    { key: 'My Stuff', icon: require('./assets/assets/nav_stuff.png'), label: 'MY STUFF' },
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