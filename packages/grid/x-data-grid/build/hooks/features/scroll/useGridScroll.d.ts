import * as React from 'react';
import { GridApiCommunity } from '../../../models/api/gridApiCommunity';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
/**
 * @requires useGridPagination (state) - can be after, async only
 * @requires useGridColumns (state) - can be after, async only
 * @requires useGridRows (state) - can be after, async only
 * @requires useGridRowsMeta (state) - can be after, async only
 */
export declare const useGridScroll: (apiRef: React.MutableRefObject<GridApiCommunity>, props: Pick<DataGridProcessedProps, 'pagination'>) => void;
