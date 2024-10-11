import { create } from 'zustand';
import { setAuthorizationHeader } from '../config/axiosConfig';
import {
  createSessionStorage,
  getSessionStorage,
  removeSessionStorage,
} from '../database/repository/sessionStorageRepository';
import { StorageKey } from '../config/constants';
import { dataSource } from '../database/dataSource';

export interface AuthState {
  isLoggedIn: boolean;
  username?: string;
  token: string;
  idUser: number;
}

export const InitialAuthState: AuthState = {
  isLoggedIn: false,
  username: undefined,
  token: '',
  idUser: 0,
};

export interface SignIn {
  username: string;
  token: string;
  idUser: number;
}

interface AuthStoreState {
  authState: AuthState;
  isLoadingAuth: boolean;
  signIn: (data: SignIn) => void;
  initializeAuth: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  authState: InitialAuthState,
  isLoadingAuth: false,
  signIn: (state) => {
    setAuthorizationHeader(state.token);
    const newState = { ...state, isLoggedIn: true };
    set({ authState: newState });
    createSessionStorage(StorageKey.auth, newState);
    console.log('signIn');
  },
  initializeAuth: async () => {
    set({ isLoadingAuth: true });

    const data = await getSessionStorage<AuthState>(StorageKey.auth);

    if (data) {
      setAuthorizationHeader(data.token);
      set({ authState: { ...data } });
    }

    set({ isLoadingAuth: false });
    console.log('initializeAuth');
  },
  logout: () => {
    setAuthorizationHeader('');
    removeSessionStorage(StorageKey.auth);
    set({ authState: InitialAuthState });
    console.log('logout');
  },
}));
