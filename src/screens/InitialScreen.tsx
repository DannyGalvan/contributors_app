import React, { useEffect, useState } from 'react';

import { useDataSource } from '@hooks/useDataSource';
import { useVerifyVersion } from '@hooks/useVerifyVersion';
import { usePermissionsStore } from '@stores/usePermissionsStore';

import { LoadingScreen } from './LoadingScreen';
import { UpdateScreen } from './UpdateScreen';
import { PermissionsScreen } from './PermissionsScreen';
import { PrincipalStack } from '@navigations/PrincipalStack';

type AppStep = 'loading' | 'permissions' | 'ready' | 'update';

export const InitialScreen = () => {
  const { loadDataSource, isLoading } = useDataSource();
  const { isLoadingVerification, isVerified } = useVerifyVersion();
  const { checkAll, permissions } = usePermissionsStore();

  const [step, setStep] = useState<AppStep>('loading');

  useEffect(() => {
    if (isLoading || loadDataSource || isLoadingVerification) {
      setStep('loading');
      return;
    }

    if (!isVerified) {
      setStep('update');
      return;
    }

    // Once app is ready, check permissions
    (async () => {
      await checkAll();
      const { location, camera } = permissions;
      const allGranted =
        (location === 'granted' || location === 'limited') &&
        (camera === 'granted' || camera === 'limited');

      setStep(allGranted ? 'ready' : 'permissions');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, loadDataSource, isLoadingVerification, isVerified]);

  if (step === 'loading') {
    const message = isLoadingVerification
      ? 'Verificando versión...'
      : 'Cargando, por favor espere...';
    return <LoadingScreen title={message} />;
  }

  if (step === 'update') {
    return (
      <UpdateScreen title="Versión desactualizada. Por favor actualice la aplicación desde la tienda." />
    );
  }

  if (step === 'permissions') {
    return <PermissionsScreen onComplete={() => setStep('ready')} />;
  }

  return <PrincipalStack />;
};
