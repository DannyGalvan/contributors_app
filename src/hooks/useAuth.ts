import { useAuthStore } from '@stores/useAuthStore';

export const useAuth = () => {
  const { authState, logout, signIn, isLoadingAuth, initializeAuth } =
    useAuthStore();

  return {
    isLoggedIn: authState.isLoggedIn,
    logout,
    signIn,
    startDateToWork: authState.startDateToWork,
    startYearToWork: authState.startYearToWork,
    token: authState?.token,
    username: authState?.username,
    idUser: authState?.idUser,
    employeeCode: authState?.employeeCode,
    companyCode: authState?.companyCode,
    isLoading: isLoadingAuth,
    initializeAuth,
  };
};
