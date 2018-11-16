// Base
import BaseService from './BaseService';

class GeneralService extends BaseService {

    locationByKeyword(keyword) {
        return this.fetch({ url: `/en/es-autocomplete-forms?term=${keyword}` })
    }

}

export default new GeneralService();