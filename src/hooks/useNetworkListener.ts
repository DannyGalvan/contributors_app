import { useEffect } from 'react';
import { useNetworkStore } from '@stores/useNetworkStore';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

const useNetworkListener = () => {
  const setIsConnected = useNetworkStore((state) => state.setIsConnected);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const isConnected =
        state.isConnected != null &&
        state.isConnected &&
        Boolean(state.isInternetReachable);

      setIsConnected(isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, [setIsConnected]);
};

export default useNetworkListener;
