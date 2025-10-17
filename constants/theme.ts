export const colors = {
  // Primary Colors - Red Theme
  primary: "#DC2626", // Red-600
  primaryDark: "#991B1B", // Red-800
  primaryLight: "#EF4444", // Red-500
  
  // Secondary Colors - Black variations
  secondary: "#000000", // Pure Black
  secondaryDark: "#000000", // Pure Black
  secondaryLight: "#1F1F1F", // Very Dark Gray
  
  // Neutral Colors - Black and Red palette
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
  
  // Semantic Colors - Black and Red theme
  background: "#000000", // Pure Black background
  surface: "#1F1F1F", // Dark Gray surface
  text: {
    primary: "#FFFFFF", // White text
    secondary: "#D1D5DB", // Light gray text
    tertiary: "#9CA3AF", // Medium gray text
    inverse: "#000000", // Black text on light
  },
  
  // Status Colors - Adapted for black/red theme
  success: "#10B981", // Emerald-500
  warning: "#F59E0B", // Amber-500
  error: "#EF4444", // Red-500
  info: "#3B82F6", // Blue-500
  
  // Border Colors
  border: "#374151", // Gray-700 borders
  borderLight: "#4B5563", // Gray-600 light borders
  borderDark: "#000000", // Black dark borders
  
  // Shadow Colors - Black shadows
  shadow: "rgba(0, 0, 0, 0.5)",
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
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  lg: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
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
