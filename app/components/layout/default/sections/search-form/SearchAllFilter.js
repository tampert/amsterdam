// Libraries
import React, { Component } from 'react';

// Components
import { Button } from '../../../../ui';
import { FilterRange, FilterCheck, ModalSkeleton } from '../../../../utils';

// Global
import { COLORS } from '../../../../../global/Theme';

export default class SearchAllFilter extends Component {

    render() {
        return (
            <ModalSkeleton onClose={() => { this.props.onClose() }} className="search-filter">
                <div className="search-filter__header">
                    <a href="javascript:;" className="dlt">delete filter</a>
                    <a href="#" className="cls" onClick={() => { this.props.onClose(); }}>
                        <i className="icon-close"></i>
                    </a>
                </div>
                <div className="search-filter__content">
                    <div className="search-filter__section">
                        <div className="row">
                            <div className="col-xs-12">
                                <FilterCheck label="Only instant booking" labelValue={1290} />
                            </div>
                        </div>
                    </div>
                    <div className="search-filter__section">
                        <span className="search-filter__section__title">Boattype</span>
                        <div className="row">
                            {["Speedboat", "Motor boat", "Catamaran", "Sailboat", "RIB"].map((v, i) => {
                                return (
                                    <div className="col-md-6 col-sm-6 col-xs-12" key={`check-${v}`}>
                                        <FilterCheck label={v} labelValue={parseInt(Math.random() * 10000)} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="search-filter__section">
                        <span className="search-filter__section__title">
                            <span>Price</span>
                            <span className="inf">
                                <i className="inf__light"></i>
                                <span>per trip</span>
                                <i className="inf__dark"></i>
                                <span>per day</span>
                            </span>
                        </span>
                        <div>
                            <FilterRange min={30} max={1289} unit="€" />
                        </div>
                    </div>
                    <div className="search-filter__section">
                        <span className="search-filter__section__title">Equipment (1)</span>
                        <div className="row">
                            {["Air conditioner", "Autopilot", "Bimini top", "Bow thruster", "CD player"].map((v, i) => {
                                return (
                                    <div className="col-md-6 col-sm-6 col-xs-12" key={`check-${v}`}>
                                        <FilterCheck label={v} labelValue={parseInt(Math.random() * 10000)} />
                                    </div>
                                )
                            })}
                        </div>
                        <div className="search-filter__section__more">
                            <a href="#">Show more equpiment</a>
                        </div>
                    </div>
                    <div className="search-filter__section">
                        <span className="search-filter__section__title">
                            <span>Boat Length</span>
                            <span className="inf">
                                <i className="inf__light"></i>
                                <span>per trip</span>
                                <i className="inf__dark"></i>
                                <span>per day</span>
                            </span>
                        </span>
                        <div>
                            <FilterRange min={5} max={40} unit="m" />
                        </div>
                    </div>
                    <div className="search-filter__section">
                        <span className="search-filter__section__title">Build Year</span>
                        <div className="row">
                            {["2002 and before", "2003 - 2006", "2007 - 2010", "2011 - 2014", "2015 and younger"].map((v, i) => {
                                return (
                                    <div className="col-md-6 col-sm-6 col-xs-12" key={`build-year-${i}`}>
                                        <FilterCheck label={v} labelValue={parseInt(Math.random() * 10000)} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="search-filter__section">
                        <span className="search-filter__section__title">Brand</span>
                        <div className="row">
                            {["Bavaria", "Jeanneau", "Beneteau", "Lagoon", "Dufour"].map((v, i) => {
                                return (
                                    <div className="col-md-6 col-sm-6 col-xs-12" key={`brand-${i}`}>
                                        <FilterCheck label={v} labelValue={parseInt(Math.random() * 10000)} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="search-filter__footer">
                    <span>345 Boats available</span>
                    <Button onClick={() => { this.props.onClose(); }}>Apply Filter</Button>
                </div>
                <style jsx>{` 
                    :global(.search-filter) { overflow: hidden; display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; height: 90%; }
                    .search-filter__header { border-bottom: 1px solid #EEF1F2; width: 100%; padding: 20px 15px; display: flex; flex-direction: row; justify-content: flex-start; align-items: center; }
                    .search-filter__header .dlt { font-size: 14px; line-height: 19px; color: ${COLORS.primary} } 
                    .search-filter__header .dlt:hover { text-decoration: underline; }
                    .search-filter__header .cls { margin-left: auto; font-size: 24px; color: ${COLORS.primary}; font-weight: bold }
                    .search-filter__content { flex: 1; overflow: auto; }
                    .search-filter__content > .row { margin: 0 }
                    .search-filter__section { padding: 16px 20px; border-bottom: 1px solid #EEF1F2 }
                    .search-filter__section:last-child { border-bottom: 0 }
                    .search-filter__section__title { text-align:left; font-size: 14px; font-weight: bold; line-height: 22px; color: ${COLORS.primary}; display: flex; flex-direction: row; justify-content: flex-start; align-items; padding-bottom: 10px; }
                    .search-filter__section__title .inf { margin-left: auto; display: flex; flex-direction: row; justify-content: flex-start; align-items: center }
                    .search-filter__section__title .inf i { width: 14px; height: 14px; border-radius: 50%; display: inline-block; margin-left: 20px; }
                    .search-filter__section__title .inf span { padding-left: 5px; font-size: 14px; font-weight: normal; line-height: 22px; }
                    .search-filter__section__title .inf__light { background-color: ${COLORS.light}; } 
                    .search-filter__section__title .inf__dark { background-color: ${COLORS.primary}; }
                    .search-filter__section__more { text-align: center; padding-top: 5px; }
                    .search-filter__section__more a { transition: all 200ms; font-size: 14px; line-height: 22px; color: ${COLORS.primary}; text-decoration: underline; }
                    .search-filter__section__more a:hover { opacity: 0.8 }
                    .search-filter .custom-select.selected .ttl { font-weight: bold; }
                    .search-filter__footer { padding: 18px 15px; width: 100%; border-top: 1px solid #EEF1F2; display: flex; flex-direction: row; justify-content: flex-start; align-items: center }
                    .search-filter__footer > span { margin-left: auto; color: ${COLORS.primary}; font-size: 14px; font-weight: bold; line-height: 19px; padding-right: 20px; }
                    .search-filter__footer :global(.button) { padding-left: 60px; padding-right: 60px;  }
                    .search-filter :global(.filter-range) { margin-top: 10px; }
                    @media all and (max-width: 768px){
                        .search-filter { height: 100%; }
                    }
                `}</style>
            </ModalSkeleton>
        )
    }

}