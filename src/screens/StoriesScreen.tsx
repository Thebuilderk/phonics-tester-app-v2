import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';

interface StoriesScreenProps {
  onNavigate?: (screen: any) => void;
}

const STORIES = [
  { 
    id: '1', 
    title: "BEN'S BIG DAY", 
    focus: "Short 'e' Focus", 
    rating: "4/5", 
    border: '#3B82F6', 
    icon: require('../../assets/images/cat_image.png') 
  },
  { 
    id: '2', 
    title: "THE FOX AND THE BOX", 
    focus: "Short 'o' Focus", 
    rating: "4/5", 
    border: '#22C55E', 
    icon: require('../../assets/avatar_fox.png') 
  },
  { 
    id: '3', 
    title: "CATS IN HATS", 
    focus: "Short 'a' Focus", 
    isNew: true, 
    border: '#06B6D4', 
    icon: require('../../assets/images/cat_image.png') 
  },
  { 
    id: '4', 
    title: "PIGS CAN DIG", 
    focus: "Short 'i' Focus", 
    border: '#EF4444', 
    icon: require('../../assets/sun_logo.png') 
  },
  { 
    id: '5', 
    title: "HOP ON A BUS", 
    focus: "Short 'u' Focus", 
    border: '#84CC16', 
    icon: require('../../assets/sun_logo.png') 
  },
  { 
    id: '6', 
    title: "ZACK'S SNACK", 
    focus: "'z', 'ck' Focus", 
    border: '#EAB308', 
    icon: require('../../assets/avatar_owl.png') 
  },
];

export default function StoriesScreen({ onNavigate }: StoriesScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {onNavigate && (
          <TouchableOpacity style={styles.homeBtn} onPress={() => onNavigate('HOME')}>
            <Text style={styles.homeText}>🏠 HOME</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>PHONICS STORIES 📚</Text>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {STORIES.map((story) => (
          <TouchableOpacity 
            key={story.id} 
            style={[styles.storyCard, { borderColor: story.border }]}
            onPress={() => console.log(`Selected story: ${story.title}`)}
          >
            <Image source={story.icon} style={styles.storyIcon} />
            <Text style={styles.storyTitle}>{story.title}</Text>
            <Text style={styles.storyFocus}>{story.focus}</Text>
            {story.isNew && (
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>NEW!</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  homeBtn: {
    backgroundColor: '#0284C7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 12,
  },
  homeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0369A1',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-around',
    paddingBottom: 80,
  },
  storyCard: {
    width: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 3,
    padding: 12,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storyIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  storyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 4,
  },
  storyFocus: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
});