import { daDK as daDKCore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
var daDKGrid = {
  // Root
  noRowsLabel: 'Ingen rækker',
  noResultsOverlayLabel: 'Ingen resultater',
  errorOverlayDefaultLabel: 'Der skete en fejl.',
  // Density selector toolbar button text
  toolbarDensity: 'Tæthed',
  toolbarDensityLabel: 'Tæthed',
  toolbarDensityCompact: 'Kompakt',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Luftig',
  // Columns selector toolbar button text
  toolbarColumns: 'Kolonne',
  toolbarColumnsLabel: 'Vælg kolonne',
  // Filters toolbar button text
  toolbarFilters: 'Filtre',
  toolbarFiltersLabel: 'Vis filtre',
  toolbarFiltersTooltipHide: 'Skjul filtre',
  toolbarFiltersTooltipShow: 'Vis filtre',
  toolbarFiltersTooltipActive: function toolbarFiltersTooltipActive(count) {
    return count !== 1 ? "".concat(count, " aktive filtre") : "".concat(count, " aktivt filter");
  },
  // Export selector toolbar button text
  // toolbarExport: 'Export',
  toolbarExportLabel: 'Eksporter',
  toolbarExportCSV: 'Download som CSV',
  toolbarExportPrint: 'Print',
  // Columns panel text
  columnsPanelTextFieldLabel: 'Find kolonne',
  columnsPanelTextFieldPlaceholder: 'Kolonne titel',
  columnsPanelDragIconLabel: 'Reorder kolonne',
  columnsPanelShowAllButton: 'Vis alle',
  columnsPanelHideAllButton: 'Skjul alle',
  // Filter panel text
  filterPanelAddFilter: 'Tilføj filter',
  filterPanelDeleteIconLabel: 'Slet',
  filterPanelLinkOperator: 'Logisk operator',
  filterPanelOperators: 'Operatorer',
  // TODO v6: rename to filterPanelOperator
  filterPanelOperatorAnd: 'Og',
  filterPanelOperatorOr: 'Eller',
  filterPanelColumns: 'Kolonne',
  filterPanelInputLabel: 'Værdi',
  filterPanelInputPlaceholder: 'Filter værdi',
  // Filter operators text
  filterOperatorContains: 'Indeholder',
  filterOperatorEquals: 'Lig med',
  filterOperatorStartsWith: 'Begynder med',
  filterOperatorEndsWith: 'Ender med',
  filterOperatorIs: 'Er lig med',
  filterOperatorNot: 'Er ikke lig med',
  filterOperatorAfter: 'Efter',
  filterOperatorOnOrAfter: 'På eller efter',
  filterOperatorBefore: 'Før',
  filterOperatorOnOrBefore: 'På eller før',
  filterOperatorIsEmpty: 'Indeholder ikke data',
  filterOperatorIsNotEmpty: 'Indeholder data',
  filterOperatorIsAnyOf: 'indeholder en af',
  // Filter values text
  filterValueAny: 'hvilken som helst',
  filterValueTrue: 'positiv',
  filterValueFalse: 'negativ',
  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Vis Kolonner',
  columnMenuFilter: 'Filtre',
  columnMenuHideColumn: 'Skjul',
  columnMenuUnsort: 'Fjern sortering',
  columnMenuSortAsc: 'Sorter stigende',
  columnMenuSortDesc: 'Sorter faldende',
  // Column header text
  columnHeaderFiltersTooltipActive: function columnHeaderFiltersTooltipActive(count) {
    return count !== 1 ? "".concat(count, " aktive filtre") : "\xC9t aktivt filter";
  },
  columnHeaderFiltersLabel: 'Vis filtre',
  columnHeaderSortIconLabel: 'Sorter',
  // Rows selected footer text
  footerRowSelected: function footerRowSelected(count) {
    return count !== 1 ? "".concat(count.toLocaleString(), " r\xE6kker valgt") : "\xC9n r\xE6kke valgt";
  },
  // Total row amount footer text
  footerTotalRows: 'Antal rækker i alt:',
  // Total visible row amount footer text
  footerTotalVisibleRows: function footerTotalVisibleRows(visibleCount, totalCount) {
    return "".concat(visibleCount.toLocaleString(), " af ").concat(totalCount.toLocaleString());
  },
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Afkrydsningsvalg',
  checkboxSelectionSelectAllRows: 'Vælg alle rækker',
  checkboxSelectionUnselectAllRows: 'Fravælg alle rækker',
  checkboxSelectionSelectRow: 'Vælg række',
  checkboxSelectionUnselectRow: 'Fravælg række',
  // Boolean cell text
  booleanCellTrueLabel: 'ja',
  booleanCellFalseLabel: 'nej',
  // Actions cell more text
  actionsCellMore: 'mere',
  // Column pinning text
  pinToLeft: 'Fastgør til venstre',
  pinToRight: 'Fastgør til højre',
  unpin: 'Frigiv',
  // Tree Data
  treeDataGroupingHeaderName: 'Gruppering',
  treeDataExpand: 'Vis underelementer',
  treeDataCollapse: 'Skjul underelementer',
  // Grouping columns
  groupingColumnHeaderName: 'Gruppér',
  groupColumn: function groupColumn(name) {
    return "Grupp\xE9r efter ".concat(name);
  },
  unGroupColumn: function unGroupColumn(name) {
    return "Fjern grupp\xE9ring efter ".concat(name);
  },
  // Master/detail
  expandDetailPanel: 'Udvid',
  collapseDetailPanel: 'Kollaps'
};
export var daDK = getGridLocalization(daDKGrid, daDKCore);