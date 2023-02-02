import PropTypes from "prop-types";
import React from "react";
import DataTable from "react-data-table-component";
import { customStyles } from "./style";
import { useSelector } from "react-redux";
import { NO_RECORDS_FOUND } from "../../utils/Constants";

export default function CustomTable(props) {
  const resetPage = useSelector(state => state.resetPage)
  
  return (
    <DataTable
      noDataComponent={NO_RECORDS_FOUND}
      customStyles={customStyles}
      data={props.data}
      responsive={props.responsive}
      paginationResetDefaultPage={resetPage}
      columns={props.columns}
      pagination={props.pagination}
      fixedHeader={props.fixedHeader}
      paginationServer={props.paginationServer}
      paginationRowsPerPageOptions={props.rowsPerPageList}
      paginationPerPage={props.rowsPerPageList[0]}
      onChangePage={props.onChangePage}
      onChangeRowsPerPage={props.onChangeRowsPerPage}
      paginationTotalRows={props.paginationTotalRows}
    />
  )
}

CustomTable.propTypes = {
  pagination: PropTypes.bool,
  fixedHeader: PropTypes.bool,
  responsive: PropTypes.bool,
  rowsPerPageList: PropTypes.array,
  paginationServer: PropTypes.bool,
  paginationTotalRows: PropTypes.number
};

CustomTable.defaultProps = {
  pagination: true,
  fixedHeader: true,
  responsive: true,
  rowsPerPageList: [10, 20, 30, 40, 50],
  paginationServer: true,
  paginationTotalRows: 0
};