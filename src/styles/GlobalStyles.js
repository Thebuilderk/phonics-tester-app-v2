import { StyleSheet } from 'react-native';
import colors from './colors';
import typography from './typography';

export default StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: colors.softBlue, // Default vibrant border color
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 }, // Solid drop shadows
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 8,
    padding: 15,
    margin: 10,
  },
  pillButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 6,
  },
  pillButtonText: {
    ...typography.h4,
    color: colors.white,
    fontWeight: 'normal',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  badgeBanner: {
    position: 'absolute',
    top: -15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: colors.softGreen,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 4,
  },
  badgeBannerText: {
    ...typography.h4,
    color: colors.white,
    fontWeight: 'normal',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});
