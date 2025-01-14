import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["id", "value", "formattedValue", "api", "field", "row", "rowNode", "colDef", "cellMode", "isEditable", "tabIndex", "className", "getValue", "hasFocus", "isValidating", "isProcessingProps", "error"];
import * as React from 'react';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { unstable_useId as useId, unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['editBooleanCell']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

export function GridEditBooleanCell(props) {
  var _rootProps$components;

  var idProp = props.id,
      value = props.value,
      formattedValue = props.formattedValue,
      api = props.api,
      field = props.field,
      row = props.row,
      rowNode = props.rowNode,
      colDef = props.colDef,
      cellMode = props.cellMode,
      isEditable = props.isEditable,
      tabIndex = props.tabIndex,
      className = props.className,
      getValue = props.getValue,
      hasFocus = props.hasFocus,
      isValidating = props.isValidating,
      isProcessingProps = props.isProcessingProps,
      error = props.error,
      other = _objectWithoutProperties(props, _excluded);

  var inputRef = React.useRef(null);
  var id = useId();

  var _React$useState = React.useState(value),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      valueState = _React$useState2[0],
      setValueState = _React$useState2[1];

  var rootProps = useGridRootProps();
  var ownerState = {
    classes: rootProps.classes
  };
  var classes = useUtilityClasses(ownerState);
  var handleChange = React.useCallback(function (event) {
    var newValue = event.target.checked;
    setValueState(newValue);
    api.setEditCellValue({
      id: idProp,
      field: field,
      value: newValue
    }, event);
  }, [api, field, idProp]);
  React.useEffect(function () {
    setValueState(value);
  }, [value]);
  useEnhancedEffect(function () {
    if (hasFocus) {
      inputRef.current.focus();
    }
  }, [hasFocus]);
  return /*#__PURE__*/_jsx("label", _extends({
    htmlFor: id,
    className: clsx(classes.root, className)
  }, other, {
    children: /*#__PURE__*/_jsx(rootProps.components.BaseCheckbox, _extends({
      id: id,
      inputRef: inputRef,
      checked: Boolean(valueState),
      onChange: handleChange,
      size: "small"
    }, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseCheckbox))
  }));
}
export var renderEditBooleanCell = function renderEditBooleanCell(params) {
  return /*#__PURE__*/_jsx(GridEditBooleanCell, _extends({}, params));
};