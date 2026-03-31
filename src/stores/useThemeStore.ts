import { Appearance, ColorSchemeName } from 'react-native';
import { create } from 'zustand';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  resolved: 'light' | 'dark';
  setMode: (mode: ThemeMode) => void;
  syncSystem: () => void;
}

const resolveScheme = (mode: ThemeMode): 'light' | 'dark' => {
  if (mode === 'system') {
    return (Appearance.getColorScheme() as 'light' | 'dark') ?? 'dark';
  }
  return mode;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: 'system',
  resolved: resolveScheme('system'),

  setMode: (mode) => {
    set({ mode, resolved: resolveScheme(mode) });
  },

  syncSystem: () => {
    const { mode } = get();
    if (mode === 'system') {
      set({ resolved: resolveScheme('system') });
    }
  },
}));

// Keep in sync when system preference changes
Appearance.addChangeListener(({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const { mode, syncSystem } = useThemeStore.getState();
  if (mode === 'system') {
    syncSystem();
  }
});
