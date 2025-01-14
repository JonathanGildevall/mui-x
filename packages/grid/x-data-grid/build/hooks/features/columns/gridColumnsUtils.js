import _extends from "@babel/runtime/helpers/esm/extends";
import { DEFAULT_GRID_COL_TYPE_KEY, getGridDefaultColumnTypes } from '../../../colDef';
import { gridColumnsSelector, gridColumnVisibilityModelSelector } from './gridColumnsSelector';
import { clamp } from '../../../utils/utils';
export const COLUMNS_DIMENSION_PROPERTIES = ['maxWidth', 'minWidth', 'width', 'flex'];
export const computeColumnTypes = (customColumnTypes = {}) => {
  const mergedColumnTypes = _extends({}, getGridDefaultColumnTypes());

  Object.entries(customColumnTypes).forEach(([colType, colTypeDef]) => {
    if (mergedColumnTypes[colType]) {
      mergedColumnTypes[colType] = _extends({}, mergedColumnTypes[colType], colTypeDef);
    } else {
      mergedColumnTypes[colType] = _extends({}, mergedColumnTypes[colTypeDef.extendType || DEFAULT_GRID_COL_TYPE_KEY], colTypeDef);
    }
  });
  return mergedColumnTypes;
};
/**
 * Computes width for flex columns.
 * Based on CSS Flexbox specification:
 * https://drafts.csswg.org/css-flexbox-1/#resolve-flexible-lengths
 */

export function computeFlexColumnsWidth({
  initialFreeSpace,
  totalFlexUnits,
  flexColumns
}) {
  const flexColumnsLookup = {
    all: {},
    frozenFields: [],
    freeze: field => {
      const value = flexColumnsLookup.all[field];

      if (value && value.frozen !== true) {
        flexColumnsLookup.all[field].frozen = true;
        flexColumnsLookup.frozenFields.push(field);
      }
    }
  }; // Step 5 of https://drafts.csswg.org/css-flexbox-1/#resolve-flexible-lengths

  function loopOverFlexItems() {
    // 5a: If all the flex items on the line are frozen, free space has been distributed.
    if (flexColumnsLookup.frozenFields.length === flexColumns.length) {
      return;
    }

    const violationsLookup = {
      min: {},
      max: {}
    };
    let remainingFreeSpace = initialFreeSpace;
    let flexUnits = totalFlexUnits;
    let totalViolation = 0; // 5b: Calculate the remaining free space

    flexColumnsLookup.frozenFields.forEach(field => {
      remainingFreeSpace -= flexColumnsLookup.all[field].computedWidth;
      flexUnits -= flexColumnsLookup.all[field].flex;
    });

    for (let i = 0; i < flexColumns.length; i += 1) {
      const column = flexColumns[i];

      if (flexColumnsLookup.all[column.field] && flexColumnsLookup.all[column.field].frozen === true) {
        // eslint-disable-next-line no-continue
        continue;
      } // 5c: Distribute remaining free space proportional to the flex factors


      const widthPerFlexUnit = remainingFreeSpace / flexUnits;
      let computedWidth = widthPerFlexUnit * column.flex; // 5d: Fix min/max violations

      if (computedWidth < column.minWidth) {
        totalViolation += column.minWidth - computedWidth;
        computedWidth = column.minWidth;
        violationsLookup.min[column.field] = true;
      } else if (computedWidth > column.maxWidth) {
        totalViolation += column.maxWidth - computedWidth;
        computedWidth = column.maxWidth;
        violationsLookup.max[column.field] = true;
      }

      flexColumnsLookup.all[column.field] = {
        frozen: false,
        computedWidth,
        flex: column.flex
      };
    } // 5e: Freeze over-flexed items


    if (totalViolation < 0) {
      // Freeze all the items with max violations
      Object.keys(violationsLookup.max).forEach(field => {
        flexColumnsLookup.freeze(field);
      });
    } else if (totalViolation > 0) {
      // Freeze all the items with min violations
      Object.keys(violationsLookup.min).forEach(field => {
        flexColumnsLookup.freeze(field);
      });
    } else {
      // Freeze all items
      flexColumns.forEach(({
        field
      }) => {
        flexColumnsLookup.freeze(field);
      });
    } // 5f: Return to the start of this loop


    loopOverFlexItems();
  }

  loopOverFlexItems();
  return flexColumnsLookup.all;
}
/**
 * Compute the `computedWidth` (ie: the width the column should have during rendering) based on the `width` / `flex` / `minWidth` / `maxWidth` properties of `GridColDef`.
 * The columns already have been merged with there `type` default values for `minWidth`, `maxWidth` and `width`, thus the `!` for those properties below.
 * TODO: Unit test this function in depth and only keep basic cases for the whole grid testing.
 * TODO: Improve the `GridColDef` typing to reflect the fact that `minWidth` / `maxWidth` and `width` can't be null after the merge with the `type` default values.
 */

