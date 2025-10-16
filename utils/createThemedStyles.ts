import { theme, Theme } from '../constants/theme';

export const createThemedStyles = (styleFunction: (theme: Theme) => any) => {
  return styleFunction(theme);
};

// Example usage:
// const styles = createThemedStyles((theme) => StyleSheet.create({
//   container: {
//     backgroundColor: theme.colors.background,
//     padding: theme.spacing.lg,
//   },
//   title: {
//     fontSize: theme.typography.fontSize['2xl'],
//     color: theme.colors.text.primary,
//     fontWeight: theme.typography.fontWeight.bold,
//   },
// }));
