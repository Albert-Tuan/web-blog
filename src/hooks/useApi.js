import { useEffect, useState } from 'react';
import { apiError } from '../api/client';

// Pass a stable loader (module function or useCallback) to avoid refetch loops.
export function useApi(loader) {
  const [result, setResult] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    loader(controller.signal)
      .then(data => {
        if (!controller.signal.aborted) setResult({ loader, attempt, data, error: '' });
      })
      .catch(error => {
        if (!controller.signal.aborted) setResult({ loader, attempt, data: null, error: apiError(error) });
      });
    return () => controller.abort();
  }, [loader, attempt]);

  const current = result?.loader === loader && result?.attempt === attempt;
  return {
    data: current ? result.data : null,
    error: current ? result.error : '',
    loading: !current,
    retry: () => setAttempt(value => value + 1),
  };
}
