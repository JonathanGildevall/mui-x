import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { GridCellCheckboxRenderer } from '../components/columnSelection/GridCellCheckboxRenderer';
import { GridHeaderCheckbox } from '../components/columnSelection/GridHeaderCheckbox';
import { selectedIdsLookupSelector } from '../hooks/features/selection/gridSelectionSelector';
import { GRID_BOOLEAN_COL_DEF } from './gridBooleanColDef';
import { jsx as _jsx } from "react/jsx-runtime";
export const GRID_CHECKBOX_SELECTION_COL_DEF = _extends({}, GRID_BOOLEAN_COL_DEF, {
  field: '__check__',
  type: 'checkboxSelection',
  width: 50,
  resizable: false,
  sortable: false,
  filterable: false,
  disableColumnMenu: true,
  disableReorder: true,
  disableExport: true,
  valueGetter: params => {
    const selectionLookup = selectedIdsLookupSelector(params.api.state, params.api.instanceId);
    return selectionLookup[params.id] !== undefined;
  },
  renderHeader: params => /*#__PURE__*/_jsx(GridHeaderCheckbox, _extends({}, params)),
  renderCell: params => /*#__PURE__*/_jsx(GridCellCheckboxRenderer, _extends({}, params))
});