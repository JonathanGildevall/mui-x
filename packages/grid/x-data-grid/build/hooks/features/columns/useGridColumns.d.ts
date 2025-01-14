import * as React from 'react';
import { GridApiCommunity } from '../../../models/api/gridApiCommunity';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import { GridStateInitializer } from '../../utils/useGridInitializeState';
export declare const columnsStateInitializer: GridStateInitializer<Pick<DataGridProcessedProps, 'columnVisibilityModel' | 'initialState' | 'columnTypes' | 'columns'>>;
/**
 * @requires useGridParamsApi (method)
 * @requires useGridDimensions (method, event) - can be after
 * TODO: Impossible priority - useGridParamsApi also needs to be after useGridColumns
 */
export declare function useGridColumns(apiRef: React.MutableRefObject<GridApiCommunity>, props: Pick<DataGridProcessedProps, 'initialState' | 'columns' | 'onColumnVisibilityChange' | 'columnVisibilityModel' | 'onColumnVisibilityModelChange' | 'columnTypes' | 'checkboxSelection' | 'classes' | 'components' | 'componentsProps'>): void;
