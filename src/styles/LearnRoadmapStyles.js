import { StyleSheet } from 'react-native';
import colors from './colors';
import typography from './typography';
import GlobalStyles from './GlobalStyles';

const LearnRoadmapStyles = StyleSheet.create({
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
  roadmapItem: {
    ...GlobalStyles.cardContainer,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.softBlue, // Specific border color for roadmap items
  },
  // badgeBanner, badgeBannerText styles are now in GlobalStyles
  // pillButton, pillButtonText styles are now in GlobalStyles
  itemIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  itemText: {
    ...typography.body,
    color: colors.darkGray,
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: colors.gray,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 15,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 5,
  },
  checkpoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkpointIcon: {
    fontSize: 22,
    color: colors.success,
    marginRight: 10,
  },
  checkpointText: {
    ...typography.body,
    color: colors.primaryText,
    fontWeight: 'normal',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  rewardContainer: {
    ...GlobalStyles.cardContainer,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gold,
    padding: 8,
    borderRadius: 8,
    marginTop: 15,
  },
  rewardText: {
    ...typography.h3,
    color: colors.white,
    fontWeight: 'normal',
    marginLeft: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default LearnRoadmapStyles;
