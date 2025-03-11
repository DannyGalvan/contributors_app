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
          await initializeAuth();
        }
      } catch (error) {
        console.log('error', error);
      }
      setLoadDataSource(false);
    };

    connect();
  }, [isLoading]);

  return { loadDataSource, isLoading };
};
