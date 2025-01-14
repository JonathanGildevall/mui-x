"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridEditBooleanCell = GridEditBooleanCell;
exports.renderEditBooleanCell = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _material = require("@mui/material");

var _utils = require("@mui/material/utils");

var _gridClasses = require("../../constants/gridClasses");

var _useGridRootProps = require("../../hooks/utils/useGridRootProps");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["id", "value", "formattedValue", "api", "field", "row", "rowNode", "colDef", "cellMode", "isEditable", "tabIndex", "className", "getValue", "hasFocus", "isValidating", "isProcessingProps", "error"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['editBooleanCell']
  };
  return (0, _material.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};

function GridEditBooleanCell(props) {
  var _rootProps$components;

  const {
    id: idProp,
    value,
    api,
    field,
    className,
    hasFocus
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const inputRef = React.useRef(null);
  const id = (0, _utils.unstable_useId)();
  const [valueState, setValueState] = React.useState(value);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ownerState = {
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);
  const handleChange = React.useCallback(event => {
    const newValue = event.target.checked;
    setValueState(newValue);
    api.setEditCellValue({
      id: idProp,
      field,
      value: newValue
    }, event);
  }, [api, field, idProp]);
  React.useEffect(() => {
    setValueState(value);
  }, [value]);
  (0, _utils.unstable_useEnhancedEffect)(() => {
    if (hasFocus) {
      inputRef.current.focus();
    }
  }, [hasFocus]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("label", (0, _extends2.default)({
    htmlFor: id,
    className: (0, _clsx.default)(classes.root, className)
  }, other, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.BaseCheckbox, (0, _extends2.default)({
      id: id,
      inputRef: inputRef,
      checked: Boolean(valueState),
      onChange: handleChange,
      size: "small"
    }, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseCheckbox))
  }));
}

const renderEditBooleanCell = params => /*#__PURE__*/(0, _jsxRuntime.jsx)(GridEditBooleanCell, (0, _extends2.default)({}, params));

exports.renderEditBooleanCell = renderEditBooleanCell;