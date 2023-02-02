import { UPDATE_TOTAL_EMPLOYEE_COUNT, UPDATE_TOTAL_TEAM_COUNT } from "../utils/Constants";

const reducer = (employeeAndTeamCount = {employee: 0, team: 0}, action) => {
  switch (action.type) {
    case UPDATE_TOTAL_EMPLOYEE_COUNT:
      return {...employeeAndTeamCount, employee: action.payload};
    case UPDATE_TOTAL_TEAM_COUNT:
      return {...employeeAndTeamCount, team: action.payload};;
    default:
      return employeeAndTeamCount;
  }
}

export default reducer;