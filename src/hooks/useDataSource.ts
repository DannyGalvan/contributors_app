import { useEffect, useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { dataSource } from '@database/dataSource';

export const useDataSource = () => {
  const [loadDataSource, setLoadDataSource] = useState(false);
  const { initializeAuth, isLoading } = useAuth();

  useEffect(() => {
    const connect = async () => {
      setLoadDataSource(true);
      try {
        if (!dataSource.isInitialized) {
          await dataSource.initialize();
        }
        await initializeAuth();
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoadDataSource(false);
      }
    };

    connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loadDataSource, isLoading };
};