export const hydrateColumnsWidth = (rawState, viewportInnerWidth) => {
  const columnsLookup = {};
  let totalFlexUnits = 0;
  let widthAllocatedBeforeFlex = 0;
  const flexColumns = []; // For the non-flex columns, compute their width
  // For the flex columns, compute there minimum width and how much width must be allocated during the flex allocation

  rawState.all.forEach(columnField => {
    const newColumn = _extends({}, rawState.lookup[columnField]);

    if (rawState.columnVisibilityModel[columnField] === false) {
      newColumn.computedWidth = 0;
    } else {
      let computedWidth;

      if (newColumn.flex && newColumn.flex > 0) {
        totalFlexUnits += newColumn.flex;
        computedWidth = 0;
        flexColumns.push(newColumn);
      } else {
        computedWidth = clamp(newColumn.width, newColumn.minWidth, newColumn.maxWidth);
      }

      widthAllocatedBeforeFlex += computedWidth;
      newColumn.computedWidth = computedWidth;
    }

    columnsLookup[columnField] = newColumn;
  });
  const initialFreeSpace = Math.max(viewportInnerWidth - widthAllocatedBeforeFlex, 0); // Allocate the remaining space to the flex columns

  if (totalFlexUnits > 0 && viewportInnerWidth > 0) {
    const computedColumnWidths = computeFlexColumnsWidth({
      initialFreeSpace,
      totalFlexUnits,
      flexColumns
    });
    Object.keys(computedColumnWidths).forEach(field => {
      columnsLookup[field].computedWidth = computedColumnWidths[field].computedWidth;
    });
  }

  return _extends({}, rawState, {
    lookup: columnsLookup
  });
};
let columnTypeWarnedOnce = false;
/**
 * Apply the order and the dimensions of the initial state.
 * The columns not registered in `orderedFields` will be placed after the imported columns.
 */

export const applyInitialState = (columnsState, initialState) => {
  if (!initialState) {
    return columnsState;
  }

  const {
    orderedFields = [],
    dimensions = {}
  } = initialState;
  const columnsWithUpdatedDimensions = Object.keys(dimensions);

  if (columnsWithUpdatedDimensions.length === 0 && orderedFields.length === 0) {
    return columnsState;
  }

  const orderedFieldsLookup = {};
  const cleanOrderedFields = [];

  for (let i = 0; i < orderedFields.length; i += 1) {
    const field = orderedFields[i]; // Ignores the fields in the initialState that matches no field on the current column state

    if (columnsState.lookup[field]) {
      orderedFieldsLookup[field] = true;
      cleanOrderedFields.push(field);
    }
  }

  const newOrderedFields = cleanOrderedFields.length === 0 ? columnsState.all : [...cleanOrderedFields, ...columnsState.all.filter(field => !orderedFieldsLookup[field])];

  const newColumnLookup = _extends({}, columnsState.lookup);

  for (let i = 0; i < columnsWithUpdatedDimensions.length; i += 1) {
    const field = columnsWithUpdatedDimensions[i];
    newColumnLookup[field] = _extends({}, newColumnLookup[field], dimensions[field], {
      hasBeenResized: true
    });
  }

  const newColumnsState = {
    all: newOrderedFields,
    lookup: newColumnLookup
  };
  return newColumnsState;
};
/**
 * @deprecated Should have been internal only, you can inline the logic.
 */

