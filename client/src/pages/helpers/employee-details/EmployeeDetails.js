import { Avatar, Button, Chip, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import CustomModal from '../../../components/model/CustomModel'

export default function EmployeeDetails({ details, closeModal, viewEmployeeDetails, onEditDetail }) {
  return (
    <CustomModal
      title="Employee Information"
      hideFooter
      showModal={viewEmployeeDetails}
      onModalClose={closeModal}
    >
      <Box sx={{ borderBottom: '1px solid' }} mb={3} padding={2}>
        <Avatar variant="rounded" alt="Staff Photo" sx={{ height: '100px', width: '100px', marginBottom: '10px' }} src={details.profileImage?.url} />
        <Typography variant='h6'>{`${details.firstName} ${details.middleName || ''} ${details.lastName}`}</Typography>
        <Typography>{details.emailAddress}</Typography>
        <Chip label='Employee' color="primary" />
      </Box>
      <Box sx={{ borderBottom: '1px solid' }} mb={4} padding={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <b>Designation</b>
            <br />
            {details.position}
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <b>Contact</b>
            <br />
            {details.phoneNumber}
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <b>Address</b>
            <br />
            {details.address}
          </Grid>
        </Grid>
      </Box>
      <Box display='flex' justifyContent='center' mb={2}>
        <Button color='primary' variant='contained' onClick={() => onEditDetail()}>Edit Record</Button>
      </Box>
    </CustomModal>
  )
}
