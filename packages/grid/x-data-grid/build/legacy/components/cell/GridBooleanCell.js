import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["id", "value", "formattedValue", "api", "field", "row", "rowNode", "colDef", "cellMode", "isEditable", "hasFocus", "tabIndex", "getValue"];
import * as React from 'react';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['booleanCell']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

export var GridBooleanCell = /*#__PURE__*/React.memo(function (props) {
  var id = props.id,
      value = props.value,
      formattedValue = props.formattedValue,
      api = props.api,
      field = props.field,
      row = props.row,
      rowNode = props.rowNode,
      colDef = props.colDef,
      cellMode = props.cellMode,
      isEditable = props.isEditable,
      hasFocus = props.hasFocus,
      tabIndex = props.tabIndex,
      getValue = props.getValue,
      other = _objectWithoutProperties(props, _excluded);

  var rootProps = useGridRootProps();
  var ownerState = {
    classes: rootProps.classes
  };
  var classes = useUtilityClasses(ownerState);
  var Icon = React.useMemo(function () {
    return value ? rootProps.components.BooleanCellTrueIcon : rootProps.components.BooleanCellFalseIcon;
  }, [rootProps.components.BooleanCellFalseIcon, rootProps.components.BooleanCellTrueIcon, value]);
  return /*#__PURE__*/_jsx(Icon, _extends({
    fontSize: "small",
    className: classes.root,
    titleAccess: api.getLocaleText(value ? 'booleanCellTrueLabel' : 'booleanCellFalseLabel'),
    "data-value": Boolean(value)
  }, other));
});
export var renderBooleanCell = function renderBooleanCell(params) {
  if (params.rowNode.isAutoGenerated) {
    return '';
  }

  return /*#__PURE__*/_jsx(GridBooleanCell, _extends({}, params));
};