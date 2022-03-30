import _extends from "@babel/runtime/helpers/esm/extends";
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
export const useGridColumnHeaders = props => {
  const {
    innerRef: innerRefProp,
    minColumnIndex = 0
  } = props;
  const [dragCol, setDragCol] = React.useState('');
  const [resizeCol, setResizeCol] = React.useState('');
  const apiRef = useGridApiContext();
  const visibleColumns = useGridSelector(apiRef, gridVisibleColumnDefinitionsSelector);
  const columnPositions = useGridSelector(apiRef, gridColumnPositionsSelector);
  const tabIndexState = useGridSelector(apiRef, gridTabIndexColumnHeaderSelector);
  const cellTabIndexState = useGridSelector(apiRef, gridTabIndexCellSelector);
  const columnHeaderFocus = useGridSelector(apiRef, gridFocusColumnHeaderSelector);
  const headerHeight = useGridSelector(apiRef, gridDensityHeaderHeightSelector);
  const filterColumnLookup = useGridSelector(apiRef, gridFilterActiveItemsLookupSelector);
  const sortColumnLookup = useGridSelector(apiRef, gridSortColumnLookupSelector);
  const columnMenuState = useGridSelector(apiRef, gridColumnMenuSelector);
  const rootProps = useGridRootProps();
  const innerRef = React.useRef(null);
  const handleInnerRef = useForkRef(innerRefProp, innerRef);
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
  useGridApiEventHandler(apiRef, GridEvents.columnResizeStart, handleColumnResizeStart);
  useGridApiEventHandler(apiRef, GridEvents.columnResizeStop, handleColumnResizeStop);
  useGridApiEventHandler(apiRef, GridEvents.columnHeaderDragStart, handleColumnReorderStart);
  useGridApiEventHandler(apiRef, GridEvents.columnHeaderDragEnd, handleColumnReorderStop);
  useGridApiEventHandler(apiRef, GridEvents.rowsScroll, handleScroll);

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
    getRootProps: (other = {}) => _extends({
      style: rootStyle
    }, other),
    getInnerProps: () => ({
      ref: handleInnerRef,
      'aria-rowindex': 1,
      role: 'row'
    })
  };
};