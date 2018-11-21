// Libraries
import React, { Component } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import NoSSR from 'react-no-ssr';

// Components
import { Button } from '../../../../ui';
import { LocationAutoComplete, BookDatePicker, FilterSelect, FilterCheck, CounterInput } from '../../../../utils';
import SearchAllFilter from './SearchAllFilter';

// Redux
import { Boat } from '../../../../../redux/actions';
import { DEFAULT_PARAMS } from '../../../../../redux/reducers/Boat';

// Global
import { COLORS } from '../../../../../global/Theme';
import { FIELDS } from '../../../../../global';

class SearchForm extends Component {

    constructor(props) {
        super(props);

        // Bind Functions
        this.triggerSearch = this.triggerSearch.bind(this);

        // Default states
        this.state = {
            loading: false,
            filters: { ...props.boatFilters },
            showAllFilters: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.boatFilters.sorting != this.props.boatFilters.sorting) {
            const { filters } = this.state;
            filters.sorting = nextProps.boatFilters.sorting;
            this.setState({ filters });
            this.triggerSearch();
        }
    }

    setData(key, value, dontTrigger = false) {
        const { filters } = this.state;
        const { isSearchPage } = this.props;
        filters[key] = value;
        this.setState({ filters });
        if (isSearchPage && !dontTrigger) {
            this.triggerSearch();
        }
    }

    triggerSearch() {
        const { filters } = this.state;
        const params = {};
        this.setState({ loading: true });
        if (filters.location && Object.keys(filters.location).length != 0) {
            params.location = filters.location.value;
        }
        if (filters.startDate) {
            params.date_from = filters.startDate;
        }
        if (filters.endDate) {
            params.date_to = filters.endDate;
        }
        if (filters.guests) {
            params.nr_guests = filters.guests;
        }
        if (filters.cabins) {
            params.cabin_from = filters.cabins;
        }
        if (filters.sorting) {
            params.order_by = filters.sorting;
        }
        if (filters.page) {
            params.page = 1;
        }
        if (Array.isArray(filters.boatType) && filters.boatType.length > 0) {
            params.boatType = filters.boatType.map(a => a.value).join(",");
        }
        // Change Router
        Router.push({
            pathname: '/search',
            query: params
        });
        // Set Redux 
        this.props.setFilters(filters);
        this.props.setParams({ ...DEFAULT_PARAMS, ...params });
        this.props.setLoading(true);
    }

    checkIsSearchable() {
        const { queryParams, isSearchPage } = this.props;
        const bt = queryParams.boatType.split(",");
        const { filters: { cabins, guests, boatType } } = this.state;
        if (isSearchPage && ((guests != queryParams.nr_guests) || (cabins != queryParams.cabin_from) || (bt.sort().join(",") != boatType.map(a => a.value).sort().join(",")))) {
            this.triggerSearch();
        }
    }

