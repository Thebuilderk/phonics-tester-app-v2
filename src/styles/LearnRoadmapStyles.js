import { StyleSheet } from 'react-native';
import colors from './colors';
import typography from './typography';

const LearnRoadmapStyles = StyleSheet.create({
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
  roadmapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    width: '100%',
  },
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
    fontWeight: '500',
  },
  rewardContainer: {
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
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default LearnRoadmapStyles;
