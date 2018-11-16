// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

// Components
import { DefaultLayout } from '../../app/components/layout';
import { Button, BoatCard, ShadowCard } from '../../app/components/ui';
import { BookDatePicker, ScrollableSection } from '../../app/components/utils';
import { Lightbox, Reviews, RequestForm } from './components';

// Theme
import { COLORS } from '../../app/global/Theme';

// API
import { BoatService } from '../../app/services';

// Global
import { FIELDS, TempDATA, IMAGES } from '../../app/global';

// Helpers
import { GeneralHelper } from '../../app/helpers';

class BoatPage extends Component {

    static async getInitialProps({ res, query }) {
        const boats = await BoatService.getAll();
        const boat = await BoatService.getBoat(query.id);
        if (boat == null) {
            res.statusCode = 404;
            res.end('Not found');
            return;
        }
        return { boat, boats: boats.items || [] };
    }

    constructor(props) {
        super(props);

        // Default states
        this.state = {
            lightboxIndex: 0,
            lightbox: false,
            startDate: props.filters.startDate,
            endDate: props.filters.endDate,
        }
    }

    openLightbox(lightboxIndex) {
        this.setState({ lightboxIndex, lightbox: true });
    }

    render() {
        const { boat: { images }, boats } = this.props;
        const { lightbox, lightboxIndex, startDate, endDate } = this.state;
        return (
            <DefaultLayout>
                <div className="boat-page">
                    <Lightbox
                        open={lightbox}
                        index={lightboxIndex}
                        onChange={(index) => { this.setState({ lightboxIndex: index }); }}
                        onClose={() => { this.setState({ lightbox: false }); }}
                        images={images.map(image => ({ src: image.xl }))}
                    />
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="boat-page__hero">
                                    <div className="boat-page__hero__buttons">
                                        <Button color="white" onClick={() => { }}>Save</Button>
                                        <Button color="white" onClick={() => { }}>Share</Button>
                                    </div>
                                    <div className="boat-page__hero__container">
                                        <div className={`boat-page__hero__left item ${images.length < 5 && "full"}`} onClick={() => { this.openLightbox(0); }}>
                                            <div style={{ backgroundImage: `url(${images[0].xl})` }} />
                                        </div>
                                        {(() => {
                                            if (images.length >= 5) {
                                                return (
                                                    <div className="boat-page__hero__right">
                                                        {images.slice(1, 5).map((image, i) => {
                                                            return (
                                                                <div className="item" key={`hero-${i}`} onClick={() => { this.openLightbox((i + 1)); }}>
                                                                    <div style={{ backgroundImage: `url(${image.xl})` }} />
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                )
                                            }
                                        })()}
                                    </div>
                                    <Button color="white" className="boat-page__hero__view-button" onClick={() => { this.setState({ lightbox: true, lightboxIndex: 0 }); }}>View all Photos </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row center-xs">
                            <div className="col-sm-11 col-md-11 col-xs-12">
                                <div className="row start-xs">
                                    <div className="col-md-8 col-sm-8 col-xs-12">
                                        <div className="boat-page__section boat-page__content">
                                            {(() => {
                                                const { boat: { cabins, length, guests, locality, country, brand, model, year, type } } = this.props;
                                                return (
                                                    <>
                                                        <h1>{brand} {model} ({year})</h1>
                                                        <span className="boat-category">{locality} › {country}</span> <br /><br />
                                                        <strong>{type}</strong>
                                                        <div>
                                                            <span>{cabins} cabins · </span>
                                                            <span>{length} m · </span>
                                                            <span>{guests} guests</span>
                                                            <br /><br />
                                                        </div>
                                                        <div className="boat-page__content__item">
                                                            <strong>About the boat</strong> <br /><br />
                                                            Travel Croatia’s Istrian coast in style aboard this 2013 Lagoon 450. This floating villa is suitable for parties of up to 12 guests. The Lagoon 450 is one of the most sought after charter yachts available in Pula thanks to its easy handling, spacious interior and exterior and comfort. Whether you are dining al fresco on the open air deck, taking in the rays at the bow or lounging in the bright salon, you and your guests will be sail comfortably aboard the Lagoon 450. Find out when to go and how to get to your chartered Lagoon 450 in Pula with our guide and learn more about Lagoon catamarans here.
                                                        </div>
                                                        <div className="boat-page__content__item">
                                                            <strong>Specification</strong> <br /><br />
                                                            <div className="row">
                                                                <div className="col-xs-6">Sail type: Full Batten Mainsail</div>
                                                                <div className="col-xs-6">Draft: 1.30 m</div>
                                                                <div className="col-xs-6">Beam: 7.84 m</div>
                                                                <div className="col-xs-6">Fuel tank: 1000 L</div>
                                                                <div className="col-xs-6">Steering wheels: 1</div>
                                                                <div className="col-xs-6">Water tank: 700 L</div>
                                                                <div className="col-xs-6">Length: 13.96 m</div>
                                                                <div className="col-xs-6">Boat ID: 7836</div>
                                                            </div>
                                                        </div>
                                                        <div className="boat-page__content__item">
                                                            <strong>Equipment</strong> <br /><br />
                                                            <u>Above deck: </u>Electric anchor windlass, Electric anchor windlass, Bimini top<br />
                                                            <u>Below deck: </u>Air conditioner, Heating, Generator, Hot water, CD player, WiFi<br />
                                                            <u>Safety/Navigation: </u>GPS chartplotter, GPS chartplotter outside, VHF, Autopilot, Life raft
                                                        </div>
                                                        <div className="boat-page__content__item">
                                                            <strong>Sleeping arrangements</strong> <br /><br />
                                                        </div>
                                                        <div className="boat-page__content__item">
                                                            <Reviews boat={this.props.boat} />
                                                        </div>
                                                        <div className="boat-page__content__item noborder">
                                                            <strong>Location</strong><br /><br />
                                                            The nation of 1,000 islands remains one of our top destinations for sailing. Wandering through the winding streets of walled cities, touring the country’s diverse landscapes and savouring the local delicacies and wines in friendly local taverns and picturesque vineyards - do all this and more when you charter a yacht in Croatia.
                                                            <br /><br />
                                                            <div className="boat-page__map">
                                                                <iframe src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=zizoo%20berlin+(Zizoo%20GmbH)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" />
                                                            </div>
                                                        </div>
                                                        <div className="boat-page__content__item">
                                                            <strong>Availibility</strong><br /><br />
                                                            Updated 28 days ago <br /><br />
                                                            <BookDatePicker
                                                                withInput={false}
                                                                value={{ endDate, startDate }}
                                                                onChange={(value) => { this.setState({ ...value }); }}
                                                            />
                                                        </div>
                                                    </>
                                                )
                                            })()}
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4 col-xs-12">
                                        <RequestForm boat={this.props.boat} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-11 col-md-11 col-xs-12 start-xs" id="scrolloffsetbottom">
                                <h2>Similar listings</h2>
                                <div className="row">
                                    {boats.slice(0, 4).map((data) => {
                                        return (
                                            <div className="col-md-3 col-sm-6 col-xs-12" key={`boat-${data.id}`}>
                                                <BoatCard data={data} />
                                            </div>
                                        )
                                    })}
                                </div>
                                <h2>Main Headline </h2>
                                <ScrollableSection>
                                    {TempDATA.LOCATIONS.map((data) => {
                                        return (
                                            <ShadowCard key={`explore-${data.slug}`} data={{ ...data }} />
                                        )
                                    })}
                                </ScrollableSection>
                                <h2>Explore other options in and around Moya</h2>
                                <div className="boat-page__links">
                                    <div>
                                        More Boats to stay in #Location:&nbsp;
                                        {GeneralHelper.joinHtml(FIELDS.BOAT_TYPES.map((b) => {
                                            return (
                                                <Link key={`link-${b.value}`} href={{ pathname: "/search", query: { boatType: b.value } }}>
                                                    <a target="_blank">
                                                        <u>{b.label}</u>
                                                    </a>
                                                </Link>
                                            )
                                        }), " · ")}
                                    </div>
                                    <div className="row">
                                        {(() => {
                                            const links = [
                                                { value: "split", label: "Split" },
                                                { value: "dubrovnik", label: "Dubrovnik" },
                                                { value: "sibenik", label: "Sibenik" },
                                                { value: "kastela", label: "Kastela" }
                                            ].map((v) => {
                                                return FIELDS.BOAT_TYPES.map((b) => {
                                                    return {
                                                        label: `${b.label} charters ${v.label}`,
                                                        value: {
                                                            location: v.value,
                                                            boatType: b.value
                                                        }
                                                    }
                                                });
                                            });
                                            return links.map((l, i) => {
                                                return (
                                                    <div key={`link-${i}`} className="col-md-3 col-sm-6 col-xs-12">
                                                        <div className="boat-page__links__columns">
                                                            {l.map((v) => {
                                                                return (
                                                                    <Link key={`link-sub-${i}-${v.label}`} href={{ pathname: "/search", query: v.value }}>
                                                                        <a>{v.label}</a>
                                                                    </Link>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <style jsx>{`
                        .boat-page { padding-top: 30px }
                        .boat-page__hero { padding-bottom: 37.5%; position: relative; margin-bottom: 30px }
                        .boat-page__hero__container:hover .item:before { opacity: 0.5  }
                        .boat-page__hero .item { cursor: pointer; position: relative; background-image: url(${IMAGES.PLACEHOLDER}); background-size: cover; background-position: center; }
                        .boat-page__hero .item > div { z-index: 2; position: absolute; left: 0; top: 0; width: 100%; height: 100%; background-size: cover; background-position: center; }
                        .boat-page__hero .item:hover:before { opacity: 0!important }
                        .boat-page__hero .item:before { z-index: 3; content: ''; display: block; position: absolute; left: 0; top: 0; width: 100%; height: 100%; background-color: #000; opacity: 0; transition: all 300ms;  }
                        .boat-page__hero__container { z-index: 1; position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center }
                        .boat-page__hero__left { width: 50%; height: 100%; flex: 0 0 50%; border-right: 2px solid #fff }
                        .boat-page__hero__left.full { width: 100%; flex: 0 0 100%; }
                        .boat-page__hero__right { width: 50%; height: 100%; flex: 0 0 50%; display: flex; flex-direction: row; flex-wrap: wrap }
                        .boat-page__hero__right .item { width: 50%; flex: 0 0 50%; height: 50%; }
                        .boat-page__hero__right .item:nth-child(1), .boat-page__hero__right .item:nth-child(2) { border-bottom: 2px solid #fff }
                        .boat-page__hero__right .item:nth-child(1), .boat-page__hero__right .item:nth-child(3) { border-right: 2px solid #fff; }
                        :global(.boat-page__hero__view-button) { position: absolute!important; right: 10px; bottom: 10px; z-index: 2; } 
                        .boat-page__hero__buttons { position: absolute; right: 10px; top: 10px; z-index: 2; }
                        .boat-page__hero__buttons :global(.button) { margin-left: 10px; } 
                        .boat-page h1 { font-size: 28px; line-height: 36px; color: ${COLORS.primary}; font-weight: bold; margin-bottom: 20px }
                        .boat-page__section { padding: 20px; border: 1px solid rgba(9,72,86,0.2); border-radius: 5px; }
                        .boat-page__content { font-size: 15px; line-height: 23px; color: ${COLORS.primary}; margin-bottom: 50px; }
                        .boat-page__content__item { padding: 20px 0; border-top: 1px solid #CEDADD; }
                        .boat-page__content__item.noborder { border: 0; }    
                        .boat-page__map { position: relative; padding-bottom: 56.25%; }
                        .boat-page__map iframe { position: absolute; left: 0; top: 0; width: 100%; height: 100%; }
                        .boat-page__links { color: ${COLORS.primary}; font-size: 15px; line-height: 21px; }
                        .boat-page__links__columns { padding-top: 20px; display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; }
                        .boat-page__links a { color: ${COLORS.primary} }
                        @media all and (max-width: 768px) {
                            .boat-page__hero { padding-bottom: 56.25%; } 
                            .boat-page__hero__left { width: 100%; flex: 0 0 100%; }
                            .boat-page__hero__right { display: none; }
                        }
                    `}</style>
                </div>
            </DefaultLayout>
        )
    }

}

const MapsToProps = (state) => {
    return {
        filters: state.boat.filters
    }
}

export default connect(MapsToProps)(BoatPage);