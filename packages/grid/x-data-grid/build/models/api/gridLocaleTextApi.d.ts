/// <reference types="react" />
import { ComponentsPropsList } from '@mui/material/styles';
/**
 * Set the types of the texts in the grid.
 */
export interface GridLocaleText {
    noRowsLabel: string;
    noResultsOverlayLabel: string;
    errorOverlayDefaultLabel: string;
    toolbarDensity: React.ReactNode;
    toolbarDensityLabel: string;
    toolbarDensityCompact: string;
    toolbarDensityStandard: string;
    toolbarDensityComfortable: string;
    toolbarColumns: React.ReactNode;
    toolbarColumnsLabel: string;
    toolbarFilters: React.ReactNode;
    toolbarFiltersLabel: string;
    toolbarFiltersTooltipHide: React.ReactNode;
    toolbarFiltersTooltipShow: React.ReactNode;
    toolbarFiltersTooltipActive: (count: number) => React.ReactNode;
    toolbarExport: React.ReactNode;
    toolbarExportLabel: string;
    toolbarExportCSV: React.ReactNode;
    toolbarExportPrint: React.ReactNode;
    columnsPanelTextFieldLabel: string;
    columnsPanelTextFieldPlaceholder: string;
    columnsPanelDragIconLabel: string;
    columnsPanelShowAllButton: React.ReactNode;
    columnsPanelHideAllButton: React.ReactNode;
    filterPanelAddFilter: React.ReactNode;
    filterPanelDeleteIconLabel: string;
    filterPanelLinkOperator: string;
    filterPanelOperators: React.ReactNode;
    filterPanelOperatorAnd: React.ReactNode;
    filterPanelOperatorOr: React.ReactNode;
    filterPanelColumns: React.ReactNode;
    filterPanelInputLabel: string;
    filterPanelInputPlaceholder: string;
    filterOperatorContains: string;
    filterOperatorEquals: string;
    filterOperatorStartsWith: string;
    filterOperatorEndsWith: string;
    filterOperatorIs: string;
    filterOperatorNot: string;
    filterOperatorAfter: string;
    filterOperatorOnOrAfter: string;
    filterOperatorBefore: string;
    filterOperatorOnOrBefore: string;
    filterOperatorIsEmpty: string;
    filterOperatorIsNotEmpty: string;
    filterOperatorIsAnyOf: string;
    filterValueAny: string;
    filterValueTrue: string;
    filterValueFalse: string;
    columnMenuLabel: string;
    columnMenuShowColumns: React.ReactNode;
    columnMenuFilter: React.ReactNode;
    columnMenuHideColumn: React.ReactNode;
    columnMenuUnsort: React.ReactNode;
    columnMenuSortAsc: React.ReactNode;
    columnMenuSortDesc: React.ReactNode;
    columnHeaderFiltersTooltipActive: (count: number) => React.ReactNode;
    columnHeaderFiltersLabel: string;
    columnHeaderSortIconLabel: string;
    footerRowSelected: (count: number) => React.ReactNode;
    footerTotalRows: React.ReactNode;
    footerTotalVisibleRows: (visibleCount: number, totalCount: number) => React.ReactNode;
    checkboxSelectionHeaderName: string;
    checkboxSelectionSelectAllRows: string;
    checkboxSelectionUnselectAllRows: string;
    checkboxSelectionSelectRow: string;
    checkboxSelectionUnselectRow: string;
    booleanCellTrueLabel: string;
    booleanCellFalseLabel: string;
    actionsCellMore: string;
    pinToLeft: string;
    pinToRight: string;
    unpin: string;
    treeDataGroupingHeaderName: string;
    treeDataExpand: string;
    treeDataCollapse: string;
    groupingColumnHeaderName: string;
    groupColumn: (name: string) => string;
    unGroupColumn: (name: string) => string;
    expandDetailPanel: string;
    collapseDetailPanel: string;
    MuiTablePagination: Omit<ComponentsPropsList['MuiTablePagination'], 'page' | 'count' | 'onChangePage' | 'rowsPerPage' | 'onPageChange'>;
}
export declare type GridTranslationKeys = keyof GridLocaleText;
/**
 * The grid locale text API [[apiRef]].
 */
export interface GridLocaleTextApi {
    /**
     * Returns the translation for the `key`.
     * @param {T} key One of the keys in [[GridLocaleText]].
     * @returns {GridLocaleText[T]} The translated value.
     */
    getLocaleText: <T extends GridTranslationKeys>(key: T) => GridLocaleText[T];
}
