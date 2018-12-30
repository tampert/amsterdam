// Libraries
import React, { Component } from 'react';
// import Router from 'next/router';
import { connect } from 'react-redux';

// API ,MagazineService
import { BoatService } from '../../app/services';

// Components
import { DefaultLayout } from '../../app/components/layout';
import { InfoCard, ShadowCard, BoatCard, NewsCard, Banner, Loading } from '../../app/components/ui';
import { ScrollableSection } from '../../app/components/utils';
import { SearchForm } from '../../app/components/layout/default/sections';

// Redux 
import { Boat } from '../../app/redux/actions';
import { DEFAULT_FILTERS, DEFAULT_PARAMS } from '../../app/redux/reducers/Boat';

// Global
import { TempDATA } from '../../app/global';

import fetch from 'node-fetch';

import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory';

import { CountryList } from '../../app/components/ui'

const token = 'postmalone';
const httpLink = createHttpLink({
    uri:'https://gmnh-backend.herokuapp.com/v1alpha1/graphql', 
    fetch: fetch,
    'X-Hasura-Access-Key': token,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
class HomePage extends Component {

    static async getInitialProps() {

        const param ={ 'action':'search_listings','encoding':'json','foo':'bar', 'pretty':'1', 'country':'UK', 'listing_type': 'buy', 'place_name':'berlin'}
        const response = await BoatService.getAll(param);
        return response;
    }

    constructor(props) {
        super(props);
        // Default States
        this.state = {
            // results: props.response.items || [],
            trips: [
                { title: "Dubrovnik, Croatia", description: "July 10 - July 17", slug: "berlin", image: require("./images/cities/dubrovnik.jpg") },
                { title: "Santorini, Greece", description: "July 10 - July 17", slug: "amsterdam", image: require("./images/cities/mykonos.jpg") },
                { title: "Mallorca, Spain", description: "July 10 - July 17", slug: "mallorca", image: require("./images/cities/mallorca.jpg") }
            ],
            usps: [
                { title: "Best price guarantee", description: "Flexible dates. No hidden fees", image: require("./images/usps/1.png") },
                { title: "24/7 customer service", description: "Multilingual team of boat holiday experts", image: require("./images/usps/2.png") },
                { title: "Largest Inventory", description: "Insured & verified boats with optional crew.", image: require("./images/usps/3.png") },
                { title: "Boat suggestions", description: "Let us help you pick the perfect boat.", image: require("./images/usps/4.png") }
            ],
            personas: [
                { image: require("./images/personas/luxury.jpg"), params: { nr_guests: 3, cabin_from: 2, boatType: "catamaran,gulet,sailboat" } },
                { image: require("./images/personas/family.jpg"), params: { nr_guests: 4, cabin_from: 2, boatType: "catamaran,sailboat" } },
                { image: require("./images/personas/party.jpg"), params: { nr_guests: 12, cabin_from: 6, boatType: "catamaran,sailboat" } },
                { image: require("./images/personas/professional.jpg"), params: { nr_guests: 4, cabin_from: 1, boatType: "catamaran,sailboat" } }
            ],
            listings : props.response || [],
            posts: []
        }
    }

    componentWillMount() {
        this.props.setFilters(DEFAULT_FILTERS);
        this.props.setParams(DEFAULT_PARAMS);

        // Get Posts
        // MagazineService.getLatestPosts({ include: [856, 339, 2934, 7527] }).then((posts) => {
        //     this.setState({ posts });
        // });
    }
    render() {
        console.log(CountryList)
        return (
            <ApolloProvider client={client}>
                <CountryList></CountryList>
            </ApolloProvider>
        )
    }


    renderx() {
        const { results, trips, posts, usps, personas, listings } = this.state;
        return (
            <DefaultLayout showSearch={false}>
                {/* <div className="homepage">
                    <div className="homepage__hero"  style={{ backgroundImage: `url(${require('./images/hero.jpg')})` }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="row center-xs middle-xs middle-sm center-sm middle-md center-md center-lg middle-lg homepage__hero__container">
                                        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-8">
                                            <h1>Find your perfect new home<br />all over the world</h1>
                                            <div className="homepage__hero__form">
                                                <SearchForm />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <h2>Continue your search</h2>
                                <div className="row">
                                    {trips.map((v, i) => {
                                        return (
                                            <div className="col-md-3 col-sm-6 col-xs-12" key={`trips-${i}`}>
                                                <InfoCard {...v} url={{ pathname: "/search", query: { place_name: v.slug, listing_type: "buy" , country:"UK", pretty: "1", foo:"bar", action:"search_listings", encoding:"json"} }} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div> */}
                            {/* <div className="col-xs-12">
                                <h2>Amazing homes in Berlin</h2>
                                <small>Beautifull flats in the german metropole</small>
                                <ScrollableSection margin={24} mobileMargin={15} className="search-page__headlines__list">
                                    {TempDATA.LOCATIONS.map((data, i) => {
                                        return (
                                            <ShadowCard className="search-page__headlines__item" key={`recommends-${i}`} data={{ ...data, url: { pathname: "/search", query: { location: data.slug } } }} />
                                        )
                                    })}
                                </ScrollableSection>
                            </div>
                            <div className="col-xs-12 homepage__info">
                                <div className="row">
                                    {usps.map((v, i) => {
                                        return (
                                            <div className="col-md-3 col-sm-6 col-xs-12" key={`usps-${i}`}>
                                                <InfoCard {...v} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <Banner
                                    title="Everything you need to <br/>know about boat holidays."
                                    button="Learn more"
                                    onClick={() => { Router.push("https://www.zizoo.com/en/magazine/the-first-timer-sailing-checklist/"); }}
                                    image={require('./images/banner.jpg')}
                                />
                            </div>
                            <div className="col-xs-12">
                                <h2>Main Headline</h2>
                                <div className="row">
                                    {personas.map((data, i) => {
                                        return (
                                            <div key={`news-${i}`} className={`col-md-4 col-sm-6 col-xs-12 ${(i == (personas.length - 1) ? "hidden-lg-up" : "")}`}>
                                                <NewsCard image={data.image} url={{ pathname: "/search", query: data.params }} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div> */}
                            {/* <div className="col-xs-12">
                                <h2>Amazing homes in Berlin</h2>
                                <small>Beautifull flats in the german metropole</small><br />
                                <div className="row">
                                {listings.slice(0, 8).map((data, index) => {
                                        let o = {}
                                            o.thumbnail = data.img_url
                                            // o.images
                                            o.id = index
                                            o.discount = data.commission
                                            o.type = data.listing_type
                                            o.brand = data.title
                                            o.model = data.property_type
                                            o.year = data.construction_year
                                            o.length = data.longitude
                                            o.cabins = data.room_number
                                            o.guests =data.bedroom_number
                                            o.locality = data.commission
                                            o.country = data.title
                                            o.oldPrice = data.price_low
                                            o.price = data.price
                                            o.url = data.lister_url
                                            o.charterType =''
                                            o.reviews =data.summary
                                        return (
                                            <div key={`boat-${o.id}`} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                                <BoatCard data={o} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            </div>
                            <div className="col-xs-12">
                                <h2>Look for a new home in there German cities.</h2>
                                <ScrollableSection margin={24} mobileMargin={15} className="search-page__headlines__list">
                                    {TempDATA.ESCAPES.map((data, i) => {
                                        return (
                                            <ShadowCard className="search-page__headlines__item" key={`recommends-${i}`} data={{ ...data, url: { pathname: "/search", query: { place_name: data.slug, listing_type: "buy" , country:"UK", pretty: "1", foo:"bar", action:"search_listings", encoding:"json"} } }} />
                                        )
                                    })}
                                </ScrollableSection>
                            </div> */}
                            {/* <div className="col-xs-12">
                                <h2>Get tipps for your boat trip in our Magazin</h2>
                                {posts.length == 0 ? <Loading show={true} /> : null}
                                <div className="row">
                                    {posts.map((post, i) => {
                                        return (
                                            <div key={`post-${post.id}`} className={`col-md-4 col-sm-6 col-xs-12  ${(i == (personas.length - 1) ? "hidden-lg-up" : "")}`}>
                                                <NewsCard
                                                    image={post._embedded["wp:featuredmedia"][0].source_url}
                                                    title={post.title.rendered}
                                                    url={`https://www.zizoo.com/en/magazine/${post.link}`}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div> */}
                <style jsx>{`
                    .homepage { }
                    .homepage__hero { background-size: cover; background-position: center; position: relative; margin-bottom: 30px; }
                    // .homepage__hero:before { content: ''; display: block; position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 1; background: rgba(0,0,0,0.3); } 
                    .homepage__hero__container { height: 400px; position: relative; }
                    .homepage__hero__container h1 { text-align: left; font-size: 70px; color: #ffffff; margin-bottom: 30px; font-weight: bold; line-height: 70px; }
                    .homepage__hero__form { border-radius: 10px; position: relative; background-color: #FFFFFF;	box-shadow: 0 2px 20px 0 rgba(0,0,0,0.1); padding: 15px; }
                    .homepage__info { padding-top: 15px; padding-bottom: 15px }
                    @media all and (max-width: 1024px) {
                        .homepage__hero__container { height: auto; padding: 100px 0; } 
                        .homepage__hero__container h1 { font-size: 36px; line-height: 36px; text-align: center }
                        .homepage__hero__form { background: transparent; box-shadow: non; padding: 0 }
                    }
                `}</style>
            </DefaultLayout>
        )
    }

}

const MapsToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setParams: (params) => {
            dispatch(Boat.setQueryParams(params));
        },
        setFilters: (filters) => {
            dispatch(Boat.setFilters(filters));
        }
    }
}

export default connect(MapsToProps, mapDispatchToProps)(HomePage);