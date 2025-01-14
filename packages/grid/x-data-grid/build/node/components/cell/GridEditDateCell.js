"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridEditDateCell = GridEditDateCell;
exports.renderEditDateCell = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _material = require("@mui/material");

var _utils = require("@mui/material/utils");

var _InputBase = _interopRequireDefault(require("@mui/material/InputBase"));

var _gridClasses = require("../../constants/gridClasses");

var _useGridRootProps = require("../../hooks/utils/useGridRootProps");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["id", "value", "formattedValue", "api", "field", "row", "rowNode", "colDef", "cellMode", "isEditable", "tabIndex", "hasFocus", "getValue", "inputProps", "isValidating", "isProcessingProps"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['editInputCell']
  };
  return (0, _material.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};

function GridEditDateCell(props) {
  const {
    id,
    value: valueProp,
    api,
    field,
    colDef,
    hasFocus,
    inputProps
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const isDateTime = colDef.type === 'dateTime';
  const inputRef = React.useRef();
  const valueTransformed = React.useMemo(() => {
    let parsedDate;

    if (valueProp == null) {
      parsedDate = null;
    } else if (valueProp instanceof Date) {
      parsedDate = valueProp;
    } else {
      parsedDate = new Date((valueProp != null ? valueProp : '').toString());
    }

    let formattedDate;

    if (parsedDate == null || Number.isNaN(parsedDate.getTime())) {
      formattedDate = '';
    } else {
      const localDate = new Date(parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60 * 1000);
      formattedDate = localDate.toISOString().substr(0, isDateTime ? 16 : 10);
    }

    return {
      parsed: parsedDate,
      formatted: formattedDate
    };
  }, [valueProp, isDateTime]);
  const [valueState, setValueState] = React.useState(valueTransformed);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ownerState = {
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);
  const handleChange = React.useCallback(event => {
    const newFormattedDate = event.target.value;
    let newParsedDate;

    if (newFormattedDate === '') {
      newParsedDate = null;
    } else {
      const [date, time] = newFormattedDate.split('T');
      const [year, month, day] = date.split('-');
      newParsedDate = new Date();
      newParsedDate.setFullYear(year, Number(month) - 1, day);
      newParsedDate.setHours(0, 0, 0, 0);

      if (time) {
        const [hours, minutes] = time.split(':');
        newParsedDate.setHours(Number(hours), Number(minutes), 0, 0);
      }
    }

    setValueState({
      parsed: newParsedDate,
      formatted: newFormattedDate
    });
    api.setEditCellValue({
      id,
      field,
      value: newParsedDate
    }, event);
  }, [api, field, id]);
  React.useEffect(() => {
    setValueState(state => {
      var _valueTransformed$par, _state$parsed;

      if (valueTransformed.parsed !== state.parsed && ((_valueTransformed$par = valueTransformed.parsed) == null ? void 0 : _valueTransformed$par.getTime()) !== ((_state$parsed = state.parsed) == null ? void 0 : _state$parsed.getTime())) {
        return valueTransformed;
      }

      return state;
    });
  }, [valueTransformed]);
  (0, _utils.unstable_useEnhancedEffect)(() => {
    if (hasFocus) {
      inputRef.current.focus();
    }
  }, [hasFocus]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputBase.default, (0, _extends2.default)({
    inputRef: inputRef,
    fullWidth: true,
    className: classes.root,
    type: isDateTime ? 'datetime-local' : 'date',
    inputProps: (0, _extends2.default)({
      max: isDateTime ? '9999-12-31T23:59' : '9999-12-31'
    }, inputProps),
    value: valueState.formatted,
    onChange: handleChange
  }, other));
}

const renderEditDateCell = params => /*#__PURE__*/(0, _jsxRuntime.jsx)(GridEditDateCell, (0, _extends2.default)({}, params));

exports.renderEditDateCell = renderEditDateCell;