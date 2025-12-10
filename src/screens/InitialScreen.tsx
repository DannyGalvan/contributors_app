import { useDataSource } from '@hooks/useDataSource';
import { useVerifyVersion } from '@hooks/useVerifyVersion';
import { LoadingScreen } from './LoadingScreen';
import { PrincipalStack } from '@navigations/PrincipalStack';
import { UpdateScreen } from './UpdateScreen';

export const InitialScreen = () => {
  const { loadDataSource, isLoading } = useDataSource();
  const { isLoadingVerification, isVerified } = useVerifyVersion();

  if (isLoading || loadDataSource) {
    return <LoadingScreen title="Cargando Porfavor Espere..." />;
  }

  if (isLoadingVerification) {
    return <LoadingScreen title="Verificando versión de la aplicación..." />;
  }

  if (!isVerified) {
    return (
      <UpdateScreen title="Versión de la aplicación desactualizada. Por favor actualice la aplicación desde la Play Store." />
    );
  }

  return <PrincipalStack />;
};
