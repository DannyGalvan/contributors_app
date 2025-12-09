import { APP_VERSION } from '@config/constants';
import { getAppValueByKey } from '@services/appValuesService';
import { useEffect, useState } from 'react';

export const useVerifyVersion = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoadingVerification, setIsLoadingVerification] = useState(true);

  useEffect(() => {
    const verifyVersion = async () => {
      const responseVerify = await getAppValueByKey('AppVersion');
      if (responseVerify.success) {
        if (APP_VERSION === responseVerify.data.value) {
          setIsVerified(true);
        }
      }
      setIsLoadingVerification(false);
    };

    verifyVersion();
  }, []);

  return { isVerified, isLoadingVerification };
};
