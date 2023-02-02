import axios from "axios";

const BASE_URL = `http://localhost:8000/api/`;

export const API_URL = {
    employee: `${BASE_URL}employee`,
    team: `${BASE_URL}team`
};

const TEAM_MANAGEMENT = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
});

export default TEAM_MANAGEMENT;
