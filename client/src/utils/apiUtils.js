import TEAM_MANAGEMENT from "../api/api";
import AddAlertMessage from "../components/alert/Alert";
import { ERROR, SOMETHING_WENT_WRONG, SUCCESS } from "./Constants";

export const getDataFromServer = async (url, params = {}) => {
    const queryString = Object.entries(params).map(param => {
        return `${param[0]}=${param[1]}`
    }).join('&')
    try {
        let response = await TEAM_MANAGEMENT.get(`${url}?${queryString}`);
        let jsondata = response.data;
        if (jsondata.type === SUCCESS) {
            return jsondata;
        } else {
            AddAlertMessage({ type: jsondata.type, message: jsondata.message })
        }
    } catch (error) {
        AddAlertMessage({ type: ERROR, message: SOMETHING_WENT_WRONG })
    }
}

export const postDataToServer = async (url, data, config) => {
    try {
        let response = config ? await TEAM_MANAGEMENT.post(url, data, config) : await TEAM_MANAGEMENT.post(url, data);
        let jsondata = response.data;
        AddAlertMessage({
            type: jsondata.type,
            message: jsondata.message
        })
        if (jsondata.type === SUCCESS) {
            return true;
        }
    } catch (error) {
        AddAlertMessage({ type: ERROR, message: error.response?.data?.message || SOMETHING_WENT_WRONG })
    }
}

export const updateDataToServer = async (url, data, config) => {
    try {
        let response = config ? await TEAM_MANAGEMENT.put(url, data, config) : await TEAM_MANAGEMENT.put(url, data);
        let jsondata = response.data;
        AddAlertMessage({
            type: jsondata.type,
            message: jsondata.message
        })
        if (jsondata.type === SUCCESS) {
            return true;
        }
    } catch (error) {
        AddAlertMessage({ type: ERROR, message: error.response?.data?.message || SOMETHING_WENT_WRONG })
    }
}

export const deleteRecordFromServer = async (url) => {
    try {
        let response = await TEAM_MANAGEMENT.delete(url);
        let jsondata = response.data;
        AddAlertMessage({
            type: jsondata.type,
            message: jsondata.message
        })
        if (jsondata.type === SUCCESS) {
            return true;
        }
    } catch (error) {
        AddAlertMessage({ type: ERROR, message: error.response?.data?.message || SOMETHING_WENT_WRONG })
    }
}