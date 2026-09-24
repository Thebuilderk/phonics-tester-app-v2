import { StyleSheet } from 'react-native';
import colors from './colors';
import typography from './typography';
import GlobalStyles from './GlobalStyles';

const PhonicsChallengeStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  title: {
    ...typography.h2,
    color: colors.darkBlue,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'normal',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  challengeCard: {
    ...GlobalStyles.cardContainer,
    borderColor: colors.softOrange, // Specific border color for challenge card
    width: '100%',
    alignItems: 'center',
  },
  challengeText: {
    ...typography.body,
    fontSize: 24,
    fontWeight: 'normal',
    color: colors.darkGray,
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  pillButton: {
    ...GlobalStyles.pillButton,
    backgroundColor: colors.accent,
    marginHorizontal: 5,
  },
  pillButtonText: {
    ...GlobalStyles.pillButtonText,
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
    fontWeight: 'normal',
    marginRight: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  feedbackIcon: {
    fontSize: 28,
    fontWeight: 'normal',
  },
  correctFeedback: {
    color: colors.success,
  },
  incorrectFeedback: {
    color: colors.danger,
  },
  badgeBanner: {
    ...GlobalStyles.badgeBanner,
    backgroundColor: colors.softBlue,
  },
  badgeBannerText: {
    ...GlobalStyles.badgeBannerText,
  },
});

export default PhonicsChallengeStyles;
