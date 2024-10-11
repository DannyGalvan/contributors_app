import { useAuthStore } from '../stores/useAuthStore';

export const useAuth = () => {
  const { authState, logout, signIn, isLoadingAuth, initializeAuth } =
    useAuthStore();

  return {
    isLoggedIn: authState.isLoggedIn,
    logout,
    signIn,
    token: authState?.token,
    username: authState?.username,
    idUser: authState?.idUser,
    isLoading: isLoadingAuth,
    initializeAuth,
  };
};
