import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LearnRoadmapStyles from '../styles/LearnRoadmapStyles';
import learnRoadmapData from '../data/learnRoadmapData';

const LearnRoadmap = () => {
    const [phases, setPhases] = useState(learnRoadmapData.phases);
    const [rewards, setRewards] = useState(learnRoadmapData.rewards);
    const [currentLevel, setCurrentLevel] = useState(1); // Assuming starting at level 1

    // Calculate overall progress based on completed checkpoints
    const calculateOverallProgress = () => {
        let completedCheckpoints = 0;
        let totalCheckpoints = 0;
        phases.forEach(phase => {
            phase.checkpoints.forEach(checkpoint => {
                totalCheckpoints++;
                if (checkpoint.completed) {
                    completedCheckpoints++;
                }
            });
        });
        return totalCheckpoints > 0 ? (completedCheckpoints / totalCheckpoints) * 100 : 0;
    };

    const overallProgress = calculateOverallProgress();

    const toggleCheckpointCompletion = (phaseId, checkpointId) => {
        setPhases(prevPhases =>
            prevPhases.map(phase =>
                phase.id === phaseId
                    ? { ...phase, checkpoints: phase.checkpoints.map(cp => cp.id === checkpointId ? { ...cp, completed: !cp.completed } : cp) }
                    : phase
            )
        );
    };

    const collectReward = (rewardId) => {
        setRewards(prevRewards =>
            prevRewards.map(reward =>
                reward.id === rewardId ? { ...reward, collected: !reward.collected } : reward
            )
        );
    };

    return (
        <View style={LearnRoadmapStyles.container}>
            <Text style={LearnRoadmapStyles.title}>LEARN ROADMAP</Text>
            <View style={LearnRoadmapStyles.progressBarContainer}>
                <View style={[LearnRoadmapStyles.progressBarFill, { width: `${overallProgress}%` }]} />
            </View>

            {phases.map(phase => (
                <View key={phase.id} style={LearnRoadmapStyles.roadmapItem}>
                    <Text style={LearnRoadmapStyles.itemText}>{phase.name}</Text>
                    {phase.checkpoints.map(checkpoint => (
                        <TouchableOpacity
                            key={checkpoint.id}
                            style={LearnRoadmapStyles.checkpoint}
                            onPress={() => toggleCheckpointCompletion(phase.id, checkpoint.id)}
                        >
                            <Text style={LearnRoadmapStyles.checkpointIcon}>
                                {checkpoint.completed ? '✅' : '⚪'}
                            </Text>
                            <Text style={LearnRoadmapStyles.checkpointText}>{checkpoint.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}

            <Text style={LearnRoadmapStyles.title}>REWARDS</Text>
            {rewards.map(reward => (
                <TouchableOpacity
                    key={reward.id}
                    style={LearnRoadmapStyles.rewardContainer}
                    onPress={() => collectReward(reward.id)}
                >
                    <Text style={LearnRoadmapStyles.rewardText}>
                        {reward.collected ? '🏆' : '🎁'} {reward.name}
                    </Text>
                </TouchableOpacity>
            ))}

            <View style={LearnRoadmapStyles.roadmapItem}>
                <Text style={LearnRoadmapStyles.itemText}>Overall Progress: {overallProgress.toFixed(0)}%</Text>
                <Text style={LearnRoadmapStyles.itemText}>Current Level: {currentLevel}/{learnRoadmapData.totalLevels}</Text>
            </View>
        </View>
    );
};

const styles = LearnRoadmapStyles;

export default LearnRoadmap;
