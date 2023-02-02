import { combineReducers } from "redux";
import resetPage from "./resetPageNumber";
import employeeAndTeamCount from './employeeAndTeamCount';

export default combineReducers({ resetPage, employeeAndTeamCount });