import { Delete, Edit, RemoveRedEye } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import React from 'react'
import CustomTable from '../../../components/custom-table/CustomTable'

export default function EmployeeTable({ data, onEditRow, onViewDetails, onDeleteRow, ...props }) {
  const columns = [
    {
      id: "full_name",
      name: "Full Name",
      selector: (row) => `${row.firstName} ${row.middleName || ''} ${row.lastName}`,
      sortable: true,
    },
    {
      id: "current_team",
      name: "Current Team",
      selector: (row) => row.team?.name || 'Available',
    },
    {
      id: "mobile_number",
      name: "Mobile Number",
      selector: "phoneNumber",
    },
    {
      id: "email_address",
      name: "Email Address",
      selector: "emailAddress",
    },
    {
      id: "designation",
      name: "Designation",
      selector: "position",
    },
    {
      id: "billable_hours",
      name: "Billable Hours",
      selector: (row) => row.billableHours ? `${row.billableHours} hours/week` : '-',
    },
    {
      id: 'actions',
      name: "Actions",
      cell: (row) => (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton onClick={() => onViewDetails(row)} aria-label="view">
            <RemoveRedEye fontSize="small" color='primary' />
          </IconButton>
          <IconButton onClick={() => onEditRow(row)} aria-label="edit">
            <Edit fontSize="small" color='primary' />
          </IconButton>
          <IconButton onClick={() => onDeleteRow(row._id)} aria-label="delete">
            <Delete fontSize="small" color='secondary' />
          </IconButton>
        </Box>
      )
    }
  ]
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
