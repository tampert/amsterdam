// Actions
import { actionTypes } from '../actions/Boat';

// GLOBAL
import { PAGE_SIZE } from '../../global';

const DEFAULT_PARAMS = { page: 1, page_size: PAGE_SIZE, boatType: "", nr_guests: 1, location: null, cabin_from: 0, date_from: null, date_to: null, sorting: "recommended" }
const DEFAULT_FILTERS = { page: 1, page_size: PAGE_SIZE, boatType: [], guests: 1, location: [], cabins: 0, startDate: null, endDate: null, sorting: "recommended" };

const reducer = (state = { loading: true, queryParams: { ...DEFAULT_PARAMS }, filters: { ...DEFAULT_FILTERS } }, action) => {
    switch (action.type) {
        case actionTypes.SET_LOADING:
            return Object.assign({}, state, {
                loading: action.loading
            })
        case actionTypes.SET_QUERY_PARAMS:
            return Object.assign({}, state, {
                queryParams: action.queryParams
            })
        case actionTypes.SET_QUERY_PARAM:
            return Object.assign({}, state, {
                queryParams: {
                    ...state.queryParams,
                    [action.key]: action.value
                }
            })
        case actionTypes.SET_FILTERS:
            return Object.assign({}, state, {
                filters: action.filters
            })
        case actionTypes.SET_FILTER:
            return Object.assign({}, state, {
                filters: {
                    ...state.filters,
                    [action.key]: action.value
                }
            })
        default: return state
    }
}

export default reducer;

export {
    DEFAULT_PARAMS,
    DEFAULT_FILTERS
}