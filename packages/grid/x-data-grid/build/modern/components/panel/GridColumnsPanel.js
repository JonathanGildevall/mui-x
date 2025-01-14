import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { switchClasses } from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import { gridColumnDefinitionsSelector, gridColumnVisibilityModelSelector } from '../../hooks/features/columns/gridColumnsSelector';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { GridDragIcon } from '../icons';
import { GridPanelContent } from './GridPanelContent';
import { GridPanelFooter } from './GridPanelFooter';
import { GridPanelHeader } from './GridPanelHeader';
import { GridPanelWrapper } from './GridPanelWrapper';
import { GRID_EXPERIMENTAL_ENABLED } from '../../constants/envConstants';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['columnsPanel'],
    columnsPanelRow: ['columnsPanelRow']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

const GridColumnsPanelRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'ColumnsPanel',
  overridesResolver: (props, styles) => styles.columnsPanel
})(() => ({
  padding: '8px 0px 8px 8px'
}));
const GridColumnsPanelRowRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'ColumnsPanelRow',
  overridesResolver: (props, styles) => styles.columnsPanelRow
})(({
  theme
}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1px 8px 1px 7px',
  [`& .${switchClasses.root}`]: {
    marginRight: theme.spacing(0.5)
  }
}));
const GridIconButtonRoot = styled(IconButton)({
  justifyContent: 'flex-end'
});
export function GridColumnsPanel(props) {
  const apiRef = useGridApiContext();
  const searchInputRef = React.useRef(null);
  const columns = useGridSelector(apiRef, gridColumnDefinitionsSelector);
  const columnVisibilityModel = useGridSelector(apiRef, gridColumnVisibilityModelSelector);
  const rootProps = useGridRootProps();
  const [searchValue, setSearchValue] = React.useState('');
  const ownerState = {
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);

  const toggleColumn = event => {
    const {
      name: field
    } = event.target;
    apiRef.current.setColumnVisibility(field, columnVisibilityModel[field] === false);
  };

  const toggleAllColumns = React.useCallback(isVisible => {
    // TODO v6: call `setColumnVisibilityModel` directly
    apiRef.current.updateColumns(columns.map(col => {
      if (col.hideable !== false) {
        return {
          field: col.field,
          hide: !isVisible
        };
      }

      return col;
    }));
  }, [apiRef, columns]);
  const handleSearchValueChange = React.useCallback(event => {
    setSearchValue(event.target.value);
  }, []);
  const currentColumns = React.useMemo(() => {
    if (!searchValue) {
      return columns;
    }

    const searchValueToCheck = searchValue.toLowerCase();
    return columns.filter(column => (column.headerName || column.field).toLowerCase().indexOf(searchValueToCheck) > -1);
  }, [columns, searchValue]);
  React.useEffect(() => {
    searchInputRef.current.focus();
  }, []);
  return /*#__PURE__*/_jsxs(GridPanelWrapper, _extends({}, props, {
    children: [/*#__PURE__*/_jsx(GridPanelHeader, {
      children: /*#__PURE__*/_jsx(rootProps.components.BaseTextField, _extends({
        label: apiRef.current.getLocaleText('columnsPanelTextFieldLabel'),
        placeholder: apiRef.current.getLocaleText('columnsPanelTextFieldPlaceholder'),
        inputRef: searchInputRef,
        value: searchValue,
        onChange: handleSearchValueChange,
        variant: "standard",
        fullWidth: true
      }, rootProps.componentsProps?.baseTextField))
    }), /*#__PURE__*/_jsx(GridPanelContent, {
      children: /*#__PURE__*/_jsx(GridColumnsPanelRoot, {
        className: classes.root,
        children: currentColumns.map(column => /*#__PURE__*/_jsxs(GridColumnsPanelRowRoot, {
          className: classes.columnsPanelRow,
          children: [/*#__PURE__*/_jsx(FormControlLabel, {
            control: /*#__PURE__*/_jsx(rootProps.components.BaseSwitch, _extends({
              disabled: column.hideable === false,
              checked: columnVisibilityModel[column.field] !== false,
              onClick: toggleColumn,
              name: column.field,
              color: "primary",
              size: "small"
            }, rootProps.componentsProps?.baseSwitch)),
            label: column.headerName || column.field
          }), !rootProps.disableColumnReorder && GRID_EXPERIMENTAL_ENABLED && /*#__PURE__*/_jsx(GridIconButtonRoot, {
            draggable: true,
            "aria-label": apiRef.current.getLocaleText('columnsPanelDragIconLabel'),
            title: apiRef.current.getLocaleText('columnsPanelDragIconLabel'),
            size: "small",
            disabled: true,
            children: /*#__PURE__*/_jsx(GridDragIcon, {})
          })]
        }, column.field))
      })
    }), /*#__PURE__*/_jsxs(GridPanelFooter, {
      children: [/*#__PURE__*/_jsx(rootProps.components.BaseButton, _extends({
        onClick: () => toggleAllColumns(false),
        color: "primary"
      }, rootProps.componentsProps?.baseButton, {
        children: apiRef.current.getLocaleText('columnsPanelHideAllButton')
      })), /*#__PURE__*/_jsx(rootProps.components.BaseButton, _extends({
        onClick: () => toggleAllColumns(true),
        color: "primary"
      }, rootProps.componentsProps?.baseButton, {
        children: apiRef.current.getLocaleText('columnsPanelShowAllButton')
      }))]
    })]
  }));
}