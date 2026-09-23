import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PhonicsChallengeStyles from '../styles/PhonicsChallengeStyles';
import phonicsChallenges from '../data/phonicsChallenges';

// Static image map to replace dynamic require()
const IMAGES = {
  'cat_image.png': require('../assets/images/cat_image.png'),
  'dog_image.png': require('../assets/images/dog_image.png'),
  'sun_image.png': require('../assets/images/sun_image.png'),
  'hat_image.png': require('../assets/images/hat_image.png'),
};

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

        // Move to the next challenge after a short delay for feedback
        setTimeout(() => {
            const nextIndex = currentChallengeIndex + 1;
            if (nextIndex < phonicsChallenges.length) {
                setCurrentChallengeIndex(nextIndex);
                setFeedback(null);
            } else {
                alert(`Challenge Complete! Your final score is ${score + (selectedAnswer === currentChallenge.correctAnswer ? 10 : 0)}`);
                setChallengeStarted(false);
            }
        }, 1000); // 1 second delay
    };

    return (
        <View style={PhonicsChallengeStyles.container}>
            <Text style={PhonicsChallengeStyles.title}>PHONICS CHALLENGE</Text>
            <View style={PhonicsChallengeStyles.challengeCard}>
                {challengeStarted && currentChallenge ? (
                    <>
                        <Image
                            source={IMAGES[currentChallenge.image]}
                            style={{ width: 100, height: 100, marginBottom: 10 }}
                        />
                        <Text style={PhonicsChallengeStyles.challengeText}>{currentChallenge.word}</Text>

                        <View style={PhonicsChallengeStyles.scoreContainer}>
                            <Text style={PhonicsChallengeStyles.scoreText}>SCORE: {score}/{(phonicsChallenges.length * 10)}</Text>
                            {feedback === 'correct' && <Text style={[PhonicsChallengeStyles.feedbackIcon, PhonicsChallengeStyles.correctFeedback]}>✅</Text>}
                            {feedback === 'incorrect' && <Text style={[PhonicsChallengeStyles.feedbackIcon, PhonicsChallengeStyles.incorrectFeedback]}>❌</Text>}
                        </View>

                        <View style={PhonicsChallengeStyles.buttonContainer}>
                            {currentChallenge.options.map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={PhonicsChallengeStyles.actionButton}
                                    onPress={() => handleAnswer(option)}
                                >
                                    <Text style={PhonicsChallengeStyles.actionButtonText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Text style={PhonicsChallengeStyles.challengeText}>Blue alien character</Text>
                    </>
                ) : (
                    <TouchableOpacity style={PhonicsChallengeStyles.actionButton} onPress={startChallenge}>
                        <Text style={PhonicsChallengeStyles.actionButtonText}>START TEST</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default PhonicsChallenge;
