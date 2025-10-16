export const colors = {
  // Primary Colors - Bright Yellow Theme
  primary: "#FFD700", // Bright Gold/Yellow
  primaryDark: "#B8860B", // Dark Goldenrod
  primaryLight: "#FFFF00", // Pure Yellow
  
  // Secondary Colors - Black variations
  secondary: "#000000", // Pure Black
  secondaryDark: "#000000", // Pure Black
  secondaryLight: "#333333", // Dark Gray
  
  // Neutral Colors - Yellow and Black palette
  white: "#FFFF00", // Bright Yellow instead of white
  black: "#000000", // Pure Black
  gray: {
    50: "#FFFACD", // Lemon Chiffon
    100: "#FFF8DC", // Cornsilk
    200: "#F0E68C", // Khaki
    300: "#DAA520", // Goldenrod
    400: "#B8860B", // Dark Goldenrod
    500: "#996F00", // Darker Gold
    600: "#7A5A00", // Even Darker Gold
    700: "#5C4200", // Very Dark Gold
    800: "#3D2B00", // Almost Black Gold
    900: "#1F1500", // Very Dark Brown
  },
  
  // Semantic Colors - Yellow and Black theme
  background: "#FFFACD", // Lemon Chiffon background
  surface: "#FFFF00", // Bright Yellow surface
  text: {
    primary: "#000000", // Black text
    secondary: "#333333", // Dark gray text
    tertiary: "#666666", // Medium gray text
    inverse: "#FFFF00", // Yellow text on black
  },
  
  // Status Colors - Adapted for yellow/black theme
  success: "#32CD32", // Lime Green
  warning: "#FF8C00", // Dark Orange
  error: "#FF4500", // Orange Red
  info: "#FFD700", // Gold
  
  // Border Colors
  border: "#B8860B", // Dark Goldenrod borders
  borderLight: "#F0E68C", // Khaki light borders
  borderDark: "#000000", // Black dark borders
  
  // Shadow Colors - Black shadows
  shadow: "rgba(0, 0, 0, 0.3)",
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
