import { useThemeStore } from '@stores/useThemeStore';
import { lightColors, darkColors, AppColors } from '@theme/colors';
import { shadows, radius, spacing } from '@theme/spacing';
import { fontSize, fontWeight, letterSpacing } from '@theme/typography';

export const useTheme = () => {
  const { resolved, mode, setMode } = useThemeStore();
  const isDark = resolved === 'dark';
  const colors: AppColors = isDark ? darkColors : lightColors;

  console.log('useTheme: ', { mode, isDark, colors });

  return {
    colors,
    shadows,
    radius,
    spacing,
    fontSize,
    fontWeight,
    letterSpacing,
    isDark,
    mode,
    setMode,
  };
};
