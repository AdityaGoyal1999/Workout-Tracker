import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

// Example of how to use the theme in a component
export const ThemedComponentExample = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      ...theme.shadows.sm,
    },
    title: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.md,
    },
    subtitle: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.lg,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
    },
    buttonText: {
      color: theme.colors.white,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Themed Component</Text>
      <Text style={styles.subtitle}>This component uses the centralized theme</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
};

// Alternative approach using the utility function
import { createThemedStyles } from '../utils/createThemedStyles';

export const ThemedComponentWithUtility = () => {
  const styles = createThemedStyles((theme) => StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.xl,
      borderRadius: theme.borderRadius.lg,
      ...theme.shadows.md,
    },
    text: {
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text.primary,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Using utility function</Text>
    </View>
  );
};
