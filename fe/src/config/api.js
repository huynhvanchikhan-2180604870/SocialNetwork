import axios from "axios";
import { IP_PUBLIC } from "./ipconfig";

export const API_BASE_URL = `https://${IP_PUBLIC}:8443`;

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    }
});


