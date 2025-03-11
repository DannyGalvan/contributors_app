import { create } from 'zustand';

interface NetworkStore {
  isConnected: boolean | null;
  setIsConnected: (value: boolean | null) => void;
}

export const useNetworkStore = create<NetworkStore>((set) => ({
  isConnected: false, // Estado inicial
  setIsConnected: (value: boolean | null) => set({ isConnected: value }),
}));
