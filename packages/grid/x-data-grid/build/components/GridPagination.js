import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import TablePagination, { tablePaginationClasses } from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import { useGridSelector } from '../hooks/utils/useGridSelector';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { gridPaginationSelector } from '../hooks/features/pagination/gridPaginationSelector';
import { jsx as _jsx } from "react/jsx-runtime";
const GridPaginationRoot = styled(TablePagination)(({
  theme
}) => ({
  [`& .${tablePaginationClasses.selectLabel}`]: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  [`& .${tablePaginationClasses.input}`]: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline-flex'
    }
  }
}));
export const GridPagination = /*#__PURE__*/React.forwardRef(function GridPagination(props, ref) {
  var _rootProps$rowsPerPag;

  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const paginationState = useGridSelector(apiRef, gridPaginationSelector);
  const lastPage = React.useMemo(() => Math.floor(paginationState.rowCount / (paginationState.pageSize || 1)), [paginationState.rowCount, paginationState.pageSize]);
  const handlePageSizeChange = React.useCallback(event => {
    const newPageSize = Number(event.target.value);
    apiRef.current.setPageSize(newPageSize);
  }, [apiRef]);
  const handlePageChange = React.useCallback((event, page) => {
    apiRef.current.setPage(page);
  }, [apiRef]);

  if (process.env.NODE_ENV !== 'production') {
    var _rootProps$pageSize;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const warnedOnceMissingPageSizeInRowsPerPageOptions = React.useRef(false);

    if (!warnedOnceMissingPageSizeInRowsPerPageOptions.current && !rootProps.autoPageSize && !rootProps.rowsPerPageOptions.includes((_rootProps$pageSize = rootProps.pageSize) != null ? _rootProps$pageSize : paginationState.pageSize)) {
      var _rootProps$pageSize2;

      console.warn([`MUI: The page size \`${(_rootProps$pageSize2 = rootProps.pageSize) != null ? _rootProps$pageSize2 : paginationState.pageSize}\` is not preset in the \`rowsPerPageOptions\``, `Add it to show the pagination select.`].join('\n'));
      warnedOnceMissingPageSizeInRowsPerPageOptions.current = true;
    }
  }

  return /*#__PURE__*/_jsx(GridPaginationRoot, _extends({
    ref: ref // @ts-ignore
    ,
    component: "div",
    count: paginationState.rowCount,
    page: paginationState.page <= lastPage ? paginationState.page : lastPage,
    rowsPerPageOptions: (_rootProps$rowsPerPag = rootProps.rowsPerPageOptions) != null && _rootProps$rowsPerPag.includes(paginationState.pageSize) ? rootProps.rowsPerPageOptions : [],
    rowsPerPage: paginationState.pageSize,
    onPageChange: handlePageChange,
    onRowsPerPageChange: handlePageSizeChange
  }, apiRef.current.getLocaleText('MuiTablePagination'), props));
});