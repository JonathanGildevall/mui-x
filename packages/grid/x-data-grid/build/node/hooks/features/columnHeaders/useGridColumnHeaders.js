"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridColumnHeaders = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _utils = require("@mui/material/utils");

var _useGridApiContext = require("../../utils/useGridApiContext");

var _useGridSelector = require("../../utils/useGridSelector");

var _gridColumnsSelector = require("../columns/gridColumnsSelector");

var _gridFocusStateSelector = require("../focus/gridFocusStateSelector");

var _densitySelector = require("../density/densitySelector");

var _gridFilterSelector = require("../filter/gridFilterSelector");

var _gridSortingSelector = require("../sorting/gridSortingSelector");

var _columnMenuSelector = require("../columnMenu/columnMenuSelector");

var _useGridRootProps = require("../../utils/useGridRootProps");

var _useGridApiEventHandler = require("../../utils/useGridApiEventHandler");

var _events = require("../../../models/events");

var _GridColumnHeaderItem = require("../../../components/columnHeaders/GridColumnHeaderItem");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useGridColumnHeaders = props => {
  const {
    innerRef: innerRefProp,
    minColumnIndex = 0
  } = props;
  const [dragCol, setDragCol] = React.useState('');
  const [resizeCol, setResizeCol] = React.useState('');
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const visibleColumns = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridVisibleColumnDefinitionsSelector);
  const columnPositions = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridColumnPositionsSelector);
  const tabIndexState = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.gridTabIndexColumnHeaderSelector);
  const cellTabIndexState = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.gridTabIndexCellSelector);
  const columnHeaderFocus = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.gridFocusColumnHeaderSelector);
  const headerHeight = (0, _useGridSelector.useGridSelector)(apiRef, _densitySelector.gridDensityHeaderHeightSelector);
  const filterColumnLookup = (0, _useGridSelector.useGridSelector)(apiRef, _gridFilterSelector.gridFilterActiveItemsLookupSelector);
  const sortColumnLookup = (0, _useGridSelector.useGridSelector)(apiRef, _gridSortingSelector.gridSortColumnLookupSelector);
  const columnMenuState = (0, _useGridSelector.useGridSelector)(apiRef, _columnMenuSelector.gridColumnMenuSelector);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const innerRef = React.useRef(null);
  const handleInnerRef = (0, _utils.useForkRef)(innerRefProp, innerRef);
  const [renderContext, setRenderContext] = React.useState(null);
  const prevRenderContext = React.useRef(renderContext);
  const prevScrollLeft = React.useRef(0);
  React.useEffect(() => {
    apiRef.current.columnHeadersContainerElementRef.current.scrollLeft = 0;
  }, [apiRef]);
  const updateInnerPosition = React.useCallback(nextRenderContext => {
    const firstColumnToRender = Math.max(nextRenderContext.firstColumnIndex - rootProps.columnBuffer, minColumnIndex);
    const offset = firstColumnToRender > 0 ? prevScrollLeft.current - columnPositions[firstColumnToRender] : prevScrollLeft.current;
    innerRef.current.style.transform = `translate3d(${-offset}px, 0px, 0px)`;
  }, [columnPositions, minColumnIndex, rootProps.columnBuffer]);
  const handleScroll = React.useCallback(({
    left,
    renderContext: nextRenderContext = null
  }) => {
    var _prevRenderContext$cu, _prevRenderContext$cu2;

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
  const handleColumnResizeStart = React.useCallback(params => setResizeCol(params.field), []);
  const handleColumnResizeStop = React.useCallback(() => setResizeCol(''), []);
  const handleColumnReorderStart = React.useCallback(params => setDragCol(params.field), []);
  const handleColumnReorderStop = React.useCallback(() => setDragCol(''), []);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, _events.GridEvents.columnResizeStart, handleColumnResizeStart);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, _events.GridEvents.columnResizeStop, handleColumnResizeStop);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, _events.GridEvents.columnHeaderDragStart, handleColumnReorderStart);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, _events.GridEvents.columnHeaderDragEnd, handleColumnReorderStop);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, _events.GridEvents.rowsScroll, handleScroll);

  const getColumns = (params, other = {}) => {
    const {
      renderContext: nextRenderContext = renderContext,
      minFirstColumn = minColumnIndex,
      maxLastColumn = visibleColumns.length
    } = params || {};

    if (!nextRenderContext) {
      return null;
    }

    const columns = [];
    const firstColumnToRender = Math.max(nextRenderContext.firstColumnIndex - rootProps.columnBuffer, minFirstColumn);
    const lastColumnToRender = Math.min(nextRenderContext.lastColumnIndex + rootProps.columnBuffer, maxLastColumn);
    const renderedColumns = visibleColumns.slice(firstColumnToRender, lastColumnToRender);

    for (let i = 0; i < renderedColumns.length; i += 1) {
      const column = renderedColumns[i];
      const columnIndex = firstColumnToRender + i;
      const isFirstColumn = columnIndex === 0;
      const hasTabbableElement = !(tabIndexState === null && cellTabIndexState === null);
      const tabIndex = tabIndexState !== null && tabIndexState.field === column.field || isFirstColumn && !hasTabbableElement ? 0 : -1;
      const hasFocus = columnHeaderFocus !== null && columnHeaderFocus.field === column.field;
      const open = columnMenuState.open && columnMenuState.field === column.field;
      columns.push( /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridColumnHeaderItem.GridColumnHeaderItem, (0, _extends2.default)({}, sortColumnLookup[column.field], {
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

  const rootStyle = {
    minHeight: headerHeight,
    maxHeight: headerHeight,
    lineHeight: `${headerHeight}px`
  };
  return {
    renderContext,
    getColumns,
    isDragging: !!dragCol,
    updateInnerPosition,
    getRootProps: (other = {}) => (0, _extends2.default)({
      style: rootStyle
    }, other),
    getInnerProps: () => ({
      ref: handleInnerRef,
      'aria-rowindex': 1,
      role: 'row'
    })
  };
};

exports.useGridColumnHeaders = useGridColumnHeaders;