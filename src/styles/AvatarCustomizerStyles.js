import { StyleSheet } from 'react-native';
import colors from './colors';
import typography from './typography';

const AvatarCustomizerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    ...typography.h1,
    color: colors.primaryText,
    marginBottom: 20,
  },
  avatarPreview: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.secondaryBackground,
    borderColor: colors.accent,
    borderWidth: 2,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Placeholder for customization options
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  optionLabel: {
    ...typography.body,
    color: colors.primaryText,
    fontSize: 16,
  },
  customizationButton: {
    backgroundColor: colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  customizationButtonText: {
    color: colors.white,
    ...typography.buttonText,
  },
  slider: {
    width: '100%',
    height: 40,
    // More specific slider styles can be added here if a custom slider component is used
  },
});

export default AvatarCustomizerStyles;
