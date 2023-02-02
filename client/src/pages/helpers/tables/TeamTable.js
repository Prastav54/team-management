import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import React from 'react'
import CustomTable from '../../../components/custom-table/CustomTable';
import QrCode from '../../../components/qr-code/QRCode';

export default function TeamTable({ data, onEditRow, onDeleteRow, employeeList, ...props }) {

  const findNameFromId = (id) => {
    return employeeList?.find(item => item.value === id)?.name || '';
  }

  const findEmployeeName = (employeeId) => {
    let length = employeeId.length;
    let nameList = `${findNameFromId(employeeId[0])} , ${findNameFromId(employeeId[1])}`;
    if (length <= 2) return nameList;
    return `${nameList} & ${length - 2} more`
  }

  const columns = [
    {
      id: "team_name",
      name: "Team Name",
      selector: 'name',
      sortable: true,
    },
    {
      id: "members",
      name: "Members",
      selector: (row) => findEmployeeName(row.members),
    },
    {
      id: "billable_hours",
      name: "Total Man Hours",
      selector: 'billableHours',
    },
    {
      id: 'qr_details',
      name: "QR Details",
      cell: (row) => <QrCode value={`name = ${row.name}, password= ${row.password}`} size={25} />
    },
    {
      id: 'actions',
      name: "Actions",
      cell: (row) => (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton onClick={() => onEditRow(row)} aria-label="edit">
            <Edit fontSize="small" color='primary' />
          </IconButton>
          <IconButton onClick={() => onDeleteRow(row._id)} aria-label="delete">
            <Delete fontSize="small" color='secondary' />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <CustomTable
      data={data}
      columns={columns}
      onChangeRowsPerPage={props.handleRowPerPageChange}
      onChangePage={props.onPageChange}
      paginationTotalRows={props.totalSize}
    />
  )
}
