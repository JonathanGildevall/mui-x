import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import * as React from 'react';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { useGridCellEditing } from './useGridCellEditing.new';
import { GridCellModes } from '../../../models/gridEditRowModel';
import { useGridRowEditing } from './useGridRowEditing.new';
export var editingStateInitializer = function editingStateInitializer(state) {
  return _extends({}, state, {
    editRows: {}
  });
};
export var useGridEditing = function useGridEditing(apiRef, props) {
  useGridCellEditing(apiRef, props);
  useGridRowEditing(apiRef, props);
  var debounceMap = React.useRef({});
  var isCellEditableProp = props.isCellEditable;
  var isCellEditable = React.useCallback(function (params) {
    if (params.rowNode.isAutoGenerated) {
      return false;
    }

    if (!params.colDef.editable) {
      return false;
    }

    if (!params.colDef.renderEditCell) {
      return false;
    }

    if (isCellEditableProp) {
      return isCellEditableProp(params);
    }

    return true;
  }, [isCellEditableProp]);

  var maybeDebounce = function maybeDebounce(id, field, debounceMs, callback) {
    if (!debounceMs) {
      callback();
      return;
    }

    if (!debounceMap.current[id]) {
      debounceMap.current[id] = {};
    }

    if (debounceMap.current[id][field]) {
      var _debounceMap$current$ = _slicedToArray(debounceMap.current[id][field], 1),
          _timeout = _debounceMap$current$[0];

      clearTimeout(_timeout);
    } // To run the callback immediatelly without waiting the timeout


    var runImmediately = function runImmediately() {
      var _debounceMap$current$2 = _slicedToArray(debounceMap.current[id][field], 1),
          timeout = _debounceMap$current$2[0];

      clearTimeout(timeout);
      callback();
      delete debounceMap.current[id][field];
    };

    var timeout = setTimeout(function () {
      callback();
      delete debounceMap.current[id][field];
    }, debounceMs);
    debounceMap.current[id][field] = [timeout, runImmediately];
  };

  React.useEffect(function () {
    var debounces = debounceMap.current;
    return function () {
      Object.entries(debounces).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            id = _ref2[0],
            fields = _ref2[1];

        Object.keys(fields).forEach(function (field) {
          var _debounces$id$field = _slicedToArray(debounces[id][field], 1),
              timeout = _debounces$id$field[0];

          clearTimeout(timeout);
          delete debounces[id][field];
        });
      });
    };
  }, []);
  var runPendingEditCellValueMutation = React.useCallback(function (id, field) {
    if (!debounceMap.current[id]) {
      return;
    }

    if (!field) {
      Object.keys(debounceMap.current[id]).forEach(function (debouncedField) {
        var _debounceMap$current$3 = _slicedToArray(debounceMap.current[id][debouncedField], 2),
            runCallback = _debounceMap$current$3[1];

        runCallback();
      });
    } else if (debounceMap.current[id][field]) {
      var _debounceMap$current$4 = _slicedToArray(debounceMap.current[id][field], 2),
          runCallback = _debounceMap$current$4[1];

      runCallback();
    }
  }, []);
  var setEditCellValue = React.useCallback(function (params) {
    var id = params.id,
        field = params.field,
        debounceMs = params.debounceMs;
    return new Promise(function (resolve) {
      maybeDebounce(id, field, debounceMs, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var setEditCellValueToCall, result;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setEditCellValueToCall = props.editMode === 'row' ? apiRef.current.unstable_setRowEditingEditCellValue : apiRef.current.unstable_setCellEditingEditCellValue; // Check if the cell is in edit mode
                // By the time this callback runs the user may have cancelled the editing

                if (!(apiRef.current.getCellMode(id, field) === GridCellModes.Edit)) {
                  _context.next = 6;
                  break;
                }

                _context.next = 4;
                return setEditCellValueToCall(params);

              case 4:
                result = _context.sent;
                resolve(result);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    });
  }, [apiRef, props.editMode]);
  var editingSharedApi = {
    isCellEditable: isCellEditable,
    setEditCellValue: setEditCellValue,
    unstable_runPendingEditCellValueMutation: runPendingEditCellValueMutation
  };
  useGridApiMethod(apiRef, editingSharedApi, 'EditingApi');
};