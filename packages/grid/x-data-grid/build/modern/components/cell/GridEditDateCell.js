import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["id", "value", "formattedValue", "api", "field", "row", "rowNode", "colDef", "cellMode", "isEditable", "tabIndex", "hasFocus", "getValue", "inputProps", "isValidating", "isProcessingProps"];
import * as React from 'react';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';
import InputBase from '@mui/material/InputBase';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['editInputCell']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

export function GridEditDateCell(props) {
  const {
    id,
    value: valueProp,
    api,
    field,
    colDef,
    hasFocus,
    inputProps
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const isDateTime = colDef.type === 'dateTime';
  const inputRef = React.useRef();
  const valueTransformed = React.useMemo(() => {
    let parsedDate;

    if (valueProp == null) {
      parsedDate = null;
    } else if (valueProp instanceof Date) {
      parsedDate = valueProp;
    } else {
      parsedDate = new Date((valueProp ?? '').toString());
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
  const rootProps = useGridRootProps();
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
      if (valueTransformed.parsed !== state.parsed && valueTransformed.parsed?.getTime() !== state.parsed?.getTime()) {
        return valueTransformed;
      }

      return state;
    });
  }, [valueTransformed]);
  useEnhancedEffect(() => {
    if (hasFocus) {
      inputRef.current.focus();
    }
  }, [hasFocus]);
  return /*#__PURE__*/_jsx(InputBase, _extends({
    inputRef: inputRef,
    fullWidth: true,
    className: classes.root,
    type: isDateTime ? 'datetime-local' : 'date',
    inputProps: _extends({
      max: isDateTime ? '9999-12-31T23:59' : '9999-12-31'
    }, inputProps),
    value: valueState.formatted,
    onChange: handleChange
  }, other));
}
export const renderEditDateCell = params => /*#__PURE__*/_jsx(GridEditDateCell, _extends({}, params));