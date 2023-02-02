import { Avatar, Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { API_URL } from '../../api/api';
import CustomSelect from '../../components/custom-select/CustomSelect';
import CustomTextField from '../../components/custom-text-field/CustomTextField';
import CustomModal from '../../components/model/CustomModel';
import useInitialRender from '../../hooks/useInitialRender';
import { EmployeeSchema } from '../../schemas/EmployeeSchema';
import { deleteRecordFromServer, getDataFromServer, postDataToServer, updateDataToServer } from '../../utils/apiUtils';
import { buildErrorMessage } from '../../utils/appUtils';
import { DELETE_CONFIRMATION_MESSAGE, GENDER_OPTIONS, RESET_TABLE_PAGE_NUMBER, ROW_PER_PAGE_DEFAULT_VALUE, UPDATE_TOTAL_EMPLOYEE_COUNT } from '../../utils/Constants';
import EmployeeDetails from './employee-details/EmployeeDetails';
import EmployeeTable from './tables/EmployeeTable';

export default function Employee() {
  const [modalDefaultValues, setModelDefaultValues] = useState({});
  const [showEmployeeFormModel, setShowEmployeeFormModel] = useState(false);
  const [teamOptions, setTeamOptions] = useState([]);
  const [image, setImage] = useState(null);
  const [page, setPage] = useState(1);
  const [viewEmployeeDetails, setViewEmployeeDetails] = useState(false);
  const [rowPerPage, setRowPerPage] = useState(ROW_PER_PAGE_DEFAULT_VALUE);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [deleteRecordId, setDeleteRecordId] = useState(null);
  const { tableData, totalCount, getTableData } = useInitialRender(API_URL.employee);
  const { values, errors, handleChange, setFieldValue, handleSubmit, resetForm } = useFormik({
    initialValues: modalDefaultValues,
    validateOnChange: false,
    validationSchema: EmployeeSchema,
    onSubmit: value => submitEmployeeDetails(value),
    enableReinitialize: true
  })

  const dispatch = useDispatch();

  useEffect(() => {
    if (page === 1) {
      dispatch({ type: RESET_TABLE_PAGE_NUMBER })
    }
  }, [page, dispatch])

  async function getAllTeams() {
    let data = await getDataFromServer(API_URL.team);
    buildTeamOptions(data?.response || [])
  }

  useEffect(() => {
    dispatch({ type: UPDATE_TOTAL_EMPLOYEE_COUNT, payload: totalCount })
  }, [totalCount])

  useEffect(() => {
    getAllTeams();
  }, [])

  const buildTeamOptions = (data) => {
    setTeamOptions(data.map(team => { return { value: team._id, label: team.name } }))
  }

  const submitEmployeeDetails = async data => {
    delete data.profileImage;
    let postdata = new FormData();
    Object.entries(data).forEach(([key, value]) => postdata.append(key, value));
    postdata.append('profileImage', image);
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    let response;
    if (modalDefaultValues._id) {
      response = await updateDataToServer(`${API_URL.employee}/${modalDefaultValues._id}`, postdata, config)
    } else {
      response = await postDataToServer(`${API_URL.employee}/new`, postdata, config);
    }
    if (response) {
      closeModal();
      getTableData(page, rowPerPage);
    }
  }

  const closeModal = () => {
    resetForm()
    setModelDefaultValues({});
    setImage(null);
    setShowEmployeeFormModel(false);
    setShowDeleteConfirmationModal(false);
    setDeleteRecordId(null);
    setViewEmployeeDetails(false);
  }

  const handleSelectChange = (name, value) => {
    setFieldValue(name, value)
  }

  const handleFileChange = (event) => {
    let file = event.target.files[0];
    setImage(file);
  }

  const handleRowPerPageChange = (rowPerPage) => {
    setPage(1);
    setRowPerPage(rowPerPage);
    getTableData(1, rowPerPage);
  }

  const onPageChange = (page) => {
    setPage(page);
    getTableData(page, rowPerPage);
  }

  const handleModalEdit = (data) => {
    data.team = data.team?._id;
    data.birthDate = data.birthDate.slice(0, 10)
    setModelDefaultValues(data);
    setShowEmployeeFormModel(true);
  }

  const handleModalDelete = id => {
    setShowDeleteConfirmationModal(true);
    setDeleteRecordId(id);
  }

  const handleModalView = data => {
    setModelDefaultValues(data);
    setViewEmployeeDetails(true);
  }

  const deleteRecord = async () => {
    let url = `${API_URL.employee}/${deleteRecordId}`;
    let response = await deleteRecordFromServer(url);
    if (response) {
      setPage(1);
      getTableData(1, rowPerPage);
      closeModal()
    }
  }

  const handleEditFromView = () => {
    setViewEmployeeDetails(false);
    setShowEmployeeFormModel(true)
  }

  return (
    <>
      <Box display='flex' justifyContent='space-between' mb={2} mt={2} borderBottom={1} padding={1}>
        <Typography variant='h5'>Employee List</Typography>
        <Button color='primary' variant='contained' onClick={() => setShowEmployeeFormModel(true)}>Add New Employee</Button>
      </Box>
      <CustomModal
        title="Add / Update Employee"
        showModal={showEmployeeFormModel}
        onModalSubmit={handleSubmit}
        onModalClose={closeModal}
        maxWidth="lg"
      >
        <Box>
          <Avatar variant="rounded" alt="Staff Photo" sx={{ height: '100px', width: '100px', marginBottom: '10px' }} src={image ? URL.createObjectURL(image) : modalDefaultValues.profileImage?.url} />
          <input name="photo" accept="image/*" id="photo" type="file" onChange={handleFileChange} />
        </Box>
        <Box sx={{ borderBottom: '1px solid' }} mb={2}>
          <Typography variant="h6">Basic Information</Typography>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              name='firstName'
              onChange={handleChange}
              label="First name"
              value={values.firstName}
            />
            {buildErrorMessage(errors.firstName)}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              name='middleName'
              onChange={handleChange}
              label="Middle Name"
              value={values.middleName}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              name='lastName'
              onChange={handleChange}
              label="Sur Name"
              value={values.lastName}
            />
            {buildErrorMessage(errors.lastName)}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              name='birthDate'
              onChange={handleChange}
              label="Date of birth"
              type='date'
              value={values.birthDate}
            />
            {buildErrorMessage(errors.birthDate)}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomSelect
              name='gender'
              onChange={handleSelectChange}
              label="Gender"
              defaultValue={values.gender}
              options={GENDER_OPTIONS}
            />
            {buildErrorMessage(errors.gender)}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              name='address'
              onChange={handleChange}
              label="Address"
              value={values.address}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              name='phoneNumber'
              onChange={handleChange}
              label="Phone Number"
              value={values.phoneNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              name='emailAddress'
              onChange={handleChange}
              label="Email Address"
              value={values.emailAddress}
            />
            {buildErrorMessage(errors.emailAddress)}
          </Grid>
        </Grid>
        <Box sx={{ borderBottom: '1px solid' }} mb={2}>
          <Typography variant="h6">Working Hours</Typography>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              name='startsAt'
              onChange={handleChange}
              type="time"
              label="Starts At"
              value={values.startsAt}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              name='endsAt'
              onChange={handleChange}
              type="time"
              label="Ends At"
              value={values.endsAt}
            />
          </Grid>
        </Grid>
        <Box sx={{ borderBottom: '1px solid' }} mb={2}>
          <Typography variant="h6">Jobs</Typography>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              name='position'
              onChange={handleChange}
              label="Job Position"
              value={values.position}
            />
            {buildErrorMessage(errors.position)}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomSelect
              name='team'
              onChange={handleSelectChange}
              label="Team"
              defaultValue={values.team}
              options={teamOptions}
            />
          </Grid>
        </Grid>
        <Box sx={{ borderBottom: '1px solid' }} mb={2}>
          <Typography variant="h6">Billing Information</Typography>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              name='billableHours'
              onChange={handleChange}
              type='number'
              label="Billable Hours"
              value={values.billableHours}
            />
          </Grid>
        </Grid>
      </CustomModal>
      <EmployeeTable
        data={tableData}
        totalSize={totalCount}
        handleRowPerPageChange={handleRowPerPageChange}
        onPageChange={onPageChange}
        onEditRow={handleModalEdit}
        onDeleteRow={handleModalDelete}
        onViewDetails={handleModalView}
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
      <EmployeeDetails
        details={modalDefaultValues}
        closeModal={closeModal}
        viewEmployeeDetails={viewEmployeeDetails}
        onEditDetail={handleEditFromView}
      />
    </>
  )
}
