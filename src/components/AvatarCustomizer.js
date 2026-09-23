import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AvatarCustomizerStyles from '../styles/AvatarCustomizerStyles';

const AVATAR_IMAGES = {
    'avatar_fox.png': require('../../assets/avatar_fox.png'),
    'avatar_owl.png': require('../../assets/avatar_owl.png'),
    'avatar_robot.png': require('../../assets/avatar_robot.png'),
};

const avatarKeys = Object.keys(AVATAR_IMAGES);

const AvatarCustomizer = ({ onCustomizePress, onAvatarSelect }) => {
    const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
    const selectedAvatarKey = avatarKeys[currentAvatarIndex];

    const handleNextAvatar = () => {
        const nextIndex = (currentAvatarIndex + 1) % avatarKeys.length;
        setCurrentAvatarIndex(nextIndex);
        if (onAvatarSelect) onAvatarSelect(avatarKeys[nextIndex]);
    };

    const handlePreviousAvatar = () => {
        const prevIndex = (currentAvatarIndex - 1 + avatarKeys.length) % avatarKeys.length;
        setCurrentAvatarIndex(prevIndex);
        if (onAvatarSelect) onAvatarSelect(avatarKeys[prevIndex]);
    };

    return (
        <View style={AvatarCustomizerStyles.container}>
            <Text style={AvatarCustomizerStyles.title}>AVATAR CUSTOMIZER</Text>
            <View style={AvatarCustomizerStyles.avatarPreview}>
                <Image 
                    source={AVATAR_IMAGES[selectedAvatarKey]}
                    style={AvatarCustomizerStyles.avatarImage}
                />
                <TouchableOpacity style={AvatarCustomizerStyles.arrowButtonLeft} onPress={handlePreviousAvatar}>
                    <Text style={AvatarCustomizerStyles.arrowButtonText}>&lt;</Text>
                </TouchableOpacity>
                <TouchableOpacity style={AvatarCustomizerStyles.arrowButtonRight} onPress={handleNextAvatar}>
                    <Text style={AvatarCustomizerStyles.arrowButtonText}>&gt;</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={AvatarCustomizerStyles.customizationButton}
                onPress={onCustomizePress || (() => console.log("Customize button pressed"))}
            >
                <Text style={AvatarCustomizerStyles.customizationButtonText}>CUSTOMIZE</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = AvatarCustomizerStyles; // Assuming this is imported for actual styles.

export default AvatarCustomizer;
