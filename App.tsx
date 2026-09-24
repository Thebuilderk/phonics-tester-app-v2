import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Chewy_400Regular } from '@expo-google-fonts/chewy';
import { registerRootComponent } from 'expo';
import { RegisterClientLocalizations, translations } from './src/utils/i18n';

import HomeScreen from './src/screens/HomeScreen'; // Import the HomeScreen

SplashScreen.preventAutoHideAsync();

RegisterClientLocalizations({ translations });

// Error Boundary Component
class ErrorBoundary extends React.Component<any, { hasError: boolean; error: Error | null }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <SafeAreaView style={styles.errorContainer}>
          <Text style={styles.errorTextTitle}>Oops! Something went wrong.</Text>
          <Text style={styles.errorText}>
            The application encountered an unexpected error. Please try restarting the app.
          </Text>
          {this.state.error && (
            <View style={styles.errorDetails}>
              <Text style={styles.errorText}>{this.state.error.toString()}</Text>
              {/* <Text style={styles.errorText}>{this.state.errorInfo.componentStack}</Text> */}
            </View>
          )}
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  const [fontsLoaded] = useFonts({ 'Chewy-Regular': Chewy_400Regular });

  const onLayoutRootView = async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0288D1" />
      </View>
    );
  }

  return (
    <ImageBackground source={require('./assets/bg_landscape.png')} style={styles.background}>
      <StatusBar barStyle="dark-content" backgroundColor="#D8F3DC" />
      <ErrorBoundary>
        <HomeScreen />
      </ErrorBoundary>
    </ImageBackground>
  );
}

registerRootComponent(App);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEBEE', // Light red for error
    padding: 20,
  },
  errorTextTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D32F2F', // Dark red
    marginBottom: 10,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#F44336', // Red
    textAlign: 'center',
    marginBottom: 5,
  },
  errorDetails: {
    marginTop: 20,
    backgroundColor: '#FFCDD2', // Lighter red
    padding: 10,
    borderRadius: 5,
  },
});
