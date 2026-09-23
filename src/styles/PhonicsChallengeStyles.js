import { StyleSheet } from 'react-native';
import colors from './colors';
import typography from './typography';

const PhonicsChallengeStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  title: {
    ...typography.h2,
    color: colors.primaryText,
    marginBottom: 10,
  },
  challengeCard: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  challengeText: {
    ...typography.body,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  actionButton: {
    backgroundColor: colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  actionButtonText: {
    ...typography.buttonText,
    color: colors.white,
    fontWeight: 'bold',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  scoreText: {
    ...typography.h3,
    color: colors.primaryText,
    fontWeight: 'bold',
    marginRight: 10,
  },
  feedbackIcon: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  correctFeedback: {
    color: colors.success,
  },
  incorrectFeedback: {
    color: colors.danger,
  },
});

export default PhonicsChallengeStyles;