    render() {
        const { showAllFilters, filters, loading } = this.state;
        const { isSearchPage } = this.props;
        return (
            <>
                <div className={`search-form ${!isSearchPage && "search-form--home"}`}>
                    <div className="search-form__location">
                        <NoSSR>
                            <LocationAutoComplete
                                value={filters.location}
                                onChange={(value) => { this.setData("location", value); }}
                            />
                        </NoSSR>
                    </div>
                    {/* <div>
                        <BookDatePicker
                            value={{ startDate: filters.startDate, endDate: filters.endDate }}
                            onChange={(value) => {
                                this.setData("startDate", value.startDate, true);
                                this.setData("endDate", value.endDate, true);
                                if (isSearchPage) {
                                    setTimeout(() => {
                                        this.triggerSearch();
                                    }, 50);
                                }
                            }}
                        />
                    </div>
                    <div>
                        <FilterSelect
                            onClose={() => { this.checkIsSearchable(); }}
                            active={filters.guests > 1 || filters.cabins > 0}
                            placeholder={(() => {
                                const placeholder = [];
                                if (filters.guests > 1 || (filters.cabins > 0)) {
                                    placeholder.push(`${filters.guests} ${filters.guests == 1 ? "guest" : "guests"}`)
                                }
                                if (filters.cabins > 0) {
                                    placeholder.push(`${filters.cabins} ${filters.cabins == 1 ? "cabin" : "cabins"}`)
                                }
                                return placeholder.length == 0 ? "Guests" : placeholder.join(", ");
                            })()}
                            title="Guests / Cabins"
                        >
                            <div>
                                <CounterInput defaultValue={filters.guests} minValue={1} maxValue={20} label="Guests" className="search-form__counter" onChange={(value) => { this.setData("guests", value, true); }} />
                                <CounterInput defaultValue={filters.cabins} minValue={0} maxValue={12} label="Cabins" className="search-form__counter" onChange={(value) => { this.setData("cabins", value, true); }} />
                            </div>
                        </FilterSelect>
                    </div>
                    <div>
                        <FilterSelect
                            onClose={() => { this.checkIsSearchable(); }}
                            active={filters.boatType.length != 0}
                            placeholder={filters.boatType.map(a => a.label).join(", ") || "Boat Type"}
                            title="Boat Type"
                        >
                            <div>
                                {FIELDS.BOAT_TYPES.map((v, i) => {
                                    return (
                                        <FilterCheck
                                            key={`boat-${v.value}`}
                                            label={v.label}
                                            value={v.value}
                                            checked={filters.boatType.find(a => a.value == v.value)}
                                            onChange={(e) => {
                                                let values = [...filters.boatType];
                                                if (e == false) {
                                                    values = values.filter((a) => { return a.value != v.value; });
                                                } else {
                                                    values.push(v);
                                                }
                                                this.setData("boatType", values, true);
                                            }}
                                        />
                                    )
                                })}

                            </div>
                        </FilterSelect>
                    </div>
                    {isSearchPage && <span className="search-form__all-button" onClick={() => { this.setState({ showAllFilters: true }); }}>All Filters</span>} */}
                    {!isSearchPage && <Button color="black" className="search-form__submit-button" loading={loading} onClick={this.triggerSearch}>Search</Button>}
                    <style jsx>{`
                    .search-form { display: flex; flex-direction: row; justify-content: flex-start; align-items: center }
                    .search-form > * { margin-right: 10px; }
                    .search-form--home .search-form__location { flex: 1 }
                    .search-form__location { flex: 0 0 325px; width: 325px; }
                    .search-form__all-button { user-select: none; white-space: nowrap; cursor: pointer; font-size: 14px; line-height: 19px; color: ${COLORS.white}; padding: 0 20px; height: 45px; text-decoration: underline; display: flex; flex-direction: row; justify-content: flex-start; align-items: center; box-shadow: 0 1px 4px 0 rgba(0,0,0,0.1); border-radius: 5px; border: 1px solid rgba(9, 72, 86, 0.2); }
                    .search-form :global(.search-form__counter) { border-bottom: 1px solid #EEF1F2 }
                    .search-form :global(.search-form__counter:last-child) { border-bottom: 0; }
                    .search-form :global(.search-form__submit-button) { padding-top: 0; padding-bottom: 0; height: 45px; line-height: 44px }
                    @media all and (max-width: 1024px) {
                        .search-form--home > *:not(:first-child) { display: none; }
                        .search-form--home :global(.search-form__submit-button) { width: 100%; }
                        .search-form > * { margin-bottom: 15px; }
                        .search-form { flex-wrap: wrap }
                        .search-form .search-form__location { flex: 0 0 100%; width: 100%; margin-bottom: 15px }
                        .search-form :global(.search-form__submit-button) { margin-bottom: 15px }
                        .search-form__all-button { border: 0; box-shadow: none; padding: 0 } 
                    }
                `}</style>
                </div>
                {showAllFilters && <SearchAllFilter onClose={() => { this.setState({ showAllFilters: false }); }} />}
            </>
        )
    }

}

const MapsStateToProps = (state) => {
    return {
        loading: state.boat.loading,
        queryParams: state.boat.queryParams,
        boatFilters: state.boat.filters
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: (loading) => {
            dispatch(Boat.setLoading(loading));
        },
        setParams: (params) => {
            dispatch(Boat.setQueryParams(params));
        },
        setFilters: (filters) => {
            dispatch(Boat.setFilters(filters));
        }
    }
}

export default connect(MapsStateToProps, mapDispatchToProps)(SearchForm);