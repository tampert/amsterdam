export const actionTypes = {
    SET_LOADING: 'SET_LOADING',
    SET_QUERY_PARAMS: 'SET_QUERY_PARAMS',
    SET_QUERY_PARAM: 'SET_QUERY_PARAM',
    SET_FILTERS: 'SET_FILTERS',
    SET_FILTER: 'SET_FILTER'
}

export const setLoading = (loading) => dispatch => {
    return dispatch({ type: actionTypes.SET_LOADING, loading })
}

export const setQueryParams = (queryParams) => dispatch => {
    return dispatch({ type: actionTypes.SET_QUERY_PARAMS, queryParams })
}

export const setFilters = (filters) => dispatch => {
    return dispatch({ type: actionTypes.SET_FILTERS, filters })
}

export const setFilter = (key, value) => dispatch => {
    return dispatch({ type: actionTypes.SET_FILTER, key, value })
}

export const setQueryParam = (key, value) => dispatch => {
    return dispatch({ type: actionTypes.SET_QUERY_PARAM, key, value })
}