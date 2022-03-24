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
    getExpertDetails: (token) => {
        return axios.get(API_URL + 'api/expertDetails', { headers: { auth_token: token } })
    },
    freezeQuestion: (token, qID, data) => {
        return axios.put(API_URL + `api/freezeQuestion/${qID}`, data, { headers: { auth_token: token } })
    },
    dropQuestion: (token, qID) => {
        return axios.delete(API_URL + `api/dropQuestion/${qID}`, { headers: { auth_token: token } })
    }
}