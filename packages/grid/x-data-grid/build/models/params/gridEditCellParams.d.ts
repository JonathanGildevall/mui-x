import { GridEditCellProps } from '../gridEditRowModel';
import { GridRowId } from '../gridRows';
import { GridCellParams } from './gridCellParams';
export interface GridEditCellPropsParams {
    id: GridRowId;
    field: string;
    props: GridEditCellProps;
}
/**
 * Params passed to `apiRef.current.setEditCellValue`.
 */
export interface GridEditCellValueParams {
    /**
     * The row id.
     */
    id: GridRowId;
    /**
     * The field.
     */
    field: string;
    /**
     * The new value for the cell.
     */
    value: any;
    /**
     * The debounce time in milliseconds.
     */
    debounceMs?: number;
}
export interface GridCommitCellChangeParams {
    id: GridRowId;
    field: string;
}
export interface GridCellEditCommitParams {
    id: GridRowId;
    field: string;
    value: any;
}
declare enum GridCellEditStartReasons {
    enterKeyDown = "enterKeyDown",
    cellDoubleClick = "cellDoubleClick",
    printableKeyDown = "printableKeyDown",
    deleteKeyDown = "deleteKeyDown"
}
/**
 * Params passed to the `cellEditStart` event.
 */
export interface GridCellEditStartParams<V = any, R = any, F = V> extends GridCellParams<V, R, F> {
    /**
     * The reason for this event to be triggered.
     * Only applied if `props.experimentalFeatures.newEditingApi: true`.
     */
    reason?: GridCellEditStartReasons;
}
declare enum GridCellEditStopReasons {
    cellFocusOut = "cellFocusOut",
    escapeKeyDown = "escapeKeyDown",
    enterKeyDown = "enterKeyDown",
    tabKeyDown = "tabKeyDown",
    shiftTabKeyDown = "shiftTabKeyDown"
}
/**
 * Params passed to the `cellEditStop event.
 */
export interface GridCellEditStopParams<V = any, R = any, F = V> extends GridCellParams<V, R, F> {
    /**
     * The reason for this event to be triggered.
     * Only available if `props.experimentalFeatures.newEditingApi: true`.
     */
    reason?: GridCellEditStopReasons;
}
export { GridCellEditStartReasons, GridCellEditStopReasons };
