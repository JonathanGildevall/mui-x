import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["selected", "rowId", "row", "index", "style", "rowHeight", "className", "visibleColumns", "renderedColumns", "containerWidth", "firstColumnToRender", "lastColumnToRender", "cellFocus", "cellTabIndex", "editRowsState", "isLastVisible", "onClick", "onDoubleClick", "onMouseEnter", "onMouseLeave"];

/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable jsx-a11y/interactive-supports-focus */
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { GridEvents } from '../models/events';
import { GridEditModes, GridRowModes, GridCellModes } from '../models/gridEditRowModel';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { getDataGridUtilityClass, gridClasses } from '../constants/gridClasses';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { gridColumnsTotalWidthSelector } from '../hooks/features/columns/gridColumnsSelector';
import { useGridSelector } from '../hooks/utils/useGridSelector';
import { useGridVisibleRows } from '../hooks/utils/useGridVisibleRows';
import { findParentElementFromClassName } from '../utils/domUtils';
import { GRID_CHECKBOX_SELECTION_COL_DEF } from '../colDef/gridCheckboxSelectionColDef';
import { GRID_ACTIONS_COLUMN_TYPE } from '../colDef/gridActionsColDef';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var editable = ownerState.editable,
      editing = ownerState.editing,
      selected = ownerState.selected,
      isLastVisible = ownerState.isLastVisible,
      classes = ownerState.classes;
  var slots = {
    root: ['row', selected && 'selected', editable && 'row--editable', editing && 'row--editing', isLastVisible && 'row--lastVisible']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

var EmptyCell = function EmptyCell(_ref) {
  var width = _ref.width,
      height = _ref.height;

  if (!width || !height) {
    return null;
  }

  var style = {
    width: width,
    height: height
  };
  return /*#__PURE__*/_jsx("div", {
    className: "MuiDataGrid-cell",
    style: style
  }); // TODO change to .MuiDataGrid-emptyCell or .MuiDataGrid-rowFiller
};

function GridRow(props) {
  var _apiRef$current$getRo;

  var selected = props.selected,
      rowId = props.rowId,
      row = props.row,
      index = props.index,
      styleProp = props.style,
      rowHeight = props.rowHeight,
      className = props.className,
      visibleColumns = props.visibleColumns,
      renderedColumns = props.renderedColumns,
      containerWidth = props.containerWidth,
      firstColumnToRender = props.firstColumnToRender,
      lastColumnToRender = props.lastColumnToRender,
      cellFocus = props.cellFocus,
      cellTabIndex = props.cellTabIndex,
      editRowsState = props.editRowsState,
      _props$isLastVisible = props.isLastVisible,
      isLastVisible = _props$isLastVisible === void 0 ? false : _props$isLastVisible,
      onClick = props.onClick,
      onDoubleClick = props.onDoubleClick,
      onMouseEnter = props.onMouseEnter,
      onMouseLeave = props.onMouseLeave,
      other = _objectWithoutProperties(props, _excluded);

  var ariaRowIndex = index + 2; // 1 for the header row and 1 as it's 1-based

  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var currentPage = useGridVisibleRows(apiRef, rootProps);
  var columnsTotalWidth = useGridSelector(apiRef, gridColumnsTotalWidthSelector);

  var _ref2 = (_apiRef$current$getRo = apiRef.current.getRootDimensions()) != null ? _apiRef$current$getRo : {
    hasScrollX: false,
    hasScrollY: false
  },
      hasScrollX = _ref2.hasScrollX,
      hasScrollY = _ref2.hasScrollY;

  var ownerState = {
    selected: selected,
    isLastVisible: isLastVisible,
    classes: rootProps.classes,
    editing: apiRef.current.getRowMode(rowId) === GridRowModes.Edit,
    editable: rootProps.editMode === GridEditModes.Row
  };
  var classes = useUtilityClasses(ownerState);
  var publish = React.useCallback(function (eventName, propHandler) {
    return function (event) {
      // Ignore portal
      // The target is not an element when triggered by a Select inside the cell
      // See https://github.com/mui/material-ui/issues/10534
      if (event.target.nodeType === 1 && !event.currentTarget.contains(event.target)) {
        return;
      } // The row might have been deleted


      if (!apiRef.current.getRow(rowId)) {
        return;
      }

      apiRef.current.publishEvent(eventName, apiRef.current.getRowParams(rowId), event);

      if (propHandler) {
        propHandler(event);
      }
    };
  }, [apiRef, rowId]);
  var publishClick = React.useCallback(function (event) {
    var cell = findParentElementFromClassName(event.target, gridClasses.cell);
    var field = cell == null ? void 0 : cell.getAttribute('data-field'); // Check if the field is available because the cell that fills the empty
    // space of the row has no field.

    if (field) {
      // User clicked in the checkbox added by checkboxSelection
      if (field === GRID_CHECKBOX_SELECTION_COL_DEF.field) {
        return;
      } // User opened a detail panel


      if (field === '__detail_panel_toggle__') {
        return;
      } // User is editing a cell


      if (apiRef.current.getCellMode(rowId, field) === GridCellModes.Edit) {
        return;
      } // User clicked a button from the "actions" column type


      var column = apiRef.current.getColumn(field);

      if (column.type === GRID_ACTIONS_COLUMN_TYPE) {
        return;
      }
    }

    publish(GridEvents.rowClick, onClick)(event);
  }, [apiRef, onClick, publish, rowId]);

  var style = _extends({}, styleProp, {
    maxHeight: rowHeight,
    minHeight: rowHeight
  });

  var sizes = apiRef.current.unstable_getRowInternalSizes(rowId);

  if (sizes != null && sizes.spacingTop) {
    var property = rootProps.rowSpacingType === 'border' ? 'borderTopWidth' : 'marginTop';
    style[property] = sizes.spacingTop;
  }

  if (sizes != null && sizes.spacingBottom) {
    var _property = rootProps.rowSpacingType === 'border' ? 'borderBottomWidth' : 'marginBottom';

    style[_property] = sizes.spacingBottom;
  }

  var rowClassName = null;

  if (typeof rootProps.getRowClassName === 'function') {
    var indexRelativeToCurrentPage = index - currentPage.range.firstRowIndex;

    var rowParams = _extends({}, apiRef.current.getRowParams(rowId), {
      isFirstVisible: indexRelativeToCurrentPage === 0,
      isLastVisible: indexRelativeToCurrentPage === currentPage.rows.length - 1
    });

    rowClassName = rootProps.getRowClassName(rowParams);
  }

  var cells = [];

  for (var i = 0; i < renderedColumns.length; i += 1) {
    var _rootProps$components;

    var column = renderedColumns[i];
    var indexRelativeToAllColumns = firstColumnToRender + i;
    var isLastColumn = indexRelativeToAllColumns === visibleColumns.length - 1;
    var removeLastBorderRight = isLastColumn && hasScrollX && !hasScrollY;
    var showRightBorder = !isLastColumn ? rootProps.showCellRightBorder : !removeLastBorderRight && rootProps.disableExtendRowFullWidth;
    var cellParams = apiRef.current.getCellParams(rowId, column.field);
    var classNames = [];

    if (column.cellClassName) {
      classNames.push(clsx(typeof column.cellClassName === 'function' ? column.cellClassName(cellParams) : column.cellClassName));
    }

    var editCellState = editRowsState[rowId] ? editRowsState[rowId][column.field] : null;
    var content = null;

    if (editCellState == null && column.renderCell) {
      var _rootProps$classes;

      content = column.renderCell(_extends({}, cellParams, {
        api: apiRef.current
      })); // TODO move to GridCell

      classNames.push(clsx(gridClasses['cell--withRenderer'], (_rootProps$classes = rootProps.classes) == null ? void 0 : _rootProps$classes['cell--withRenderer']));
    }

    if (editCellState != null && column.renderEditCell) {
      var _rootProps$classes2;

      var params = _extends({}, cellParams, editCellState, {
        api: apiRef.current
      });

      content = column.renderEditCell(params); // TODO move to GridCell

      classNames.push(clsx(gridClasses['cell--editing'], (_rootProps$classes2 = rootProps.classes) == null ? void 0 : _rootProps$classes2['cell--editing']));
    }

    if (rootProps.getCellClassName) {
      // TODO move to GridCell
      classNames.push(rootProps.getCellClassName(cellParams));
    }

    var hasFocus = cellFocus !== null && cellFocus.id === rowId && cellFocus.field === column.field;
    var tabIndex = cellTabIndex !== null && cellTabIndex.id === rowId && cellTabIndex.field === column.field && cellParams.cellMode === 'view' ? 0 : -1;
    cells.push( /*#__PURE__*/_jsx(rootProps.components.Cell, _extends({
      value: cellParams.value,
      field: column.field,
      width: column.computedWidth,
      rowId: rowId,
      height: rowHeight,
      showRightBorder: showRightBorder,
      formattedValue: cellParams.formattedValue,
      align: column.align || 'left',
      cellMode: cellParams.cellMode,
      colIndex: indexRelativeToAllColumns,
      isEditable: cellParams.isEditable,
      hasFocus: hasFocus,
      tabIndex: tabIndex,
      className: clsx(classNames)
    }, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.cell, {
      children: content
    }), column.field));
  }

  var emptyCellWidth = containerWidth - columnsTotalWidth;
  return /*#__PURE__*/_jsxs("div", _extends({
    "data-id": rowId,
    "data-rowindex": index,
    role: "row",
    className: clsx(rowClassName, classes.root, className),
    "aria-rowindex": ariaRowIndex,
    "aria-selected": selected,
    style: style,
    onClick: publishClick,
    onDoubleClick: publish(GridEvents.rowDoubleClick, onDoubleClick),
    onMouseEnter: publish(GridEvents.rowMouseEnter, onMouseEnter),
    onMouseLeave: publish(GridEvents.rowMouseLeave, onMouseLeave)
  }, other, {
    children: [cells, emptyCellWidth > 0 && /*#__PURE__*/_jsx(EmptyCell, {
      width: emptyCellWidth,
      height: rowHeight
    })]
  }));
}

process.env.NODE_ENV !== "production" ? GridRow.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  cellFocus: PropTypes.object,
  cellTabIndex: PropTypes.object,
  containerWidth: PropTypes.number.isRequired,
  editRowsState: PropTypes.object.isRequired,
  firstColumnToRender: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  isLastVisible: PropTypes.bool,
  lastColumnToRender: PropTypes.number.isRequired,
  renderedColumns: PropTypes.arrayOf(PropTypes.object).isRequired,
  row: PropTypes.any.isRequired,
  rowHeight: PropTypes.number.isRequired,
  rowId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  selected: PropTypes.bool.isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.object).isRequired
} : void 0;
export { GridRow };