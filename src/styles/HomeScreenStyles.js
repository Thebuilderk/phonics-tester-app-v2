import { StyleSheet } from 'react-native';
import colors from './colors';
import typography from './typography';

const HomeScreenStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        // backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        // backgroundColor: colors.background,
    },
    headerTabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: colors.primary, // Example background
        paddingHorizontal: 10,
    },
    headerTab: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    headerTabText: {
        ...typography.h3,
        color: colors.white,
    },
    headerTabActive: {
        backgroundColor: colors.secondary, // Active tab color
    },
    avatarCustomizerWrapper: {
        // Adjust as needed for positioning
    },
    contentArea: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 10,
    },
});

export default HomeScreenStyles;
