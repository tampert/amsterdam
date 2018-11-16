// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { BookDatePicker, FilterSelect, CounterInput } from '../../../app/components/utils';
import { Form, Button, Loading } from '../../../app/components/ui';
import Modal from './RequestFormModal';

// Theme
import { COLORS } from '../../../app/global/Theme';

class RequestForm extends Component {

    constructor(props) {
        super(props);

        // Bind Functions
        this.scrollFunc = this.scrollFunc.bind(this);

        // Default States
        this.state = {
            startDate: props.filters.startDate,
            endDate: props.filters.endDate,
            guests: props.filters.guests,
            cabins: props.filters.cabins,
            skipper: false,
            loading: false,
            loadingPrice: true,
            modal: false
        }
    }

    componentDidMount() {
        const self = this;
        window.addEventListener("load", this.scrollFunc);
        window.addEventListener("scroll", this.scrollFunc);
        setTimeout(() => {
            self.setState({ loadingPrice: false });
        }, 1500);
    }

    componentWillUnmount() {
        window.removeEventListener("load", this.scrollFunc);
        window.removeEventListener("scroll", this.scrollFunc);
    }

    scrollFunc() {
        if (!document.body.classList.contains("noscrolling")) {
            const offsetTop = this.container.offsetTop - 30;
            const cH = this.form.clientHeight;
            const offetBottom = document.getElementById("scrolloffsetbottom").offsetTop - cH - 80;
            const scrollTop = window.scrollY;
            if (scrollTop >= offsetTop) {
                if (offetBottom <= scrollTop) {
                    if (!this.form.classList.contains("fix")) {
                        this.form.classList.add("fix");
                        this.form.classList.remove("sticky");
                    }
                } else {
                    if (!this.form.classList.contains("sticky")) {
                        this.form.style.width = `${this.container.clientWidth}px`;
                        this.form.classList.remove("fix");
                        this.form.classList.add("sticky");
                    }
                }
            } else {
                if (this.form.classList.contains("sticky") || this.form.classList.contains("fix")) {
                    this.form.style.width = `${this.container.clientWidth}px`;
                    this.form.classList.remove("fix");
                    this.form.classList.remove("sticky");
                }
            }
        }
    }

    showPrice() {
        const self = this;
        setTimeout(() => {
            const { startDate, endDate, guests } = self.state;
            if (startDate && endDate && guests > 0) {
                self.setState({ loadingPrice: true });
                setTimeout(() => {
                    self.setState({ loadingPrice: false });
                }, 1500);
            }
        }, 50);
    }

    request() {
        this.setState({ loading: true });
        const self = this;
        setTimeout(() => {
            self.setState({ modal: true });
        }, 1500);
    }

