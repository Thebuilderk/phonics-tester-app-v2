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
        <Image source={require('../assets/avatar_fox.png')} style={styles.avatarImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onAvatarSelect('owl')} style={styles.avatarButton}>
        <Image source={require('../assets/avatar_owl.png')} style={styles.avatarImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onAvatarSelect('robot')} style={styles.avatarButton}>
        <Image source={require('../assets/avatar_robot.png')} style={styles.avatarImage} />
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  avatarButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
