"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnsPanel = GridColumnsPanel;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _material = require("@mui/material");

var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));

var _Switch = require("@mui/material/Switch");

var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));

var _styles = require("@mui/material/styles");

var _gridColumnsSelector = require("../../hooks/features/columns/gridColumnsSelector");

var _useGridSelector = require("../../hooks/utils/useGridSelector");

var _useGridApiContext = require("../../hooks/utils/useGridApiContext");

var _icons = require("../icons");

var _GridPanelContent = require("./GridPanelContent");

var _GridPanelFooter = require("./GridPanelFooter");

var _GridPanelHeader = require("./GridPanelHeader");

var _GridPanelWrapper = require("./GridPanelWrapper");

var _envConstants = require("../../constants/envConstants");

var _useGridRootProps = require("../../hooks/utils/useGridRootProps");

var _gridClasses = require("../../constants/gridClasses");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['columnsPanel'],
    columnsPanelRow: ['columnsPanelRow']
  };
  return (0, _material.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};

const GridColumnsPanelRoot = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'ColumnsPanel',
  overridesResolver: (props, styles) => styles.columnsPanel
})(() => ({
  padding: '8px 0px 8px 8px'
}));
const GridColumnsPanelRowRoot = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'ColumnsPanelRow',
  overridesResolver: (props, styles) => styles.columnsPanelRow
})(({
  theme
}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1px 8px 1px 7px',
  [`& .${_Switch.switchClasses.root}`]: {
    marginRight: theme.spacing(0.5)
  }
}));
const GridIconButtonRoot = (0, _styles.styled)(_IconButton.default)({
  justifyContent: 'flex-end'
});

function GridColumnsPanel(props) {
  var _rootProps$components, _rootProps$components3, _rootProps$components4;

  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const searchInputRef = React.useRef(null);
  const columns = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridColumnDefinitionsSelector);
  const columnVisibilityModel = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridColumnVisibilityModelSelector);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_GridPanelWrapper.GridPanelWrapper, (0, _extends2.default)({}, props, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_GridPanelHeader.GridPanelHeader, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.BaseTextField, (0, _extends2.default)({
        label: apiRef.current.getLocaleText('columnsPanelTextFieldLabel'),
        placeholder: apiRef.current.getLocaleText('columnsPanelTextFieldPlaceholder'),
        inputRef: searchInputRef,
        value: searchValue,
        onChange: handleSearchValueChange,
        variant: "standard",
        fullWidth: true
      }, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseTextField))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridPanelContent.GridPanelContent, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(GridColumnsPanelRoot, {
        className: classes.root,
        children: currentColumns.map(column => {
          var _rootProps$components2;

          return /*#__PURE__*/(0, _jsxRuntime.jsxs)(GridColumnsPanelRowRoot, {
            className: classes.columnsPanelRow,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FormControlLabel.default, {
              control: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.BaseSwitch, (0, _extends2.default)({
                disabled: column.hideable === false,
                checked: columnVisibilityModel[column.field] !== false,
                onClick: toggleColumn,
                name: column.field,
                color: "primary",
                size: "small"
              }, (_rootProps$components2 = rootProps.componentsProps) == null ? void 0 : _rootProps$components2.baseSwitch)),
              label: column.headerName || column.field
            }), !rootProps.disableColumnReorder && _envConstants.GRID_EXPERIMENTAL_ENABLED && /*#__PURE__*/(0, _jsxRuntime.jsx)(GridIconButtonRoot, {
              draggable: true,
              "aria-label": apiRef.current.getLocaleText('columnsPanelDragIconLabel'),
              title: apiRef.current.getLocaleText('columnsPanelDragIconLabel'),
              size: "small",
              disabled: true,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.GridDragIcon, {})
            })]
          }, column.field);
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_GridPanelFooter.GridPanelFooter, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.BaseButton, (0, _extends2.default)({
        onClick: () => toggleAllColumns(false),
        color: "primary"
      }, (_rootProps$components3 = rootProps.componentsProps) == null ? void 0 : _rootProps$components3.baseButton, {
        children: apiRef.current.getLocaleText('columnsPanelHideAllButton')
      })), /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.BaseButton, (0, _extends2.default)({
        onClick: () => toggleAllColumns(true),
        color: "primary"
      }, (_rootProps$components4 = rootProps.componentsProps) == null ? void 0 : _rootProps$components4.baseButton, {
        children: apiRef.current.getLocaleText('columnsPanelShowAllButton')
      }))]
    })]
  }));
}