    render() {
        const { boat: { thumbnail, price, reviews } } = this.props;
        const { startDate, endDate, guests, cabins, sticky, fix, loading, skipper, loadingPrice, modal } = this.state;
        return (
            <>
                {modal && <Modal boat={this.props.boat} onClose={() => { this.setState({ modal: false, loading: false }) }} />}
                <div ref={(ref) => { this.container = ref; }} className="request-form-container">
                    <div className="request-form" ref={(ref) => { this.form = ref; }}>
                        <div className="request-form__header">
                            <span className="img" style={{ backgroundImage: `url(${thumbnail})` }} />
                            <div className="r">
                                <div className="price">
                                    <span>{Math.ceil(price)}€</span> per night
                            </div>
                                <div className="review">
                                    <span className="review__value">{reviews.value}</span>
                                    <span className="review__count">{reviews.count} reviews</span>
                                </div>
                            </div>
                        </div>
                        <div className="request-form__form">
                            <Form.Container>
                                <Form.Label>Dates</Form.Label>
                                <BookDatePicker
                                    shadow={false}
                                    format="DD MMM YYYY"
                                    isVertical
                                    block
                                    placeholder="Check In / Check Out"
                                    value={{ startDate: startDate, endDate: endDate }}
                                    onChange={(value) => { this.setState({ ...value }); this.showPrice(); }}
                                />
                            </Form.Container>
                            <Form.Container>
                                <Form.Label>Guests</Form.Label>
                                <FilterSelect
                                    shadow={false}
                                    block
                                    onClose={() => { }}
                                    active={guests > 1 || cabins > 0}
                                    placeholder={(() => {
                                        const placeholder = [];
                                        if (guests > 1 || cabins > 0) {
                                            placeholder.push(`${guests} ${guests == 1 ? "guest" : "guests"}`)
                                        }
                                        if (cabins > 0) {
                                            placeholder.push(`${cabins} ${cabins == 1 ? "cabin" : "cabins"}`)
                                        }
                                        return placeholder.length == 0 ? "Guests" : placeholder.join(", ");
                                    })()}
                                    title="Guests / Cabins"
                                >
                                    <div>
                                        <CounterInput defaultValue={guests} minValue={1} maxValue={12} label="Guests" className="search-form__counter" onChange={(value) => { this.setState({ guests: value }); this.showPrice(); }} />
                                        <CounterInput defaultValue={cabins} minValue={0} maxValue={7} label="Cabins" className="search-form__counter" onChange={(value) => { this.setState({ cabins: value }); this.showPrice(); }} />
                                    </div>
                                </FilterSelect>
                            </Form.Container>
                            <Form.Container bottom={0}>
                                <Form.Checkbox size="small" checked={skipper} name="type" value="skipper" onChange={(skipper) => { this.setState({ skipper }) }} styled>
                                    <span>I need a Skipper</span>
                                </Form.Checkbox>
                            </Form.Container>
                            {(() => {
                                if (guests > 0 && startDate && endDate) {
                                    if (loadingPrice) {
                                        return (
                                            <Loading show size={20} />
                                        )
                                    }
                                    return (
                                        <div className="request-form__prices">
                                            <div>
                                                <span>Original price:</span>
                                                <span>2.280,00 €</span>
                                            </div>
                                            <div className="rd">
                                                <span>Zizoo Discount:</span>
                                                <span>-456,00 €</span>
                                            </div>
                                            <div>
                                                <span>Price per person:</span>
                                                <span>285,00 €</span>
                                            </div>
                                            <div className="bld">
                                                <span>What you pay now:</span>
                                                <span>1.824,00 €</span>
                                            </div>
                                            <div>
                                                <span>Estimated skipper fee:</span>
                                                <span>912,00 €</span>
                                            </div>
                                        </div>
                                    )
                                }
                            })()}
                            <Button block color="blue" size="medium" loading={loading} onClick={() => { this.request(); }}>Request offer</Button>
                            <div className="info">You will receive a not binding offer. You won’t be charged</div>
                        </div>
                        <div className="request-form__warning">Enter your travel dates to see the total price per night.</div>
                    </div>
                    <style jsx>{`
                        .request-form-container { position: relative; height: 100%; }
                        .request-form { padding: 20px; border: 1px solid rgba(9,72,86,0.2); border-radius: 5px; background-color: #fff; backface-visibility: hidden; }
                        .request-form.sticky { position: fixed; top: 30px; }
                        .request-form.fix { position: absolute; bottom: 50px; }
                        .request-form__header { margin-bottom: 27px; border-bottom: 1px solid #CEDADD; padding-bottom: 15px; display: flex; flex-direction: row; align-items: center; justify-content: flex-start }
                        .request-form__header .img { background-color: ${COLORS.primary}; width: 49px; height: 49px; background-size: cover; margin-right: 10px; }
                        .request-form__header .r {  }
                        .request-form__header .price { color: ${COLORS.primary}; font-size: 17px; line-height: 22px; }
                        .request-form__header .price span { font-weight: bold; }
                        .request-form__header .review { padding-top: 3px; }
                        .request-form__header .review .review__value { margin-right: 6px; padding: 2px 5px; background-color: ${COLORS.primary}; color: #fff; font-size: 14px;	font-weight: bold; border-radius: 2px; line-height: 19px; }
                        .request-form__header .review .review__count { font-size: 15px;	line-height: 19px; color: ${COLORS.primary}}
                        .request-form__form { padding-bottom: 20px; border-bottom: 1px solid #CEDADD; }
                        .request-form__form .info { font-size: 13px; text-align: center; line-height: 19px; padding-top: 5px; color: ${COLORS.primary} }
                        .request-form__warning { padding-top: 25px; font-size: 14px; text-align: center; line-height: 19px; font-weight: bold; color: ${COLORS.primary} }
                        .request-form__prices { margin-bottom: 15px; background: rgba(9,72,86,0.1); padding: 15px; border-radius: 2px; }
                        .request-form__prices > div { color: ${COLORS.primary}; font-size: 14px; line-height: 28px; display: flex; flex-direction: row; align-items: center; justify-content: flex-start; }
                        .request-form__prices > div > span:last-child { margin-left: auto }
                        .request-form__prices > div.bld { border-top: 2px solid #DEE3E5; font-weight: bold;  }
                        .request-form__prices > div.rd { color: ${COLORS.orange}; }
                        @media all and (max-width: 768px) {
                            .request-form { width: 100%!important; position: relative!important; top: 0!important; bottom: 0!important; }
                        }
                    `}</style>
                </div>
            </>
        )
    }

}

const MapsToProps = (state) => {
    return {
        filters: state.boat.filters
    }
}

export default connect(MapsToProps)(RequestForm);