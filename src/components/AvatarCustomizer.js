import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AvatarCustomizerStyles from '../styles/AvatarCustomizerStyles';

const AvatarCustomizer = () => {
    const [skinTone, setSkinTone] = useState('Light');
    const [hairStyle, setHairStyle] = useState('Short');

    const handleSaveAvatar = () => {
        console.log('Avatar Saved:', { skinTone, hairStyle });
        alert(`Avatar Saved: Skin Tone - ${skinTone}, Hair Style - ${hairStyle}`);
    };

    const getAvatarImageSource = () => {
        const imagePath = `../../assets/images/avatar_${skinTone.toLowerCase()}_${hairStyle.toLowerCase()}.png`;
        switch (imagePath) {
            case '../../assets/images/avatar_light_short.png':
                return require('../../assets/images/avatar_light_short.png');
            case '../../assets/images/avatar_light_long.png':
                return require('../../assets/images/avatar_light_long.png');
            case '../../assets/images/avatar_dark_short.png':
                return require('../../assets/images/avatar_dark_short.png');
            case '../../assets/images/avatar_dark_long.png':
                return require('../../assets/images/avatar_dark_long.png');
            default:
                return require('../../assets/images/avatar_light_short.png'); // Default image
        }
    };

    return (
        <View style={AvatarCustomizerStyles.container}>
            <Text style={AvatarCustomizerStyles.title}>AVATAR CUSTOMIZER</Text>
            <View style={AvatarCustomizerStyles.avatarPreview}>
                <Image 
                    source={getAvatarImageSource()}
                    style={AvatarCustomizerStyles.avatarPreview} // Reuse avatarPreview style for image dimensions
                />
            </View>

            <View style={AvatarCustomizerStyles.optionContainer}>
                <Text style={AvatarCustomizerStyles.optionLabel}>Skin Tone: {skinTone}</Text>
                <TouchableOpacity
                    style={AvatarCustomizerStyles.customizationButton}
                    onPress={() => setSkinTone(skinTone === 'Light' ? 'Dark' : 'Light')}
                >
                    <Text style={AvatarCustomizerStyles.customizationButtonText}>Change</Text>
                </TouchableOpacity>
            </View>

            <View style={AvatarCustomizerStyles.optionContainer}>
                <Text style={AvatarCustomizerStyles.optionLabel}>Hair Style: {hairStyle}</Text>
                <TouchableOpacity
                    style={AvatarCustomizerStyles.customizationButton}
                    onPress={() => setHairStyle(hairStyle === 'Short' ? 'Long' : 'Short')}
                >
                    <Text style={AvatarCustomizerStyles.customizationButtonText}>Change</Text>
                </TouchableOpacity>
            </View>

            <View style={AvatarCustomizerStyles.optionContainer}>
                <Text style={AvatarCustomizerStyles.optionLabel}>Eyes</Text>
                {/* Placeholder for a slider control */}
                <View style={AvatarCustomizerStyles.slider}><Text>Slider Placeholder</Text></View>
            </View>

            <TouchableOpacity
                style={AvatarCustomizerStyles.customizationButton}
                onPress={handleSaveAvatar}
            >
                <Text style={AvatarCustomizerStyles.customizationButtonText}>SAVE AVATAR</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = AvatarCustomizerStyles;

export default AvatarCustomizer;
