import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { useForkRef } from '@mui/material/utils';
import { useGridApiContext } from '../../utils/useGridApiContext';
import { useGridSelector } from '../../utils/useGridSelector';
import { gridVisibleColumnDefinitionsSelector, gridColumnPositionsSelector } from '../columns/gridColumnsSelector';
import { gridTabIndexColumnHeaderSelector, gridTabIndexCellSelector, gridFocusColumnHeaderSelector } from '../focus/gridFocusStateSelector';
import { gridDensityHeaderHeightSelector } from '../density/densitySelector';
import { gridFilterActiveItemsLookupSelector } from '../filter/gridFilterSelector';
import { gridSortColumnLookupSelector } from '../sorting/gridSortingSelector';
import { gridColumnMenuSelector } from '../columnMenu/columnMenuSelector';
import { useGridRootProps } from '../../utils/useGridRootProps';
import { useGridApiEventHandler } from '../../utils/useGridApiEventHandler';
import { GridEvents } from '../../../models/events';
import { GridColumnHeaderItem } from '../../../components/columnHeaders/GridColumnHeaderItem';
import { jsx as _jsx } from "react/jsx-runtime";
export var useGridColumnHeaders = function useGridColumnHeaders(props) {
  var innerRefProp = props.innerRef,
      _props$minColumnIndex = props.minColumnIndex,
      minColumnIndex = _props$minColumnIndex === void 0 ? 0 : _props$minColumnIndex;

  var _React$useState = React.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      dragCol = _React$useState2[0],
      setDragCol = _React$useState2[1];

  var _React$useState3 = React.useState(''),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      resizeCol = _React$useState4[0],
      setResizeCol = _React$useState4[1];

  var apiRef = useGridApiContext();
  var visibleColumns = useGridSelector(apiRef, gridVisibleColumnDefinitionsSelector);
  var columnPositions = useGridSelector(apiRef, gridColumnPositionsSelector);
  var tabIndexState = useGridSelector(apiRef, gridTabIndexColumnHeaderSelector);
  var cellTabIndexState = useGridSelector(apiRef, gridTabIndexCellSelector);
  var columnHeaderFocus = useGridSelector(apiRef, gridFocusColumnHeaderSelector);
  var headerHeight = useGridSelector(apiRef, gridDensityHeaderHeightSelector);
  var filterColumnLookup = useGridSelector(apiRef, gridFilterActiveItemsLookupSelector);
  var sortColumnLookup = useGridSelector(apiRef, gridSortColumnLookupSelector);
  var columnMenuState = useGridSelector(apiRef, gridColumnMenuSelector);
  var rootProps = useGridRootProps();
  var innerRef = React.useRef(null);
  var handleInnerRef = useForkRef(innerRefProp, innerRef);

  var _React$useState5 = React.useState(null),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      renderContext = _React$useState6[0],
      setRenderContext = _React$useState6[1];

  var prevRenderContext = React.useRef(renderContext);
  var prevScrollLeft = React.useRef(0);
  React.useEffect(function () {
    apiRef.current.columnHeadersContainerElementRef.current.scrollLeft = 0;
  }, [apiRef]);
  var updateInnerPosition = React.useCallback(function (nextRenderContext) {
    var firstColumnToRender = Math.max(nextRenderContext.firstColumnIndex - rootProps.columnBuffer, minColumnIndex);
    var offset = firstColumnToRender > 0 ? prevScrollLeft.current - columnPositions[firstColumnToRender] : prevScrollLeft.current;
    innerRef.current.style.transform = "translate3d(".concat(-offset, "px, 0px, 0px)");
  }, [columnPositions, minColumnIndex, rootProps.columnBuffer]);
  var handleScroll = React.useCallback(function (_ref) {
    var _prevRenderContext$cu, _prevRenderContext$cu2;

    var left = _ref.left,
        _ref$renderContext = _ref.renderContext,
        nextRenderContext = _ref$renderContext === void 0 ? null : _ref$renderContext;

    if (!innerRef.current) {
      return;
    } // Ignore vertical scroll.
    // Excepts the first event which sets the previous render context.


    if (prevScrollLeft.current === left && ((_prevRenderContext$cu = prevRenderContext.current) == null ? void 0 : _prevRenderContext$cu.firstColumnIndex) === (nextRenderContext == null ? void 0 : nextRenderContext.firstColumnIndex) && ((_prevRenderContext$cu2 = prevRenderContext.current) == null ? void 0 : _prevRenderContext$cu2.lastColumnIndex) === (nextRenderContext == null ? void 0 : nextRenderContext.lastColumnIndex)) {
      return;
    }

    prevScrollLeft.current = left;

    if (nextRenderContext !== prevRenderContext.current || !prevRenderContext.current) {
      setRenderContext(nextRenderContext);
      prevRenderContext.current = nextRenderContext;
    } // Pass directly the render context to avoid waiting for the next render


    if (nextRenderContext) {
      updateInnerPosition(nextRenderContext);
    }
  }, [updateInnerPosition]);
  var handleColumnResizeStart = React.useCallback(function (params) {
    return setResizeCol(params.field);
  }, []);
  var handleColumnResizeStop = React.useCallback(function () {
    return setResizeCol('');
  }, []);
  var handleColumnReorderStart = React.useCallback(function (params) {
    return setDragCol(params.field);
  }, []);
  var handleColumnReorderStop = React.useCallback(function () {
    return setDragCol('');
  }, []);
  useGridApiEventHandler(apiRef, GridEvents.columnResizeStart, handleColumnResizeStart);
  useGridApiEventHandler(apiRef, GridEvents.columnResizeStop, handleColumnResizeStop);
  useGridApiEventHandler(apiRef, GridEvents.columnHeaderDragStart, handleColumnReorderStart);
  useGridApiEventHandler(apiRef, GridEvents.columnHeaderDragEnd, handleColumnReorderStop);
  useGridApiEventHandler(apiRef, GridEvents.rowsScroll, handleScroll);

  var getColumns = function getColumns(params) {
    var other = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _ref2 = params || {},
        _ref2$renderContext = _ref2.renderContext,
        nextRenderContext = _ref2$renderContext === void 0 ? renderContext : _ref2$renderContext,
        _ref2$minFirstColumn = _ref2.minFirstColumn,
        minFirstColumn = _ref2$minFirstColumn === void 0 ? minColumnIndex : _ref2$minFirstColumn,
        _ref2$maxLastColumn = _ref2.maxLastColumn,
        maxLastColumn = _ref2$maxLastColumn === void 0 ? visibleColumns.length : _ref2$maxLastColumn;

    if (!nextRenderContext) {
      return null;
    }

    var columns = [];
    var firstColumnToRender = Math.max(nextRenderContext.firstColumnIndex - rootProps.columnBuffer, minFirstColumn);
    var lastColumnToRender = Math.min(nextRenderContext.lastColumnIndex + rootProps.columnBuffer, maxLastColumn);
    var renderedColumns = visibleColumns.slice(firstColumnToRender, lastColumnToRender);

    for (var i = 0; i < renderedColumns.length; i += 1) {
      var column = renderedColumns[i];
      var columnIndex = firstColumnToRender + i;
      var isFirstColumn = columnIndex === 0;
      var hasTabbableElement = !(tabIndexState === null && cellTabIndexState === null);
      var tabIndex = tabIndexState !== null && tabIndexState.field === column.field || isFirstColumn && !hasTabbableElement ? 0 : -1;
      var hasFocus = columnHeaderFocus !== null && columnHeaderFocus.field === column.field;
      var open = columnMenuState.open && columnMenuState.field === column.field;
      columns.push( /*#__PURE__*/_jsx(GridColumnHeaderItem, _extends({}, sortColumnLookup[column.field], {
        columnMenuOpen: open,
        filterItemsCounter: filterColumnLookup[column.field] && filterColumnLookup[column.field].length,
        headerHeight: headerHeight,
        isDragging: column.field === dragCol,
        column: column,
        colIndex: columnIndex,
        isResizing: resizeCol === column.field,
        isLastColumn: columnIndex === visibleColumns.length - 1,
        extendRowFullWidth: !rootProps.disableExtendRowFullWidth,
        hasFocus: hasFocus,
        tabIndex: tabIndex
      }, other), i));
    }

    return columns;
  };

  var rootStyle = {
    minHeight: headerHeight,
    maxHeight: headerHeight,
    lineHeight: "".concat(headerHeight, "px")
  };
  return {
    renderContext: renderContext,
    getColumns: getColumns,
    isDragging: !!dragCol,
    updateInnerPosition: updateInnerPosition,
    getRootProps: function getRootProps() {
      var other = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _extends({
        style: rootStyle
      }, other);
    },
    getInnerProps: function getInnerProps() {
      return {
        ref: handleInnerRef,
        'aria-rowindex': 1,
        role: 'row'
      };
    }
  };
};