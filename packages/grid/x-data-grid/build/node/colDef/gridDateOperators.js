"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGridDateOperators = void 0;

var _GridFilterInputDate = require("../components/panel/filterPanel/GridFilterInputDate");

const dateRegex = /(\d+)-(\d+)-(\d+)/;
const dateTimeRegex = /(\d+)-(\d+)-(\d+)T(\d+):(\d+)/;

function buildApplyFilterFn(filterItem, compareFn, showTime, keepHours) {
  if (!filterItem.value) {
    return null;
  }

  const [year, month, day, hour, minute] = filterItem.value.match(showTime ? dateTimeRegex : dateRegex).slice(1).map(Number);
  const time = new Date(year, month - 1, day, hour || 0, minute || 0).getTime();
  return ({
    value
  }) => {
    if (!value) {
      return false;
    }

    const valueAsDate = value instanceof Date ? value : new Date(value.toString());

    if (keepHours) {
      return compareFn(valueAsDate.getTime(), time);
    } // Make a copy of the date to not reset the hours in the original object


    const dateCopy = value instanceof Date ? new Date(valueAsDate) : valueAsDate;
    const timeToCompare = dateCopy.setHours(showTime ? valueAsDate.getHours() : 0, showTime ? valueAsDate.getMinutes() : 0, 0, 0);
    return compareFn(timeToCompare, time);
  };
}

const getGridDateOperators = showTime => [{
  value: 'is',
  getApplyFilterFn: filterItem => {
    return buildApplyFilterFn(filterItem, (value1, value2) => value1 === value2, showTime);
  },
  InputComponent: _GridFilterInputDate.GridFilterInputDate,
  InputComponentProps: {
    type: showTime ? 'datetime-local' : 'date'
  }
}, {
  value: 'not',
  getApplyFilterFn: filterItem => {
    return buildApplyFilterFn(filterItem, (value1, value2) => value1 !== value2, showTime);
  },
  InputComponent: _GridFilterInputDate.GridFilterInputDate,
  InputComponentProps: {
    type: showTime ? 'datetime-local' : 'date'
  }
}, {
  value: 'after',
  getApplyFilterFn: filterItem => {
    return buildApplyFilterFn(filterItem, (value1, value2) => value1 > value2, showTime);
  },
  InputComponent: _GridFilterInputDate.GridFilterInputDate,
  InputComponentProps: {
    type: showTime ? 'datetime-local' : 'date'
  }
}, {
  value: 'onOrAfter',
  getApplyFilterFn: filterItem => {
    return buildApplyFilterFn(filterItem, (value1, value2) => value1 >= value2, showTime);
  },
  InputComponent: _GridFilterInputDate.GridFilterInputDate,
  InputComponentProps: {
    type: showTime ? 'datetime-local' : 'date'
  }
}, {
  value: 'before',
  getApplyFilterFn: filterItem => {
    return buildApplyFilterFn(filterItem, (value1, value2) => value1 < value2, showTime, !showTime);
  },
  InputComponent: _GridFilterInputDate.GridFilterInputDate,
  InputComponentProps: {
    type: showTime ? 'datetime-local' : 'date'
  }
}, {
  value: 'onOrBefore',
  getApplyFilterFn: filterItem => {
    return buildApplyFilterFn(filterItem, (value1, value2) => value1 <= value2, showTime);
  },
  InputComponent: _GridFilterInputDate.GridFilterInputDate,
  InputComponentProps: {
    type: showTime ? 'datetime-local' : 'date'
  }
}, {
  value: 'isEmpty',
  getApplyFilterFn: () => {
    return ({
      value
    }) => {
      return value == null;
    };
  }
}, {
  value: 'isNotEmpty',
  getApplyFilterFn: () => {
    return ({
      value
    }) => {
      return value != null;
    };
  }
}];

exports.getGridDateOperators = getGridDateOperators;