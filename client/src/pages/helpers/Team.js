import { Button, Grid, Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { API_URL } from '../../api/api';
import CustomSelect from '../../components/custom-select/CustomSelect';
import CustomTextField from '../../components/custom-text-field/CustomTextField';
import CustomModal from '../../components/model/CustomModel';
import QrCode from '../../components/qr-code/QRCode';
import useInitialRender from '../../hooks/useInitialRender';
import { TeamSchema } from '../../schemas/TeamSchema';
import { deleteRecordFromServer, getDataFromServer, postDataToServer, updateDataToServer } from '../../utils/apiUtils';
import { buildErrorMessage } from '../../utils/appUtils';
import { DELETE_CONFIRMATION_MESSAGE, RESET_TABLE_PAGE_NUMBER, ROW_PER_PAGE_DEFAULT_VALUE, UPDATE_TOTAL_TEAM_COUNT } from '../../utils/Constants';
import TeamTable from './tables/TeamTable';

export default function Team() {
  const [modalDefaultValues, setModelDefaultValues] = useState({});
  const [showTeamFormModel, setShowTeamFormModel] = useState(false);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(ROW_PER_PAGE_DEFAULT_VALUE);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [deleteRecordId, setDeleteRecordId] = useState(null);
  const { totalCount, tableData, getTableData } = useInitialRender(API_URL.team)
  const [manHour, setManHour] = useState([0, 25000])

  const { values, errors, handleChange, setFieldValue, handleSubmit, resetForm } = useFormik({
    initialValues: modalDefaultValues,
    validateOnChange: false,
    validationSchema: TeamSchema,
    onSubmit: value => submitTeamDetails(value),
    enableReinitialize: true
  })

  const dispatch = useDispatch();

  useEffect(() => {
    if (page === 1) {
      dispatch({ type: RESET_TABLE_PAGE_NUMBER })
    }
  }, [page, dispatch])

  const getAllMembers = async () => {
    let url = `${API_URL.employee}`;
    let response = await getDataFromServer(url);
    buildTeamMembersSelect(response.response || []);
  }

  const buildTeamMembersSelect = (data) => {
    let options = (data?.map(item => { return { value: item._id, name: `${item.firstName} ${item.middleName || ''} ${item.lastName}`, hours: item.billableHours || 0, label: `${item.firstName} ${item.middleName || ''} ${item.lastName} (${item.team ? 'Not Available' : 'Available'})` } }))
    setEmployeeOptions(options)
  }

  useEffect(() => {
    dispatch({ type: UPDATE_TOTAL_TEAM_COUNT, payload: totalCount })
  }, [totalCount])

  useEffect(() => {
    getAllMembers();
  }, [])

  const submitTeamDetails = async data => {
    let response;
    if (modalDefaultValues._id) {
      response = await updateDataToServer(`${API_URL.team}/${modalDefaultValues._id}`, data)
    } else {
      response = await postDataToServer(`${API_URL.team}/new`, data);
    }
    if (response) {
      closeModal();
      getTableData(page, rowPerPage, makeParamFromManHour(manHour));
    }
  }

  const closeModal = () => {
    resetForm()
    setModelDefaultValues({});
    setShowTeamFormModel(false);
    setShowDeleteConfirmationModal(false);
    setDeleteRecordId(null);
  }

  const handleSelectChange = (name, value, options) => {
    setFieldValue(name, value);
    setFieldValue('billableHours', findBillableHours(options))
  }

  const findBillableHours = (members) => {
    return members?.reduce((a, b) => a + b.hours, 0)
  }

  const handleRowPerPageChange = (rowPerPage) => {
    setPage(1);
    setRowPerPage(rowPerPage);
    getTableData(1, rowPerPage, makeParamFromManHour(manHour));
  }

  const onPageChange = (page) => {
    setPage(page);
    getTableData(page, rowPerPage, makeParamFromManHour(manHour));
  }

  const handleModalEdit = (data) => {
    setModelDefaultValues(data);
    setShowTeamFormModel(true);
  }

  const handleModalDelete = id => {
    setShowDeleteConfirmationModal(true);
    setDeleteRecordId(id);
  }

  const deleteRecord = async () => {
    let url = `${API_URL.team}/${deleteRecordId}`;
    let response = await deleteRecordFromServer(url);
    if (response) {
      setPage(1);
      getTableData(1, rowPerPage, makeParamFromManHour(manHour));
      closeModal()
    }
  }

  const makeParamFromManHour = (hour) => {
    return {
      [`billableHours[gte]`]: hour[0],
      [`billableHours[lte]`]: hour[1],
    }
  }

  const onManHourChange = (hour) => {
    setManHour(hour);
    getTableData(page, rowPerPage, makeParamFromManHour(hour))
  }

  return (
    <>
      <Box display='flex' justifyContent='space-between' mb={2} mt={2} borderBottom={1} padding={1}>
        <Typography variant='h5'>Team List</Typography>
        <Box sx={{ width: 250 }} display='flex' alignItems='center'>
          <Box mr={2}>
            <Typography>Hours</Typography>
          </Box>
          <Slider
            value={manHour}
            size='small'
            onChange={(e, hour) => { onManHourChange(hour) }}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={25000}
          />
        </Box>
        <Button color='primary' variant='contained' onClick={() => setShowTeamFormModel(true)}>Add New Team</Button>
      </Box>
      <CustomModal
        title="Add / Update Employee"
        showModal={showTeamFormModel}
        onModalSubmit={handleSubmit}
        onModalClose={closeModal}
        maxWidth="lg"
      >
        <Box sx={{ borderBottom: '1px solid' }} mb={2}>
          <Typography variant="h6">Basic Information</Typography>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              name='name'
              onChange={handleChange}
              label="Team Name"
              value={values.name}
            />
            {buildErrorMessage(errors.name)}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              name='password'
              onChange={handleChange}
              label="Team Password"
              value={values.password}
            />
            {buildErrorMessage(errors.password)}
          </Grid>
        </Grid>
        <Box sx={{ borderBottom: '1px solid' }} mb={2}>
          <Typography variant="h6">Members</Typography>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <CustomSelect
              name='members'
              onChange={handleSelectChange}
              label="Members"
              defaultValue={values.members}
              options={employeeOptions}
              isMulti
            />
            {buildErrorMessage(errors.members)}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              name='billableHours'
              onChange={handleChange}
              label="Billable Hours"
              value={values.billableHours}
            />
            {buildErrorMessage(errors.billableHours)}
          </Grid>
        </Grid>
        {modalDefaultValues._id && (
          <Box display='flex' justifyContent='center'>
            <QrCode value={`name = ${modalDefaultValues.name}, password= ${modalDefaultValues.password}`} />
          </Box>
        )}
      </CustomModal>
      <TeamTable
        employeeList={employeeOptions}
        data={tableData}
        totalSize={totalCount}
        handleRowPerPageChange={handleRowPerPageChange}
        onPageChange={onPageChange}
        onEditRow={handleModalEdit}
        onDeleteRow={handleModalDelete}
      />
      <CustomModal
        title="Delete Record"
        onModalSubmit={deleteRecord}
        showModal={showDeleteConfirmationModal}
        onModalClose={closeModal}
        submitButtonText="Delete"
      >
        <Typography>{DELETE_CONFIRMATION_MESSAGE}</Typography>
      </CustomModal>
    </>
  )
}
