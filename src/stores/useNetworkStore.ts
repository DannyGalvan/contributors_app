import { create } from 'zustand';
import { NetInfoStateType } from '@react-native-community/netinfo';

export type ConnectionType = NetInfoStateType | 'unknown';

interface NetworkStore {
  isConnected: boolean | null;
  isChecking: boolean;
  connectionType: ConnectionType;
  lastUpdated: number | null;
  retryCount: number;
  setIsConnected: (value: boolean | null) => void;
  setIsChecking: (value: boolean) => void;
  setConnectionType: (type: ConnectionType) => void;
  setLastUpdated: (timestamp: number) => void;
  incrementRetryCount: () => void;
  resetRetryCount: () => void;
  requestRetry: () => void;
}

export const useNetworkStore = create<NetworkStore>((set) => ({
  isConnected: null, // null = checking, true = connected, false = no connection
  isChecking: true, // Start as true since we check on init
  connectionType: 'unknown',
  lastUpdated: null,
  retryCount: 0,

  setIsConnected: (value: boolean | null) =>
    set({
      isConnected: value,
      lastUpdated: Date.now(),
      isChecking: false,
    }),

  setIsChecking: (value: boolean) => set({ isChecking: value }),

  setConnectionType: (type: ConnectionType) => set({ connectionType: type }),

  setLastUpdated: (timestamp: number) => set({ lastUpdated: timestamp }),

  incrementRetryCount: () =>
    set((state) => ({ retryCount: state.retryCount + 1 })),

  resetRetryCount: () => set({ retryCount: 0 }),

  requestRetry: () => set({ isChecking: true, retryCount: 0 }),
}));
