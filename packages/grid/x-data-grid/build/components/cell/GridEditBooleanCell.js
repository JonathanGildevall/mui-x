import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["id", "value", "formattedValue", "api", "field", "row", "rowNode", "colDef", "cellMode", "isEditable", "tabIndex", "className", "getValue", "hasFocus", "isValidating", "isProcessingProps", "error"];
import * as React from 'react';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { unstable_useId as useId, unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['editBooleanCell']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

export function GridEditBooleanCell(props) {
  var _rootProps$components;

  const {
    id: idProp,
    value,
    api,
    field,
    className,
    hasFocus
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const inputRef = React.useRef(null);
  const id = useId();
  const [valueState, setValueState] = React.useState(value);
  const rootProps = useGridRootProps();
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
  useEnhancedEffect(() => {
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
export const renderEditBooleanCell = params => /*#__PURE__*/_jsx(GridEditBooleanCell, _extends({}, params));