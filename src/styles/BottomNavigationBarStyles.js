import { StyleSheet } from 'react-native';
import colors from './colors';
import typography from './typography';
import GlobalStyles from './GlobalStyles';

const BottomNavigationBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    // Removed traditional bottom nav background and border
  },
  navItem: {
    ...GlobalStyles.pillButton,
    backgroundColor: colors.primary,
  },
  navIcon: {
    fontSize: 24,
    color: colors.white,
    marginBottom: 4,
    ...GlobalStyles.pillButtonText, // Apply font and shadow from pillButtonText
  },
  navText: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'normal',
    ...GlobalStyles.pillButtonText, // Apply font and shadow from pillButtonText
  },
  activeNavItem: {
    backgroundColor: colors.accent, // Active item color
  },
  activeNavIcon: {
    color: colors.white,
  },
  activeNavText: {
    color: colors.white,
    fontWeight: 'normal',
  },
  touchableNavItem: {
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});

export default BottomNavigationBarStyles;
