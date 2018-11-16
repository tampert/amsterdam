// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { CSSTransitionGroup } from 'react-transition-group';

// Components
import { DefaultLayout } from '../../app/components/layout';
import { BoatCard, CustomSelect, Loading } from '../../app/components/ui';
import { COLORS } from '../../app/global/Theme';

// API
import { BoatService } from '../../app/services';

// Redux 
import { Boat } from '../../app/redux/actions';
import { FIELDS, PAGE_SIZE } from '../../app/global';

class SearchPage extends Component {

    static async getInitialProps({ query }) {
        const { defaultFilters, defaultParams } = BoatService.getUrlParams(query);
        const response = await BoatService.getAll(defaultParams);
        return { response, defaultFilters, defaultParams };
    }

    constructor(props) {
        super(props);

        // Default States
        this.state = {
            busy: true,
            hasMore: props.response.items.length == PAGE_SIZE,
            filteredResults: props.response.items
        }
    }

    componentWillMount() {
        const { boatFilters, defaultFilters, defaultParams, boatParams } = this.props;
        this.props.setFilters({ ...boatFilters, ...defaultFilters });
        this.props.setParams({ ...boatParams, ...defaultParams });
        this.setState({ busy: false });
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.setLoading(false);
        }, 500);
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.response != this.props.response) {
            const response = nextProps.response;
            this.setState({ filteredResults: response.items, hasMore: response.items.length == PAGE_SIZE, busy: false });
            this.props.setLoading(false);
        }
    }

    async loadMore() {
        const { filteredResults, hasMore, busy } = this.state;
        const { boatParams } = this.props;
        if (!busy && hasMore) {
            boatParams.page = +boatParams.page + 1;
            this.props.setParams(boatParams);
            this.setState({ busy: true });
            const response = await BoatService.getAll(boatParams);
            this.setState({ filteredResults: [...filteredResults, ...response.items], hasMore: response.items.length == PAGE_SIZE, busy: false });
        }
    }

    render() {
        const { filteredResults, hasMore } = this.state;
        const { loading, boatFilters: { sorting }, response } = this.props;
        return (
            <DefaultLayout>
                <div className={`search-page ${loading && "search-page--loading"}`}>
                    <Loading show={loading} text="Loading Boats..." className="search-page__loading" />
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="search-page__filter">
                                    <span className="search-page__filter__l">
                                        <CustomSelect value={sorting} onChange={(value) => { this.props.setFilter("sorting", value); this.props.setParam("order_by", value); }}>
                                            {FIELDS.SORTING.map((v) => {
                                                return (
                                                    <option key={v.id} value={v.id}>{v.label}</option>
                                                )
                                            })}
                                        </CustomSelect>
                                    </span>
                                    <span className="search-page__filter__m">{response.total_count} Boats to rent in Location</span>
                                    <div className="search-page__filter__r">
                                        <a href="#">Grid</a>
                                        <a href="#">List</a>
                                        <a href="#">Map</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {filteredResults.length == 0 && <div className="search-page__noresult">sorry we could not find any boats for your search criteria...</div>}
                        <InfiniteScroll threshold={300} hasMore={!loading && hasMore} loader={<Loading key="loading" show={true} text="Loading More Boats..." />} loadMore={() => { this.loadMore(); }}>
                            <CSSTransitionGroup className="row" component="div" transitionName="boat" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                                {filteredResults.map((data, i) => {
                                    return (
                                        <div key={`boat-${data.guid}`} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                            <BoatCard data={data} />
                                        </div>
                                    )
                                })}
                            </CSSTransitionGroup>
                        </InfiniteScroll>
                    </div>
                </div>
                <style jsx>{`
                    .search-page { position: relative }
                    .search-page.search-page--loading:before { opacity: 1; visibility: visible; pointer-event: none; }
                    .search-page:before { content: ''; display: block; transition: all 200ms; opacity: 0; visibility: hidden; pointer-events: none; z-index: 4; position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.6); }
                    .search-page :global(.search-page__loading) { position: absolute; z-index: 6; left: 0; right: 0; margin: 0 auto; top: 350px; }
                    .search-page__filter { position: relative; font-size: 16px; line-height: 20px; color: ${COLORS.primary}; height: 60px; display: flex; flex-direction: row; justify-content: flex-start; align-items: center; }
                    .search-page__filter__l {  }
                    .search-page__filter__m { text-align: center; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); }
                    .search-page__filter__r { margin-left: auto }
                    .search-page__filter__r a { transition: all 200ms; color: ${COLORS.primary}; margin-left: 20px; position: relative; }
                    .search-page__filter__r a:before { content: '|'; position: absolute; left: -10px; width: 1px; height: 100%; top: -1.5px; }
                    .search-page__filter__r a:first-child:before { display:none; }
                    .search-page__filter__r a:hover { opacity: 0.7; }
                    .search-page__noresult { text-align: center; padding: 20px 0; color: ${COLORS.primary}; font-weight: nold; font-size: 16px }
                    .search-page__headlines h2 { }
                    .search-page__headlines__list { display: flex; flex-direction: row; justify-content: 'space-between'; align-items: 'flex-start'; }
                    .boat-enter { opacity: 0.01; transform: scale(0.6); }
                    .boat-enter.boat-enter-active { opacity: 1; transform: scale(1); transition: all 400ms ease; }
                    .boat-leave { opacity: 1; }
                    .boat-leave.boat-leave-active { display: none }
                    @media all and (max-width: 768px) {
                        .search-page__filter__m { flex: 1; position: relative; left: 0; top: 0; transform: none; text-align: left; }
                        .search-page__filter__l { order: 2; }
                        .search-page__filter__r { display: none }
                    }
                `}</style>
            </DefaultLayout>
        )
    }

}

const MapsToProps = (state) => {
    return {
        boatParams: state.boat.queryParams,
        boatFilters: state.boat.filters,
        loading: state.boat.loading
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
        setParam: (key, value) => {
            dispatch(Boat.setQueryParam(key, value));
        },
        setFilters: (filters) => {
            dispatch(Boat.setFilters(filters));
        },
        setFilter: (key, value) => {
            dispatch(Boat.setFilter(key, value));
        },
    }
}

export default connect(MapsToProps, mapDispatchToProps)(SearchPage);