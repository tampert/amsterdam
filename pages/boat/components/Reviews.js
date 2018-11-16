// Libraries
import React, { Component } from 'react';

// Theme
import { COLORS } from '../../../app/global/Theme';

// Components
import { Pagination } from '../../../app/components/ui';

export default class Reviews extends Component {

    render() {
        const { boat: { reviews } } = this.props;
        return (
            <div className="boat-reviews">
                <div className="boat-reviews__title">
                    <span>{reviews.value}</span>
                    <h3>{reviews.count} Reviews</h3>
                </div>
                <div className="boat-reviews__score">
                    <div className="row">
                        {["Cleanliness", "Service", "Equipment", "Value"].map((c) => {
                            return (
                                <div className="item col-md-6 col-sm-6 col-xs-12" key={`service-${c}`}>
                                    <span className="label">{c}</span>
                                    <span className="value">
                                        <i className="active"></i>
                                        <i className="active"></i>
                                        <i className="active"></i>
                                        <i></i>
                                        <i></i>
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="boat-reviews__list">
                    {Array(10).fill().map((v, i) => {
                        return (
                            <div key={`review-${i}`} className="review-item">
                                <div className="review-item__h">
                                    <img src={require("../../../app/assets/images/avatar.png")} />
                                    <div className="review-item__h__r">
                                        <strong>Melina</strong>  <br />
                                        <span>January 2018</span>
                                    </div>
                                </div>
                                <p>
                                    The little trullo, Anna and her family host ist simply the perfect place to spend holidays at. It is cozy, prepared with lots of love and appears kinda magical. Anna welcomed us warmly and provided a extensivly filled fridge. We deeply fell in love with this beautiful place which...<a href="#">Read More</a>
                                </p>
                            </div>
                        )
                    })}
                    <Pagination />
                </div>
                <style jsx>{`
                    .boat-reviews { }
                    .boat-reviews__title { padding-bottom: 23px; display: flex; flex-direction: row; align-items: center }
                    .boat-reviews__title span { font-size: 20px; font-weight: bold;	line-height: 26px; height: 26px; padding: 2px 6px; border-radius: 2px; background-color: ${COLORS.primary}; display: inline-block; color: #fff  }
                    .boat-reviews__title h3 { font-size: 20px; line-height: 26px; padding-left: 7px; color: ${COLORS.primary}  }
                    .boat-reviews__score { padding-bottom: 15px; border-bottom: 1px solid rgba(9,72,86,0.1); }
                    .boat-reviews__score .item { margin-bottom: 12px; display: flex; flex-direction: row; align-items: center; justify-content: flex-start; }
                    .boat-reviews__score .label { padding-right: 15px;  }
                    .boat-reviews__score .value { display: flex; flex-direction: row; align-items: center; justify-content: flex-start; }
                    .boat-reviews__score .value i { margin-right: 5px; width: 15px; flex: 0 0 15px; height: 15px; border-radius: 50%; background-color: #30BCED; opacity: 0.2 }
                    .boat-reviews__score .value i.active { opacity: 1 }
                    .boat-reviews__list { padding-top: 20px; }
                    .review-item { font-size: 15px; line-height: 19px; color: ${COLORS.primary}; border-bottom: 1px solid rgba(9,72,86,0.1); padding: 15px 0; }
                    .review-item__h { padding-bottom: 10px; display: flex; flex-direction: row; align-items: center; justify-content: flex-start; }
                    .review-item__h img { border-radius: 50%; width: 40px; height: 40px; flex: 0 0 40px; }
                    .review-item__h__r { margin-left: 10px; }
                    .review-item p { }
                    .review-item p a { color: ${COLORS.primary}; text-decoration: underline; }
                `}</style>
            </div>
        )
    }

}