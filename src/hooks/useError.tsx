import React, { createContext, useCallback, useContext, useState } from 'react';

interface ContextValue {
  error: string;
  dispatchError: (message: string) => void;
}

const ErrorContext = createContext<ContextValue | null>(null);

export const ErrorProvider = ({ children }: React.PropsWithChildren) => {
  const [error, setError] = useState<string>('');

  const dispatchError = useCallback((message: string): void => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 7000);
  }, []);

  return <ErrorContext.Provider value={{ error, dispatchError }}>{children}</ErrorContext.Provider>;
};

export const useError = () => {
  const errorContext = useContext(ErrorContext);

  if (!errorContext) {
    throw Error('useError needs to be used inside ErrorContext');
  }

  return errorContext;
};
