import { create } from 'zustand';
import { setAuthorizationHeader } from '@config/axiosConfig';
import {
  createSessionStorage,
  getSessionStorage,
  removeSessionStorage,
} from '@database/repository/sessionStorageRepository';
import { StorageKey } from '@config/constants';

export interface AuthState {
  isLoggedIn: boolean;
  username?: string;
  token: string;
  idUser: number;
  employeeCode: string;
  companyCode: number;
  startYearToWork: number;
  startDateToWork: string;
}

export const InitialAuthState: AuthState = {
  isLoggedIn: false,
  username: undefined,
  token: '',
  idUser: 0,
  employeeCode: '',
  companyCode: 0,
  startYearToWork: 0,
  startDateToWork: '',
};

export interface SignIn {
  username: string;
  token: string;
  idUser: number;
  employeeCode: string;
  companyCode: number;
  startYearToWork: number;
  startDateToWork: string;
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
  },
  initializeAuth: async () => {
    set({ isLoadingAuth: true });

    const data = await getSessionStorage<AuthState>(StorageKey.auth);

    if (data) {
      setAuthorizationHeader(data.token);
      set({ authState: { ...data } });
    }

    set({ isLoadingAuth: false });
  },
  logout: () => {
    setAuthorizationHeader('');
    removeSessionStorage(StorageKey.auth);
    set({ authState: InitialAuthState });
  },
}));
