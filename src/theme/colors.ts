// ─── Brand Palette ───────────────────────────────────────────────────────────
export const palette = {
  primary: {
    950: '#020f2e',
    900: '#051640',
    800: '#0d2e6e',
    700: '#0d47a1', // brand base
    600: '#1565c0',
    500: '#1976d2',
    400: '#2196f3',
    300: '#42a5f5',
    200: '#90caf9',
    100: '#bbdefb',
    50: '#e3f2fd',
  },
  neutral: {
    950: '#050a14',
    900: '#0a1628',
    800: '#102038',
    700: '#1c2e4a',
    600: '#263d5c',
    500: '#37474f',
    400: '#546e7a',
    300: '#78909c',
    200: '#b0bec5',
    100: '#cfd8dc',
    50: '#eceff1',
  },
  success: {
    600: '#2e7d32',
    500: '#388e3c',
    400: '#4caf50',
    100: '#c8e6c9',
    50: '#e8f5e9',
  },
  danger: {
    600: '#c62828',
    500: '#d32f2f',
    400: '#ef5350',
    100: '#ffcdd2',
    50: '#ffebee',
  },
  warning: {
    600: '#f57f17',
    500: '#f9a825',
    400: '#ffc107',
    100: '#fff9c4',
    50: '#fffde7',
  },
  info: {
    600: '#0277bd',
    500: '#0288d1',
    400: '#29b6f6',
    100: '#b3e5fc',
    50: '#e1f5fe',
  },
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
};

// ─── Glass Tokens ─────────────────────────────────────────────────────────────
export const glass = {
  dark: {
    surface: 'rgba(255,255,255,0.08)',
    surfaceMd: 'rgba(255,255,255,0.13)',
    surfaceLg: 'rgba(255,255,255,0.18)',
    border: 'rgba(255,255,255,0.18)',
    borderStrong: 'rgba(255,255,255,0.3)',
  },
  light: {
    surface: 'rgba(255,255,255,0.65)',
    surfaceMd: 'rgba(255,255,255,0.78)',
    surfaceLg: 'rgba(255,255,255,0.92)',
    border: 'rgba(13,71,161,0.12)',
    borderStrong: 'rgba(13,71,161,0.25)',
  },
};

// ─── Light Theme ─────────────────────────────────────────────────────────────
export const lightColors = {
  background: {
    // Dark-blue gradient so white text (text.inverse) always has contrast
    gradient: [
      palette.primary[900],
      palette.primary[700],
      palette.primary[600],
    ] as string[],
    screen: palette.primary[700],
    secondary: palette.white,
  },
  surface: {
    glass: glass.light.surface,
    glassMd: glass.light.surfaceMd,
    glassLg: glass.light.surfaceLg,
    card: palette.white,
    elevated: palette.white,
    input: 'rgba(13,71,161,0.06)',
  },
  border: {
    glass: glass.light.border,
    glassStrong: glass.light.borderStrong,
    input: 'rgba(13,71,161,0.2)',
    inputFocused: palette.primary[700],
    divider: palette.neutral[100],
  },
  text: {
    primary: palette.neutral[900],
    secondary: palette.neutral[500],
    muted: palette.neutral[300],
    inverse: palette.white,
    inverseSecondary: 'rgba(255,255,255,0.7)',
    inverseMuted: 'rgba(255,255,255,0.5)',
    onGlass: palette.neutral[900],
    link: palette.primary[600],
    error: palette.danger[500],
    success: palette.success[500],
    warning: palette.warning[600],
  },
  brand: {
    primary: palette.primary[700],
    secondary: palette.primary[500],
    accent: palette.info[400],
    cta: palette.warning[400],
  },
  status: {
    success: palette.success[400],
    successBg: palette.success[50],
    danger: palette.danger[500],
    dangerBg: palette.danger[50],
    warning: palette.warning[400],
    warningBg: palette.warning[50],
    info: palette.info[400],
    infoBg: palette.info[50],
    pending: palette.neutral[300],
    pendingBg: palette.neutral[50],
  },
  icon: {
    primary: palette.primary[700],
    secondary: palette.neutral[400],
    inverse: palette.white,
    muted: palette.neutral[200],
  },
};

// ─── Dark Theme ──────────────────────────────────────────────────────────────
export const darkColors = {
  background: {
    gradient: [
      palette.neutral[950],
      palette.neutral[900],
      '#0d2040',
    ] as string[],
    screen: palette.neutral[950],
    secondary: palette.neutral[900],
  },
  surface: {
    glass: glass.dark.surface,
    glassMd: glass.dark.surfaceMd,
    glassLg: glass.dark.surfaceLg,
    card: 'rgba(255,255,255,0.05)',
    elevated: palette.neutral[800],
    input: 'rgba(255,255,255,0.07)',
  },
  border: {
    glass: glass.dark.border,
    glassStrong: glass.dark.borderStrong,
    input: 'rgba(255,255,255,0.15)',
    inputFocused: palette.primary[300],
    divider: palette.neutral[800],
  },
  text: {
    primary: palette.white,
    secondary: palette.neutral[200],
    muted: palette.neutral[400],
    // inverse = white: brand/gradient backgrounds are always dark in both themes
    inverse: palette.white,
    inverseSecondary: 'rgba(255,255,255,0.7)',
    inverseMuted: 'rgba(255,255,255,0.5)',
    onGlass: palette.white,
    link: palette.primary[300],
    error: palette.danger[400],
    success: palette.success[400],
    warning: palette.warning[400],
  },
  brand: {
    primary: palette.primary[300],
    secondary: palette.primary[400],
    accent: palette.info[400],
    cta: palette.warning[400],
  },
  status: {
    success: palette.success[400],
    successBg: 'rgba(76,175,80,0.15)',
    danger: palette.danger[400],
    dangerBg: 'rgba(211,47,47,0.15)',
    warning: palette.warning[400],
    warningBg: 'rgba(255,193,7,0.12)',
    info: palette.info[400],
    infoBg: 'rgba(41,182,246,0.12)',
    pending: palette.neutral[400],
    pendingBg: 'rgba(120,144,156,0.15)',
  },
  icon: {
    primary: palette.primary[300],
    secondary: palette.neutral[300],
    inverse: palette.white,
    muted: palette.neutral[600],
  },
};

export type AppColors = typeof lightColors;
