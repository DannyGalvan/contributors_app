import { Platform } from 'react-native';

// ─── Font Families ────────────────────────────────────────────────────────────
// Intentional cascade: custom installed font → system sans-serif
export const fontFamily = {
  regular: Platform.select({
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    android: 'Roboto-Medium',
    default: 'System',
  }),
  bold: Platform.select({
    android: 'Roboto-Bold',
    default: 'System',
  }),
  light: Platform.select({
    android: 'Roboto-Light',
    default: 'System',
  }),
};

// ─── Font Sizes ───────────────────────────────────────────────────────────────
export const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 19,
  xl: 22,
  '2xl': 26,
  '3xl': 30,
  '4xl': 36,
};

// ─── Font Weights ─────────────────────────────────────────────────────────────
export const fontWeight = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

// ─── Line Heights ─────────────────────────────────────────────────────────────
export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
};

// ─── Letter Spacing ───────────────────────────────────────────────────────────
export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,
};
