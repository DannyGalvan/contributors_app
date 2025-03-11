import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { appColors } from '@styles/appColors';

interface ResponseMessageProps {
  message: string;
  success: boolean;
  loading: boolean;
}

export const ResponseMessage = ({
  message,
  success,
  loading,
}: ResponseMessageProps) => {
  return (
    <>
      {message && (
        <Text
          className={`${
            !success ? 'text-red-500' : 'text-green-500'
          } text-center mt-5`}
        >
          {message}
        </Text>
      )}
      {loading && (
        <ActivityIndicator
          className="mt-5"
          size="large"
          color={appColors.info}
        />
      )}
    </>
  );
};
