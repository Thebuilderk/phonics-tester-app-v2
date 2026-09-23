import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import HomeScreenStyles from '../styles/HomeScreenStyles';
import AvatarCustomizer from '../components/AvatarCustomizer';
import LearnRoadmap from '../components/LearnRoadmap';
import PhonicsChallenge from '../components/PhonicsChallenge';
import BottomNavigationBar from '../components/BottomNavigationBar';

// Placeholder Components - these will be fleshed out later


const HomeScreen = () => {
    return (
        <SafeAreaView style={HomeScreenStyles.safeArea}>
            <ScrollView style={HomeScreenStyles.container}>
                {/* Header for LEARN/TEST */}
                <View style={HomeScreenStyles.headerTabs}>
                    <TouchableOpacity style={HomeScreenStyles.headerTab}><Text style={HomeScreenStyles.headerTabText}>LEARN</Text></TouchableOpacity>
                    <TouchableOpacity style={[HomeScreenStyles.headerTab, HomeScreenStyles.headerTabActive]}><Text style={HomeScreenStyles.headerTabText}>TEST</Text></TouchableOpacity>
                    <View style={HomeScreenStyles.avatarCustomizerWrapper}><AvatarCustomizer /></View>
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

// Styles will be moved to a separate file later for better organization
const styles = HomeScreenStyles;

export default HomeScreen;
