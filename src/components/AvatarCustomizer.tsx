import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

interface AvatarCustomizerProps {
  onCustomizePress: () => void;
  onAvatarSelect: (avatar: string) => void;
}

const AvatarCustomizer: React.FC<AvatarCustomizerProps> = ({ onCustomizePress, onAvatarSelect }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onAvatarSelect('fox')} style={styles.avatarButton}>
        <Image source={require('../../assets/avatar_fox.png')} style={styles.avatarImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onAvatarSelect('owl')} style={styles.avatarButton}>
        <Image source={require('../../assets/avatar_owl.png')} style={styles.avatarImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onAvatarSelect('robot')} style={styles.avatarButton}>
        <Image source={require('../../assets/avatar_robot.png')} style={styles.avatarImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onCustomizePress} style={styles.customizeButton}>
        <Text style={styles.customizeButtonText}>CUSTOMIZE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // Removed explicit background, padding, and shadow to blend with parent header
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  customizeButton: {
    marginLeft: 10,
    backgroundColor: '#66BB6A',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: '#388E3C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  customizeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default AvatarCustomizer;
