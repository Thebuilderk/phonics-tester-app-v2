import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PhonicsChallengeStyles from '../styles/PhonicsChallengeStyles';
import phonicsChallenges from '../data/phonicsChallenges';
import colors from '../styles/colors';
import { LOCAL_IMAGES } from '../utils/images';

const PhonicsChallenge = () => {
    const [score, setScore] = useState(0);
    const [challengeStarted, setChallengeStarted] = useState(false);
    const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect', or null
    const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
    const [currentChallenge, setCurrentChallenge] = useState(null);

    useEffect(() => {
        if (challengeStarted) {
            setCurrentChallenge(phonicsChallenges[currentChallengeIndex]);
        }
    }, [challengeStarted, currentChallengeIndex]);

    const startChallenge = () => {
        setChallengeStarted(true);
        setScore(0);
        setCurrentChallengeIndex(0);
        setFeedback(null);
        console.log('Phonics challenge started!');
    };

    const handleAnswer = (selectedAnswer) => {
        if (!currentChallenge) return;

        if (selectedAnswer === currentChallenge.correctAnswer) {
            setScore(score + 10);
            setFeedback('correct');
            alert('Correct!');
        } else {
            setFeedback('incorrect');
            alert('Incorrect! Try again.');
        }

        setTimeout(() => {
            const nextIndex = currentChallengeIndex + 1;
            if (nextIndex < phonicsChallenges.length) {
                setCurrentChallengeIndex(nextIndex);
                setFeedback(null);
            } else {
                alert(`Challenge Complete! Your final score is ${score + (selectedAnswer === currentChallenge.correctAnswer ? 10 : 0)}`);
                setChallengeStarted(false);
            }
        }, 1000);
    };

    // Helper function to map challenge images safely
    const getChallengeImageSource = (imageKey) => {
        if (imageKey && imageKey.includes('cat')) return LOCAL_IMAGES.cat;
        if (imageKey && imageKey.includes('dog')) return LOCAL_IMAGES.dog;
        return LOCAL_IMAGES.cat; // Fallback image
    };

    return (
        <View style={PhonicsChallengeStyles.container}>
            <Text style={PhonicsChallengeStyles.title}>PHONICS CHALLENGE</Text>
            <View style={[PhonicsChallengeStyles.cardContainer, PhonicsChallengeStyles.challengeCard]}>
                <View style={[PhonicsChallengeStyles.badgeBanner, { right: 0, backgroundColor: colors.softOrange }]}>
                    <Text style={PhonicsChallengeStyles.badgeBannerText}>CHALLENGE</Text>
                </View>
                {challengeStarted && currentChallenge ? (
                    <>
                        <Image
                            source={getChallengeImageSource(currentChallenge.image)}
                            style={{ width: 100, height: 100, marginBottom: 10 }}
                        />
                        <Text style={PhonicsChallengeStyles.challengeText}>{currentChallenge.word}</Text>

                        <View style={PhonicsChallengeStyles.scoreContainer}>
                            <Text style={PhonicsChallengeStyles.scoreText}>
                                SCORE: {score}/{(phonicsChallenges.length * 10)}
                            </Text>
                            {feedback === 'correct' && (
                                <Text style={[PhonicsChallengeStyles.feedbackIcon, PhonicsChallengeStyles.correctFeedback]}>✅</Text>
                            )}
                            {feedback === 'incorrect' && (
                                <Text style={[PhonicsChallengeStyles.feedbackIcon, PhonicsChallengeStyles.incorrectFeedback]}>❌</Text>
                            )}
                        </View>

                        <View style={PhonicsChallengeStyles.buttonContainer}>
                            {currentChallenge.options.map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={PhonicsChallengeStyles.pillButton}
                                    onPress={() => handleAnswer(option)}
                                >
                                    <Text style={PhonicsChallengeStyles.pillButtonText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Text style={PhonicsChallengeStyles.challengeText}>Blue alien character</Text>
                    </>
                ) : (
                    <TouchableOpacity style={PhonicsChallengeStyles.pillButton} onPress={startChallenge}>
                        <Text style={PhonicsChallengeStyles.pillButtonText}>START TEST</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default PhonicsChallenge;