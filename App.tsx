import React, { useEffect, useState } from 'react';
import { useAuth } from './src/hooks/useAuth';
import { LoadingScreen } from './src/screens/LoadingScreen';
import { PrincipalStack } from './src/navigators/PrincipalStack';
import { NavigationContainer } from '@react-navigation/native';
import { dataSource } from './src/database/dataSource';

function App(): React.JSX.Element {
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

  return (
    <NavigationContainer>
      {isLoading || loadDataSource ? (
        <LoadingScreen title="Cargando Porfavor Espere..." />
      ) : (
        <PrincipalStack />
      )}
    </NavigationContainer>
  );
}

export default App;