export const getGridColDef = (columnTypes, type) => {
  if (!type) {
    return columnTypes[DEFAULT_GRID_COL_TYPE_KEY];
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!columnTypeWarnedOnce && !columnTypes[type]) {
      console.warn([`MUI: The column type "${type}" you are using is not supported.`, `Column type "string" is being used instead.`].join('\n'));
      columnTypeWarnedOnce = true;
    }
  }

  if (!columnTypes[type]) {
    return columnTypes[DEFAULT_GRID_COL_TYPE_KEY];
  }

  return columnTypes[type];
};
export const createColumnsState = ({
  apiRef,
  columnsToUpsert,
  initialState,
  columnTypes,
  currentColumnVisibilityModel = gridColumnVisibilityModelSelector(apiRef),
  shouldRegenColumnVisibilityModelFromColumns,
  keepOnlyColumnsToUpsert = false
}) => {
  var _apiRef$current$getRo, _apiRef$current$getRo2, _apiRef$current, _apiRef$current$getRo3;

  const isInsideStateInitializer = !apiRef.current.state.columns;
  let columnsStateWithoutColumnVisibilityModel;

  if (isInsideStateInitializer) {
    columnsStateWithoutColumnVisibilityModel = {
      all: [],
      lookup: {}
    };
  } else {
    const currentState = gridColumnsSelector(apiRef.current.state);
    columnsStateWithoutColumnVisibilityModel = {
      all: keepOnlyColumnsToUpsert ? [] : [...currentState.all],
      lookup: _extends({}, currentState.lookup) // Will be cleaned later if keepOnlyColumnsToUpsert=true

    };
  }

  let columnsToKeep = {};

  if (keepOnlyColumnsToUpsert && !isInsideStateInitializer) {
    columnsToKeep = Object.keys(columnsStateWithoutColumnVisibilityModel.lookup).reduce((acc, key) => _extends({}, acc, {
      [key]: false
    }), {});
  }

  const columnsToUpsertLookup = {};
  columnsToUpsert.forEach(newColumn => {
    const {
      field
    } = newColumn;
    columnsToUpsertLookup[field] = true;
    columnsToKeep[field] = true;
    let existingState = columnsStateWithoutColumnVisibilityModel.lookup[field];

    if (existingState == null) {
      // New Column
      existingState = _extends({}, getGridColDef(columnTypes, newColumn.type), {
        // TODO v6: Inline `getGridColDef`
        field,
        hasBeenResized: false
      });
      columnsStateWithoutColumnVisibilityModel.all.push(field);
    } else if (keepOnlyColumnsToUpsert) {
      columnsStateWithoutColumnVisibilityModel.all.push(field);
    }

    let hasValidDimension = false;

    if (!existingState.hasBeenResized) {
      hasValidDimension = COLUMNS_DIMENSION_PROPERTIES.some(key => newColumn[key] !== undefined);
    }

    columnsStateWithoutColumnVisibilityModel.lookup[field] = _extends({}, existingState, {
      hide: newColumn.hide == null ? false : newColumn.hide
    }, newColumn, {
      hasBeenResized: existingState.hasBeenResized || hasValidDimension
    });
  });

  if (keepOnlyColumnsToUpsert && !isInsideStateInitializer) {
    Object.keys(columnsStateWithoutColumnVisibilityModel.lookup).forEach(field => {
      if (!columnsToKeep[field]) {
        delete columnsStateWithoutColumnVisibilityModel.lookup[field];
      }
    });
  }

  const columnsLookupBeforePreProcessing = _extends({}, columnsStateWithoutColumnVisibilityModel.lookup);

  const columnsStateWithPreProcessing = apiRef.current.unstable_applyPipeProcessors('hydrateColumns', columnsStateWithoutColumnVisibilityModel); // TODO v6: remove the sync between the columns `hide` option and the model.

  let columnVisibilityModel = {};

  if (shouldRegenColumnVisibilityModelFromColumns) {
    let hasModelChanged = false;

    const newColumnVisibilityModel = _extends({}, currentColumnVisibilityModel);

    if (isInsideStateInitializer) {
      columnsStateWithPreProcessing.all.forEach(field => {
        newColumnVisibilityModel[field] = !columnsStateWithoutColumnVisibilityModel.lookup[field].hide;
      });
    } else if (keepOnlyColumnsToUpsert) {
      // At this point, `keepOnlyColumnsToUpsert` has a new meaning: keep the columns
      // passed via `columnToUpsert` + columns added by the pre-processors. We do the following
      // cleanup because a given column may have been removed from the `columns` prop but it still
      // exists in the state.
      Object.keys(newColumnVisibilityModel).forEach(field => {
        if (!columnsStateWithPreProcessing.lookup[field]) {
          delete newColumnVisibilityModel[field];
          hasModelChanged = true;
        }
      });
    }

    columnsStateWithPreProcessing.all.forEach(field => {
      // If neither the `columnsToUpsert` nor the pre-processors updated the column,
      // Then we don't want to update the visibility status of the column in the model.
      if (!columnsToUpsertLookup[field] && columnsLookupBeforePreProcessing[field] === columnsStateWithPreProcessing.lookup[field]) {
        return;
      } // We always assume that a column not in the model is visible by default. However, there's an
      // edge case where the column is not in the model but it also doesn't exist in the `columns`
      // prop, meaning that the column is being added. In that case, we assume that the column was
      // not visible before for it be added to the model.


      let isVisibleBefore = currentColumnVisibilityModel[field];

      if (isVisibleBefore === undefined) {
        if (isInsideStateInitializer) {
          isVisibleBefore = true;
        } else {
          const currentState = gridColumnsSelector(apiRef.current.state);
          isVisibleBefore = !!currentState.lookup[field];
        }
      }

      const isVisibleAfter = !columnsStateWithPreProcessing.lookup[field].hide;

      if (isVisibleAfter !== isVisibleBefore) {
        hasModelChanged = true;
        newColumnVisibilityModel[field] = isVisibleAfter;
      }
    });

    if (hasModelChanged || isInsideStateInitializer) {
      columnVisibilityModel = newColumnVisibilityModel;
    } else {
      columnVisibilityModel = currentColumnVisibilityModel;
    }
  } else {
    columnVisibilityModel = currentColumnVisibilityModel;
  }

  const columnsStateWithPortableColumns = applyInitialState(columnsStateWithPreProcessing, initialState);

  const columnsState = _extends({}, columnsStateWithPortableColumns, {
    columnVisibilityModel
  });

  return hydrateColumnsWidth(columnsState, (_apiRef$current$getRo = (_apiRef$current$getRo2 = (_apiRef$current = apiRef.current).getRootDimensions) == null ? void 0 : (_apiRef$current$getRo3 = _apiRef$current$getRo2.call(_apiRef$current)) == null ? void 0 : _apiRef$current$getRo3.viewportInnerSize.width) != null ? _apiRef$current$getRo : 0);
};
export const mergeColumnsState = columnsState => state => _extends({}, state, {
  columns: columnsState
});