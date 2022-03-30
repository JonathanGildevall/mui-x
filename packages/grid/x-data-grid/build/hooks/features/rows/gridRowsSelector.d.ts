import { GridStateCommunity } from '../../../models/gridStateCommunity';
export declare const gridRowsStateSelector: (state: GridStateCommunity) => import("./gridRowsState").GridRowsState;
export declare const gridRowCountSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, number>;
export declare const gridTopLevelRowCountSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, number>;
export declare const gridRowsLookupSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("../../..").GridRowsLookup<any>>;
export declare const gridRowTreeSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("../../..").GridRowTreeConfig>;
export declare const gridRowGroupingNameSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, string>;
export declare const gridRowTreeDepthSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, number>;
export declare const gridRowIdsSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("../../..").GridRowId[]>;