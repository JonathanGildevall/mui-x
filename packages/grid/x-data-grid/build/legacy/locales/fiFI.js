import { fiFI as fiFICore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
var fiFIGrid = {
  // Root
  noRowsLabel: 'Ei rivejä',
  noResultsOverlayLabel: 'Ei tuloksia.',
  errorOverlayDefaultLabel: 'Tapahtui virhe.',
  // Density selector toolbar button text
  toolbarDensity: 'Density',
  toolbarDensityLabel: 'Tiiveys',
  toolbarDensityCompact: 'Kompakti',
  toolbarDensityStandard: 'Vakio',
  toolbarDensityComfortable: 'Mukava',
  // Columns selector toolbar button text
  toolbarColumns: 'Sarakkeet',
  toolbarColumnsLabel: 'Valitse sarakkeet',
  // Filters toolbar button text
  toolbarFilters: 'Suodattimet',
  toolbarFiltersLabel: 'Näytä suodattimet',
  toolbarFiltersTooltipHide: 'Piilota suodattimet',
  toolbarFiltersTooltipShow: 'Näytä suodattimet',
  toolbarFiltersTooltipActive: function toolbarFiltersTooltipActive(count) {
    return count !== 1 ? "".concat(count, " aktiivista suodatinta") : "".concat(count, " aktiivinen suodatin");
  },
  // Export selector toolbar button text
  toolbarExport: 'Export',
  toolbarExportLabel: 'Export',
  toolbarExportCSV: 'Lataa CSV-muodossa',
  toolbarExportPrint: 'Tulosta',
  // Columns panel text
  columnsPanelTextFieldLabel: 'Etsi sarake',
  columnsPanelTextFieldPlaceholder: 'Sarakkeen otsikko',
  columnsPanelDragIconLabel: 'Järjestä sarake uudelleen',
  columnsPanelShowAllButton: 'Näytä kaikki',
  columnsPanelHideAllButton: 'Piilota kaikki',
  // Filter panel text
  filterPanelAddFilter: 'Lisää suodatin',
  filterPanelDeleteIconLabel: 'Poista',
  // filterPanelLinkOperator: 'Logic operator',
  filterPanelOperators: 'Operaattorit',
  // TODO v6: rename to filterPanelOperator
  filterPanelOperatorAnd: 'Ja',
  filterPanelOperatorOr: 'Tai',
  filterPanelColumns: 'Sarakkeet',
  filterPanelInputLabel: 'Arvo',
  filterPanelInputPlaceholder: 'Suodattimen arvo',
  // Filter operators text
  filterOperatorContains: 'sisältää',
  filterOperatorEquals: 'on yhtä suuri',
  filterOperatorStartsWith: 'alkaa',
  filterOperatorEndsWith: 'päättyy',
  filterOperatorIs: 'on',
  filterOperatorNot: 'ei ole',
  filterOperatorAfter: 'on jälkeen',
  filterOperatorOnOrAfter: 'on sama tai jälkeen',
  filterOperatorBefore: 'on ennen',
  filterOperatorOnOrBefore: 'on sama tai ennen',
  filterOperatorIsEmpty: 'on tyhjä',
  filterOperatorIsNotEmpty: 'ei ole tyhjä',
  // filterOperatorIsAnyOf: 'is any of',
  // Filter values text
  filterValueAny: 'mikä tahansa',
  filterValueTrue: 'tosi',
  filterValueFalse: 'epätosi',
  // Column menu text
  columnMenuLabel: 'Valikko',
  columnMenuShowColumns: 'Näytä sarakkeet',
  columnMenuFilter: 'Suodata',
  columnMenuHideColumn: 'Piilota',
  columnMenuUnsort: 'Poista järjestys',
  columnMenuSortAsc: 'Järjestä laskevasti',
  columnMenuSortDesc: 'Järjestä nousevasti',
  // Column header text
  columnHeaderFiltersTooltipActive: function columnHeaderFiltersTooltipActive(count) {
    return count !== 1 ? "".concat(count, " aktiivista suodatinta") : "".concat(count, " aktiivinen suodatin");
  },
  columnHeaderFiltersLabel: 'Näytä suodattimet',
  columnHeaderSortIconLabel: 'Järjestä',
  // Rows selected footer text
  footerRowSelected: function footerRowSelected(count) {
    return count !== 1 ? "".concat(count.toLocaleString(), " rivi\xE4 valittu") : "".concat(count.toLocaleString(), " rivi valittu");
  },
  // Total row amount footer text
  footerTotalRows: 'Rivejä yhteensä:',
  // Total visible row amount footer text
  footerTotalVisibleRows: function footerTotalVisibleRows(visibleCount, totalCount) {
    return "".concat(visibleCount.toLocaleString(), " / ").concat(totalCount.toLocaleString());
  },
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Valintaruutu',
  // checkboxSelectionSelectAllRows: 'Select all rows',
  // checkboxSelectionUnselectAllRows: 'Unselect all rows',
  // checkboxSelectionSelectRow: 'Select row',
  // checkboxSelectionUnselectRow: 'Unselect row',
  // Boolean cell text
  booleanCellTrueLabel: 'tosi',
  booleanCellFalseLabel: 'epätosi',
  // Actions cell more text
  actionsCellMore: 'lisää',
  // Column pinning text
  pinToLeft: 'Kiinnitä vasemmalle',
  pinToRight: 'Kiinnitä oikealle',
  unpin: 'Irrota kiinnitys',
  // Tree Data
  treeDataGroupingHeaderName: 'Ryhmä',
  treeDataExpand: 'Laajenna',
  treeDataCollapse: 'Supista' // Grouping columns
  // groupingColumnHeaderName: 'Group',
  // groupColumn: name => `Group by ${name}`,
  // unGroupColumn: name => `Stop grouping by ${name}`,
  // Master/detail
  // expandDetailPanel: 'Expand',
  // collapseDetailPanel: 'Collapse',

};
export var fiFI = getGridLocalization(fiFIGrid, fiFICore);