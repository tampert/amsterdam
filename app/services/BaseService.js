// Libraries
import axios from 'axios';

// Global
import { API_HEADER_AUTH } from '../global';

export default class BaseService {

    fetch({ url, data = {}, params = {}, method = "GET" }) {
        const headers = {
            "Authorization": `Bearer ${API_HEADER_AUTH}`
        };
        return axios.request({ url, method, params, data, headers }).then(r => r.data);
    };

}