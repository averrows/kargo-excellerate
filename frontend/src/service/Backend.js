import axios from 'axios';

const API_URL = "https://9184-103-154-78-34.ngrok.io/api"

export const backend = axios.create({
    baseURL: API_URL,
    headers:{
        "content-type":"application/json"
    }});