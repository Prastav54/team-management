import { Button, Chip, Stack } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../api/api';
import { getDataFromServer } from '../utils/apiUtils';
import { UPDATE_TOTAL_EMPLOYEE_COUNT, UPDATE_TOTAL_TEAM_COUNT } from '../utils/Constants';
import Employee from './helpers/Employee';
import Team from './helpers/Team';

export default function EmployeeTeamManagement() {
  const dispatch = useDispatch();
  const { employee, team } = useSelector(state => state.employeeAndTeamCount)
  const [employeeTeamToggle, setEmployeeTeamToggle] = useState(false)

  const getTotalEmployeeCount = async () => {
    let response = await getDataFromServer(`${API_URL.employee}/total`);
    if (response) {
      dispatch({ type: UPDATE_TOTAL_EMPLOYEE_COUNT, payload: response.totalCount })
    }
  }

  const getTotalTeamCount = async () => {
    let response = await getDataFromServer(`${API_URL.team}/total`);
    if (response) {
      dispatch({ type: UPDATE_TOTAL_TEAM_COUNT, payload: response.totalCount })
    }
  }

  useEffect(() => {
    getTotalEmployeeCount();
    getTotalTeamCount();
  }, [])

  return (
    <>
      <Stack direction='row' gap={3}>
        <Chip label={`Employee Count ${employee}`} color="primary" />
        <Chip label={`Team Count ${team}`} color="primary" />
      </Stack>
      <Box display='flex' justifyContent='flex-start' borderBottom={1} marginTop={2}>
        <Box mr={1}>
          <Button color='primary' variant='contained' disabled={!employeeTeamToggle} onClick={() => setEmployeeTeamToggle(!employeeTeamToggle)}>Employee</Button>
        </Box>
        <Box>
          <Button color='primary' variant='contained' disabled={employeeTeamToggle} onClick={() => setEmployeeTeamToggle(!employeeTeamToggle)}>Team</Button>
        </Box>
      </Box>
      {employeeTeamToggle ? <Team /> : <Employee />}
    </>
  )
}
