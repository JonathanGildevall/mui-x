import { arSD as arSDCore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
var arSDGrid = {
  // Root
  noRowsLabel: 'لا توجد صفوف',
  noResultsOverlayLabel: 'لم يتم العثور على نتائج.',
  errorOverlayDefaultLabel: 'حدث خطأ.',
  // Density selector toolbar button text
  toolbarDensity: 'الكثافة',
  toolbarDensityLabel: 'الكثافة',
  toolbarDensityCompact: 'مضغوط',
  toolbarDensityStandard: 'قياسي',
  toolbarDensityComfortable: 'مريح',
  // Columns selector toolbar button text
  toolbarColumns: 'الأعمدة',
  toolbarColumnsLabel: 'حدد أعمدة',
  // Filters toolbar button text
  toolbarFilters: 'المُرشِحات',
  toolbarFiltersLabel: 'إظهار المرشِحات',
  toolbarFiltersTooltipHide: 'إخفاء المرشِحات',
  toolbarFiltersTooltipShow: 'اظهر المرشِحات',
  toolbarFiltersTooltipActive: function toolbarFiltersTooltipActive(count) {
    return count !== 1 ? "".concat(count, " \u0645\u0646 \u0627\u0644\u0645\u0631\u0634\u0650\u062D\u0627\u062A \u0627\u0644\u0646\u0634\u0637\u0629") : "\u0645\u0631\u0634\u0650\u062D \u0646\u0634\u0637";
  },
  // Export selector toolbar button text
  toolbarExport: 'تصدير',
  toolbarExportLabel: 'تصدير',
  toolbarExportCSV: 'تنزيل كملف CSV',
  // toolbarExportPrint: 'Print',
  // Columns panel text
  columnsPanelTextFieldLabel: 'البحث عن العمود',
  columnsPanelTextFieldPlaceholder: 'عنوان العمود',
  columnsPanelDragIconLabel: 'إعادة ترتيب العمود',
  columnsPanelShowAllButton: 'إظهار الكل',
  columnsPanelHideAllButton: 'إخفاء الكل',
  // Filter panel text
  filterPanelAddFilter: 'إضافة مرشِح',
  filterPanelDeleteIconLabel: 'حذف',
  filterPanelLinkOperator: 'عامل منطقي',
  filterPanelOperators: 'عامل',
  // TODO v6: rename to filterPanelOperator
  filterPanelOperatorAnd: 'و',
  filterPanelOperatorOr: 'أو',
  filterPanelColumns: 'الأعمدة',
  filterPanelInputLabel: 'القيمة',
  filterPanelInputPlaceholder: 'ترشِيح قيمة',
  // Filter operators text
  filterOperatorContains: 'يحتوي',
  filterOperatorEquals: 'يساوي',
  filterOperatorStartsWith: 'يبدأ بـ',
  filterOperatorEndsWith: 'ينتهي بـ',
  filterOperatorIs: 'يكون',
  filterOperatorNot: 'ليس',
  filterOperatorAfter: 'بعد',
  filterOperatorOnOrAfter: 'عند أو بعد',
  filterOperatorBefore: 'بعد',
  filterOperatorOnOrBefore: 'عند أو قبل',
  filterOperatorIsEmpty: 'خالي',
  filterOperatorIsNotEmpty: 'غير خالي',
  filterOperatorIsAnyOf: 'أي من',
  // Filter values text
  filterValueAny: 'أي',
  filterValueTrue: 'صائب',
  filterValueFalse: 'خاطئ',
  // Column menu text
  columnMenuLabel: 'القائمة',
  columnMenuShowColumns: 'إظهار الأعمدة',
  columnMenuFilter: 'المرشِح',
  columnMenuHideColumn: 'إخفاء',
  columnMenuUnsort: 'الغاء الفرز',
  columnMenuSortAsc: 'الفرز تصاعدياً',
  columnMenuSortDesc: 'الفرز تنازلياً',
  // Column header text
  columnHeaderFiltersTooltipActive: function columnHeaderFiltersTooltipActive(count) {
    return count !== 1 ? "".concat(count, " \u0645\u0646 \u0627\u0644\u0645\u0631\u0634\u0650\u062D\u0627\u062A \u0627\u0644\u0646\u0634\u0637\u0629") : "\u0645\u0631\u0634\u0650\u062D \u0646\u0634\u0637";
  },
  columnHeaderFiltersLabel: 'إظهار المرشحات',
  columnHeaderSortIconLabel: 'فرز',
  // Rows selected footer text
  footerRowSelected: function footerRowSelected(count) {
    return count !== 1 ? "\u062A\u0645 \u062A\u062D\u062F\u064A\u062F ".concat(count.toLocaleString(), " \u0645\u0646 \u0627\u0644\u0635\u0641\u0648\u0641") : "\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0635\u0641 \u0648\u0627\u062D\u062F";
  },
  // Total row amount footer text
  footerTotalRows: 'إجمالي الصفوف:',
  // Total visible row amount footer text
  footerTotalVisibleRows: function footerTotalVisibleRows(visibleCount, totalCount) {
    return "".concat(visibleCount.toLocaleString(), " \u0645\u0646 ").concat(totalCount.toLocaleString());
  },
  // Checkbox selection text
  checkboxSelectionHeaderName: 'تحديد خانة الاختيار',
  checkboxSelectionSelectAllRows: 'تحديد كل الصفوف',
  checkboxSelectionUnselectAllRows: 'الغاء تحديد كل الصفوف',
  checkboxSelectionSelectRow: 'تحديد صف',
  checkboxSelectionUnselectRow: 'الغاء تحديد الصف',
  // Boolean cell text
  booleanCellTrueLabel: 'نعم',
  booleanCellFalseLabel: 'لا',
  // Actions cell more text
  actionsCellMore: 'المزيد',
  // Column pinning text
  pinToLeft: 'التدبيس يميناً',
  pinToRight: 'التدبيس يساراً',
  unpin: 'الغاء التدبيس',
  // Tree Data
  treeDataGroupingHeaderName: 'تجميع',
  treeDataExpand: 'رؤية الأبناء',
  treeDataCollapse: 'إخفاء الأبناء',
  // Grouping columns
  groupingColumnHeaderName: 'تجميع',
  groupColumn: function groupColumn(name) {
    return "\u062A\u062C\u0645\u064A\u0639 \u062D\u0633\u0628 ".concat(name);
  },
  unGroupColumn: function unGroupColumn(name) {
    return "\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062A\u062C\u0645\u064A\u0639 \u062D\u0633\u0628 ".concat(name);
  },
  // Master/detail
  expandDetailPanel: 'توسيع',
  collapseDetailPanel: 'طوي'
};
export var arSD = getGridLocalization(arSDGrid, arSDCore);