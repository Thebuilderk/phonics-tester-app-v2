import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import HomeScreenStyles from '../styles/HomeScreenStyles';
import AvatarCustomizer from '../components/AvatarCustomizer';
import LearnRoadmap from '../components/LearnRoadmap';
import PhonicsChallenge from '../components/PhonicsChallenge';
import BottomNavigationBar from '../components/BottomNavigationBar';

const HomeScreen = () => {
    return (
        <SafeAreaView style={[HomeScreenStyles.safeArea, localStyles.fillScreen]}>
            <ScrollView 
                style={HomeScreenStyles.container}
                contentContainerStyle={localStyles.scrollContent}
            >
                {/* Header for LEARN/TEST */}
                <View style={HomeScreenStyles.headerTabs}>
                    <TouchableOpacity style={HomeScreenStyles.headerTab}>
                        <Text style={HomeScreenStyles.headerTabText}>LEARN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[HomeScreenStyles.headerTab, HomeScreenStyles.headerTabActive]}>
                        <Text style={HomeScreenStyles.headerTabText}>TEST</Text>
                    </TouchableOpacity>
                    <View style={HomeScreenStyles.avatarCustomizerWrapper}>
                        <AvatarCustomizer />
                    </View>
                </View>

                {/* Main Content Area */}
                <View style={HomeScreenStyles.contentArea}>
                    <LearnRoadmap />
                    <PhonicsChallenge />
                </View>
            </ScrollView>
            <BottomNavigationBar />
        </SafeAreaView>
    );
};

const localStyles = StyleSheet.create({
    fillScreen: {
        flex: 1,
        height: '100%',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 80, // Prevents bottom navigation bar from overlapping content
    },
});

export default HomeScreen;
