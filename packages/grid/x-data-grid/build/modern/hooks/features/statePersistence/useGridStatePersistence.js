import * as React from 'react';
import { useGridApiMethod } from '../../utils';
export const useGridStatePersistence = apiRef => {
  const exportState = React.useCallback(() => {
    const stateToExport = apiRef.current.unstable_applyPipeProcessors('exportState', {});
    return stateToExport;
  }, [apiRef]);
  const restoreState = React.useCallback(stateToRestore => {
    const response = apiRef.current.unstable_applyPipeProcessors('restoreState', {
      callbacks: []
    }, {
      stateToRestore
    });
    response.callbacks.forEach(callback => {
      callback();
    });
    apiRef.current.forceUpdate();
  }, [apiRef]);
  const statePersistenceApi = {
    exportState,
    restoreState
  };
  useGridApiMethod(apiRef, statePersistenceApi, 'GridStatePersistenceApi');
};