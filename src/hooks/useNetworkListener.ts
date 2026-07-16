import { useEffect, useRef } from 'react';
import { useNetworkStore } from '@stores/useNetworkStore';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

const DEBOUNCE_MS = 300;

const useNetworkListener = () => {
  const { setIsConnected, setIsChecking, setConnectionType, isConnected } =
    useNetworkStore();

  const isMounted = useRef(true);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check network connection status
  const updateNetworkStatus = (state: NetInfoState) => {
    if (!isMounted.current) return;

    // isInternetReachable can be null on Android emulator (undetermined) — treat null as connected
    const isActuallyConnected =
      state.isConnected != null &&
      state.isConnected &&
      (state.isInternetReachable === null || state.isInternetReachable === true);

    setIsConnected(isActuallyConnected);
    if (state.type !== 'unknown') {
      setConnectionType(state.type);
    }
  };

  // Debounced network update
  const handleNetworkChange = (state: NetInfoState) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      updateNetworkStatus(state);
    }, DEBOUNCE_MS);
  };

  useEffect(() => {
    isMounted.current = true;
    let unsubscribe: (() => void) | null = null;

    // Initialize with current network state on mount
    const initializeNetworkStatus = async () => {
      try {
        setIsChecking(true);
        const state = await NetInfo.fetch();
        if (isMounted.current) {
          updateNetworkStatus(state);
        }
      } catch (error) {
        console.warn('Error fetching initial network state:', error);
        // Fallback: assume connected if NetInfo fails
        if (isMounted.current) {
          setIsConnected(true);
        }
      }

      // Subscribe to network changes after initial check
      try {
        unsubscribe = NetInfo.addEventListener(handleNetworkChange);
      } catch (error) {
        console.warn('Error subscribing to network changes:', error);
      }
    };

    initializeNetworkStatus();

    return () => {
      isMounted.current = false;
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return { isConnected };
};

export default useNetworkListener;
