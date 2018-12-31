// Base
import BaseService from './BaseService';

// Global
import { API_ROOT, PAGE_SIZE, FIELDS } from '../global';

// Models
import { BoatModel } from '../models';

class BoatService extends BaseService {

    getGraphQLdata(params = {}, query) {
        return this.fetch({ url: 'https://gmnh-backend.herokuapp.com/v1alpha1/graphql', params, data:JSON.stringify({query}), method:'POST' }).then((response) => {
            return response;
        });
    }

    getAll(params = {}) {
        //console.log(params)
        return this.fetch({ url: `${API_ROOT}`, params, method:'GET' }).then((response) => {
            // response.items = response.items.map(boat => (new BoatModel(boat)));
            return response.response.listings;
        });
    }

    getBoat(boat) {
        const params = { boat };
        return this.fetch({ url: `${API_ROOT}/offers`, params, method:'GET' }).then((response) => {
            const temp = response.items.map(boat => (new BoatModel(boat)));
            return temp.length == 1 ? temp[0] : null;
        });
    }

    getUrlParams(query) {
        let page = query.page || 1;
        const page_size = page == 1 ? PAGE_SIZE : Number(page) * PAGE_SIZE;
        const defaultParams = { page_size, page };
        const defaultFilters = { page_size, page };
        if (query.location) {
            defaultParams.location = query.location;
            defaultFilters.location = {
                value: query.location,
                label: query.location
            };
        }
        if (query.order_by && FIELDS.SORTING.findIndex(a => a.id == query.order_by) > -1) {
            defaultParams.order_by = query.order_by;
            defaultFilters.sorting = query.order_by;
        }
        if (query.nr_guests) {
            defaultParams.nr_guests = query.nr_guests;
            defaultFilters.guests = Number(query.nr_guests);
        }
        if (query.cabin_from) {
            defaultParams.cabin_from = query.cabin_from;
            defaultFilters.cabins = Number(query.cabin_from);
        }
        if (query.date_from) {
            defaultParams.date_from = query.date_from;
            defaultFilters.startDate = query.date_from;
        }
        if (query.date_to) {
            defaultParams.date_to = query.date_to;
            defaultFilters.endDate = query.date_to;
        }
        if (query.boatType) {
            const types = query.boatType.split(",");
            const boatType = [];
            types.map((type) => {
                const temp = FIELDS.BOAT_TYPES.find(v => v.value == type);
                if (temp) {
                    boatType.push(temp);
                }
            });
            if (boatType.length != 0) {
                defaultParams.boatType = query.boatType;
                defaultFilters.boatType = boatType;
            }
        }
        return { defaultParams, defaultFilters }
    }

    getPictureBySize(img, size) {
        let replace = "";
        if (size == "xlarge") {
            replace = "expose_1000x750";
        } else if (size == "large") {
            replace = "expose_780x585";
        } else if (size == "medium") {
            replace = "expose_600x450";
        } else if (size == "small") {
            replace = "expose_414x242";
        }
        return img.replace("thumb_338x172", replace);
    }

}

export default new BoatService()