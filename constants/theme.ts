export const colors = {
  // Primary Colors - Blue Theme
  primary: "#007AFF", // iOS Blue
  primaryDark: "#0056CC", // Darker Blue
  primaryLight: "#4A9EFF", // Lighter Blue
  
  // Secondary Colors - Gray variations
  secondary: "#8E8E93", // iOS Gray
  secondaryDark: "#6D6D70", // Darker Gray
  secondaryLight: "#AEAEB2", // Lighter Gray
  
  // Neutral Colors - Clean palette
  white: "#FFFFFF", // Pure White
  black: "#000000", // Pure Black
  gray: {
    50: "#F9FAFB", // Gray-50
    100: "#F3F4F6", // Gray-100
    200: "#E5E7EB", // Gray-200
    300: "#D1D5DB", // Gray-300
    400: "#9CA3AF", // Gray-400
    500: "#6B7280", // Gray-500
    600: "#4B5563", // Gray-600
    700: "#374151", // Gray-700
    800: "#1F2937", // Gray-800
    900: "#111827", // Gray-900
  },
  
  // Semantic Colors - Clean white theme
  background: "#F2F2F7", // iOS Background Gray
  surface: "#FFFFFF", // Pure White surface
  text: {
    primary: "#000000", // Black text
    secondary: "#8E8E93", // iOS Gray text
    tertiary: "#C7C7CC", // Light gray text
    inverse: "#FFFFFF", // White text on dark
  },
  
  // Status Colors - iOS style
  success: "#34C759", // iOS Green
  warning: "#FF9500", // iOS Orange
  error: "#FF3B30", // iOS Red
  info: "#007AFF", // iOS Blue
  
  // Border Colors
  border: "#E5E5EA", // Light gray borders
  borderLight: "#F2F2F7", // Very light borders
  borderDark: "#C7C7CC", // Darker borders
  
  // Shadow Colors - Subtle shadows
  shadow: "rgba(0, 0, 0, 0.1)",
  shadowDark: "rgba(0, 0, 0, 0.5)",
  
  // Overlay Colors
  overlay: "rgba(0, 0, 0, 0.7)",
  overlayLight: "rgba(0, 0, 0, 0.4)",
};

export const typography = {
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 28,
    "4xl": 32,
    "5xl": 36,
  },
  
  // Font Weights
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  
  // Line Heights
  lineHeight: {
    tight: 20,
    normal: 22,
    relaxed: 24,
    loose: 28,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  "6xl": 64,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};

export type Theme = typeof theme;

export default theme;
