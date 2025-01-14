import * as React from 'react';
import { GridApiCommunity } from '../../../models/api/gridApiCommunity';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import { GridStateInitializer } from '../../utils/useGridInitializeState';
export declare const focusStateInitializer: GridStateInitializer;
/**
 * @requires useGridParamsApi (method)
 * @requires useGridRows (method)
 * @requires useGridEditing (event)
 */
export declare const useGridFocus: (apiRef: React.MutableRefObject<GridApiCommunity>, props: Pick<DataGridProcessedProps, 'rows' | 'pagination' | 'paginationMode'>) => void;
