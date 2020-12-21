import { useState, useCallback } from 'react';

import * as calls from '../api';

const useApiCall = () => {
  const [isCalling, setIsCalling] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const apiCall = useCallback(async (callName, args, triggers = {}) => {
    const request = calls[callName];
    try {
      if (triggers.onRequest) {
        triggers.onRequest();
      }
      setIsCalling(true);
      const data = await request(args);
      setData(data);
      if (triggers.onSuccess) {
        triggers.onSuccess(data);
      }
    } catch (err) {
      setError(err);
      if (triggers.onFail) {
        triggers.onFail(err);
      }
    } finally {
      setIsCalling(false);
    }
  }, []);

  return {
    isCalling,
    data,
    error,
    apiCall,
  };
};

export default useApiCall;
