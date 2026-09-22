import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export type TabType = 'Home' | 'Learn' | 'Test' | 'Profile';

interface NavigationBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function NavigationBar({ activeTab, setActiveTab }: NavigationBarProps) {
  const tabs: { key: TabType; icon: string; label: string }[] = [
    { key: 'Home', icon: '🏡', label: 'HOME' },
    { key: 'Learn', icon: '🎮', label: 'GAMES' },
    { key: 'Test', icon: '📖', label: 'STORIES' },
    { key: 'Profile', icon: '🎒', label: 'MY STUFF' },
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
            <Text style={styles.dockIcon}>{tab.icon}</Text>
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
    height: 65,
    backgroundColor: '#FFF8E1',
    flexDirection: 'row',
    justify: 'space-around',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#FFE082',
  },
  dockItem: { alignItems: 'center', padding: 6, borderRadius: 12 },
  dockActive: { backgroundColor: '#FFE082' },
  dockIcon: { fontSize: 18 },
  dockLabel: { fontSize: 9, fontWeight: '800', color: '#8D6E63', marginTop: 2 },
});