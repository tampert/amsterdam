// Libraries
import axios from 'axios';

// Global
import { API_HEADER_AUTH } from '../global';

export default class BaseService {

    fetch({ url, data = {}, params = {}, method = "GET" }) {
        const headers = {
            "X-Hasura-Access-Key": `${API_HEADER_AUTH}`,
            "Content-Type": "application/json"
        };
        return axios.request({ url, method, params, data, headers }).then(r => r.data);
    };

}