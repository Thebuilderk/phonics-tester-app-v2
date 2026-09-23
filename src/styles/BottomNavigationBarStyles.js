import { StyleSheet } from 'react-native';
import colors from './colors';

const BottomNavigationBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.bottomNavBackground,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    color: colors.inactiveIcon,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: colors.inactiveIcon,
  },
  activeNavItem: {
    // Styles for active navigation item if needed
  },
  activeNavIcon: {
    color: colors.activeIcon,
  },
  activeNavText: {
    color: colors.activeIcon,
    fontWeight: 'bold',
  },
  touchableNavItem: {
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});

export default BottomNavigationBarStyles;
