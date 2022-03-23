import axios from 'axios';
import { API_URL } from './config'

export const ApiService = {
    uploadQuestion: (data) => {
        return axios.post(API_URL + 'api/questions/add-question',
            data)
    },
    // Options for dropdowns
    getOptions: () => {
        return axios.get(API_URL + 'api/getSubjectProvider/options')
    },
    getFilteredQuestion: (data, query) => {
        const { page, limit } = query;
        return axios.post(API_URL + `api/get-questions/filter?page=${page}&limit=${limit}`, data)
    },
    getQuestionDetails: (id) => {
        return axios.get(API_URL + `api/get-questions/ById/${id}`)
    },
    expertLogin: (data) => {
        return axios.post(API_URL + 'auth/login', data)
    },
}