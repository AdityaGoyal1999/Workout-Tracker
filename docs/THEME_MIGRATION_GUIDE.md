# Theme Migration Guide

## Overview
Your app now has a centralized theme system instead of hardcoded values scattered across files. This guide will help you migrate existing components to use the new theme system.

## Current State
- ❌ **Before**: Theme values were hardcoded in each file
- ✅ **After**: Centralized theme system with consistent values

## Files Created

### 1. `constants/theme.ts`
- Centralized theme configuration
- Colors, typography, spacing, border radius, shadows
- TypeScript types for better development experience

### 2. `contexts/ThemeContext.tsx`
- React context for theme access
- `useTheme()` hook for components
- Theme provider wrapper

### 3. `utils/createThemedStyles.ts`
- Utility function for creating themed styles
- Alternative approach to using theme in components

## How to Use the Theme

### Method 1: Using useTheme Hook (Recommended)

```tsx
import { useTheme } from '../contexts/ThemeContext';

export const MyComponent = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
    },
    title: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text.primary,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Themed Component</Text>
    </View>
  );
};
```

### Method 2: Using Utility Function

```tsx
import { createThemedStyles } from '../utils/createThemedStyles';

export const MyComponent = () => {
  const styles = createThemedStyles((theme) => StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.xl,
      ...theme.shadows.md,
    },
  }));

  return <View style={styles.container} />;
};
```

## Migration Steps

### Step 1: Replace Hardcoded Colors
```tsx
// Before
backgroundColor: "#007AFF"
color: "#8E8E93"

// After
backgroundColor: theme.colors.primary
color: theme.colors.text.secondary
```

### Step 2: Replace Hardcoded Spacing
```tsx
// Before
padding: 20
margin: 15

// After
padding: theme.spacing.xl
margin: theme.spacing.lg
```

### Step 3: Replace Hardcoded Typography
```tsx
// Before
fontSize: 16
fontWeight: "bold"

// After
fontSize: theme.typography.fontSize.base
fontWeight: theme.typography.fontWeight.bold
```

### Step 4: Replace Hardcoded Shadows
```tsx
// Before
shadowColor: "#000"
shadowOffset: { width: 0, height: 2 }
shadowOpacity: 0.1
shadowRadius: 3.84
elevation: 5

// After
...theme.shadows.sm
```

## Available Theme Values

### Colors
- `theme.colors.primary` - Main brand color (#007AFF)
- `theme.colors.background` - App background (#F2F2F7)
- `theme.colors.surface` - Card/component background (#FFFFFF)
- `theme.colors.text.primary` - Primary text (#000000)
- `theme.colors.text.secondary` - Secondary text (#8E8E93)
- And many more...

### Spacing
- `theme.spacing.xs` (4px) to `theme.spacing['6xl']` (64px)

### Typography
- Font sizes: `theme.typography.fontSize.xs` to `theme.typography.fontSize['5xl']`
- Font weights: `theme.typography.fontWeight.normal` to `theme.typography.fontWeight.bold`

### Border Radius
- `theme.borderRadius.sm` (8px) to `theme.borderRadius.full` (9999px)

### Shadows
- `theme.shadows.sm` - Small shadow
- `theme.shadows.md` - Medium shadow
- `theme.shadows.lg` - Large shadow

## Benefits

1. **Consistency**: All components use the same design tokens
2. **Maintainability**: Change theme values in one place
3. **Type Safety**: TypeScript support for theme values
4. **Scalability**: Easy to add new theme values
5. **Dark Mode Ready**: Easy to implement theme switching later

## Next Steps

1. Start migrating components one by one
2. Use the theme values instead of hardcoded values
3. Test components to ensure they look consistent
4. Consider adding dark mode support in the future

## Example Migration

See `examples/ThemedComponentExample.tsx` for complete examples of both approaches.
