// Base
import BaseService from './BaseService';

// Global
import { API_MAGAZINE } from '../global';

class MagazineService extends BaseService {

    getLatestPosts(params) {
        params._embed = "";
        return this.fetch({ url: `${API_MAGAZINE}/posts`, params });
    }

}

export default new MagazineService();