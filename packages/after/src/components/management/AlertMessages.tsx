import React from 'react';
import { Alert } from '@/components/ui';

type AlertMessagesProps = {
  showSuccessAlert: boolean;
  successMessage: string;
  onSuccessClose: () => void;
  showErrorAlert: boolean;
  errorMessage: string;
  onErrorClose: () => void;
};

export const AlertMessages: React.FC<AlertMessagesProps> = ({
  showSuccessAlert,
  successMessage,
  onSuccessClose,
  showErrorAlert,
  errorMessage,
  onErrorClose,
}) => {
  if (!showSuccessAlert && !showErrorAlert) {
    return null;
  }

  return (
    <>
      {showSuccessAlert && (
        <div className="mb-2.5">
          <Alert variant="success" title="성공" onClose={onSuccessClose}>
            {successMessage}
          </Alert>
        </div>
      )}

      {showErrorAlert && (
        <div className="mb-2.5">
          <Alert variant="error" title="오류" onClose={onErrorClose}>
            {errorMessage}
          </Alert>
        </div>
      )}
    </>
  );
};
