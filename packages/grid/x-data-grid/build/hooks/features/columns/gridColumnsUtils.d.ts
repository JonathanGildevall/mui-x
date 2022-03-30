import * as React from 'react';
import { GridColumnsState, GridColumnsRawState, GridColumnVisibilityModel, GridColumnsInitialState } from './gridColumnsInterfaces';
import { GridColType, GridColumnTypesRecord } from '../../../models';
import { GridStateCommunity } from '../../../models/gridStateCommunity';
import { GridApiCommunity } from '../../../models/api/gridApiCommunity';
import { GridColDef } from '../../../models/colDef/gridColDef';
export declare const COLUMNS_DIMENSION_PROPERTIES: readonly ["maxWidth", "minWidth", "width", "flex"];
export declare type GridColumnDimensionProperties = typeof COLUMNS_DIMENSION_PROPERTIES[number];
export declare const computeColumnTypes: (customColumnTypes?: GridColumnTypesRecord) => GridColumnTypesRecord;
/**
 * Computes width for flex columns.
 * Based on CSS Flexbox specification:
 * https://drafts.csswg.org/css-flexbox-1/#resolve-flexible-lengths
 */
export declare function computeFlexColumnsWidth({ initialFreeSpace, totalFlexUnits, flexColumns, }: {
    initialFreeSpace: number;
    totalFlexUnits: number;
    flexColumns: {
        field: GridColDef['field'];
        flex?: number;
        minWidth?: number;
        maxWidth?: number;
    }[];
}): Record<string, {
    flex: number;
    computedWidth: number;
    frozen: boolean;
}>;
/**
 * Compute the `computedWidth` (ie: the width the column should have during rendering) based on the `width` / `flex` / `minWidth` / `maxWidth` properties of `GridColDef`.
 * The columns already have been merged with there `type` default values for `minWidth`, `maxWidth` and `width`, thus the `!` for those properties below.
 * TODO: Unit test this function in depth and only keep basic cases for the whole grid testing.
 * TODO: Improve the `GridColDef` typing to reflect the fact that `minWidth` / `maxWidth` and `width` can't be null after the merge with the `type` default values.
 */
export declare const hydrateColumnsWidth: (rawState: GridColumnsRawState, viewportInnerWidth: number) => GridColumnsState;
/**
 * Apply the order and the dimensions of the initial state.
 * The columns not registered in `orderedFields` will be placed after the imported columns.
 */
export declare const applyInitialState: (columnsState: Omit<GridColumnsRawState, 'columnVisibilityModel'>, initialState: GridColumnsInitialState | undefined) => Omit<GridColumnsRawState, "columnVisibilityModel">;
/**
 * @deprecated Should have been internal only, you can inline the logic.
 */
export declare const getGridColDef: (columnTypes: GridColumnTypesRecord, type: GridColType | undefined) => import("../../../models").GridColTypeDef<any, any>;
export declare const createColumnsState: ({ apiRef, columnsToUpsert, initialState, columnTypes, currentColumnVisibilityModel, shouldRegenColumnVisibilityModelFromColumns, keepOnlyColumnsToUpsert, }: {
    columnsToUpsert: GridColDef[];
    initialState: GridColumnsInitialState | undefined;
    columnTypes: GridColumnTypesRecord;
    currentColumnVisibilityModel?: GridColumnVisibilityModel | undefined;
    shouldRegenColumnVisibilityModelFromColumns: boolean;
    keepOnlyColumnsToUpsert: boolean;
    apiRef: React.MutableRefObject<GridApiCommunity>;
}) => GridColumnsState;
export declare const mergeColumnsState: (columnsState: GridColumnsState) => (state: GridStateCommunity) => GridStateCommunity;
