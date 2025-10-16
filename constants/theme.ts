export const colors = {
  // Primary Colors
  primary: "#007AFF",
  primaryDark: "#0056CC",
  primaryLight: "#4A9EFF",
  
  // Secondary Colors
  secondary: "#34C759",
  secondaryDark: "#28A745",
  secondaryLight: "#5DD979",
  
  // Neutral Colors
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
  
  // Semantic Colors
  background: "#F2F2F7",
  surface: "#FFFFFF",
  text: {
    primary: "#000000",
    secondary: "#8E8E93",
    tertiary: "#C7C7CC",
    inverse: "#FFFFFF",
  },
  
  // Status Colors
  success: "#34C759",
  warning: "#FF9500",
  error: "#FF3B30",
  info: "#007AFF",
  
  // Border Colors
  border: "#E5E5EA",
  borderLight: "#F2F2F7",
  borderDark: "#C7C7CC",
  
  // Shadow Colors
  shadow: "rgba(0, 0, 0, 0.1)",
  shadowDark: "rgba(0, 0, 0, 0.2)",
  
  // Overlay Colors
  overlay: "rgba(0, 0, 0, 0.5)",
  overlayLight: "rgba(0, 0, 0, 0.3)",
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
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 6,
  },
  lg: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
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
