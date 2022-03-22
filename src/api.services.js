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
    }
}