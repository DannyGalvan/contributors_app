import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useNetworkListener from './src/hooks/useNetworkListener';
import { InitialScreen } from '@screens/InitialScreen';

const client = new QueryClient();

function App(): React.JSX.Element {
  useNetworkListener();

  return (
    <QueryClientProvider client={client}>
      <NavigationContainer>
        <InitialScreen />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
