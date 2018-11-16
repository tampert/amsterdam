// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { Form, Button } from '../../../app/components/ui';
import { BookDatePicker, FilterSelect, CounterInput, ModalSkeleton } from '../../../app/components/utils';

// Theme
import { COLORS } from '../../../app/global/Theme';

class RequestFormModal extends Component {

    constructor(props) {
        super(props);

        // Default States
        this.state = {
            startDate: props.filters.startDate,
            endDate: props.filters.endDate,
            guests: props.filters.guests,
            cabins: props.filters.cabins,
            skipper: false,
            loading: false,
            thankyou: false,
            thankyouH: 0
        }
    }

    request() {
        const height = this.first.clientHeight;
        this.setState({ loading: true, thankyouH: height });
        setTimeout(() => {
            this.setState({ thankyou: true });
        }, 1000);
    }

    render() {
        const { startDate, endDate, guests, cabins, skipper, loading, thankyou, thankyouH } = this.state;
        const { boat: { thumbnail, title, reviews } } = this.props;
        return (
            <ModalSkeleton className="requestform-modal" onClose={() => { this.props.onClose(); }} ref={(modal) => { this.modal = modal; }}>
                {(() => {
                    if (thankyou) {
                        return (
                            <div className="requestform-modal__thankyou" ref={(ref) => { this.thankyou = ref; }}>
                                <div style={{ height: thankyouH }}>
                                    <div className="requestform-modal__thankyou__t">Thank you! </div>
                                    <div className="requestform-modal__thankyou__d">Thank you for your enquiry with Zizoo. This is not a confirmed reservation - at least not yet.<br /><br />Our fantastic customer service team will be in touch soon! We encourage you not to miss out on this availability. It’s the busiest time of year for sailing and boats are being booked fast!</div>
                                    <Button onClick={() => { this.modal.close(); }}>Close window</Button>
                                </div>
                                <img src={require("../images/thankyou.jpg")} />
                            </div>
                        )
                    }
                    return (
                        <>
                            <a href="#" onClick={(e) => { this.modal.close(); e.preventDefault(); }} className="requestform-modal__close">Close</a>
                            <div className="requestform-modal__first" ref={(first) => { this.first = first; }}>
                                <div className="requestform-modal__header">
                                    <span className="img" style={{ backgroundImage: `url(${thumbnail})` }} />
                                    <div className="m">
                                        <div className="title">
                                            {title}
                                        </div>
                                        <div className="review">
                                            <span className="review__value">{reviews.value}</span>
                                            <span className="review__count">{reviews.count} reviews</span>
                                        </div>
                                    </div>
                                    <div className="price"><span>333€ </span>per night</div>
                                </div>
                                <div className="requestform-modal__warning">Tell us more about your perfect boat holiday - we’ll send a personalised offer that matches your exact criteria.</div>
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <Form.Container>
                                            <Form.Label>Dates</Form.Label>
                                            <BookDatePicker
                                                shadow={false}
                                                format="DD MMM YYYY"
                                                block
                                                placeholder="Check In / Check Out"
                                                value={{ startDate: startDate, endDate: endDate }}
                                                onChange={(value) => { this.setState({ ...value }); }}
                                            />
                                        </Form.Container>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <Form.Container>
                                            <Form.Label>Guests</Form.Label>
                                            <FilterSelect
                                                block
                                                shadow={false}
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
                                                    <CounterInput defaultValue={guests} minValue={1} maxValue={12} label="Guests" className="search-form__counter" onChange={(value) => { this.setState({ guests: value }); }} />
                                                    <CounterInput defaultValue={cabins} minValue={0} maxValue={7} label="Cabins" className="search-form__counter" onChange={(value) => { this.setState({ cabins: value }); }} />
                                                </div>
                                            </FilterSelect>
                                        </Form.Container>
                                    </div>
                                    <div className="col-xs-12">
                                        <Form.Container bottom={10}>
                                            <Form.Radio checked={skipper} name="type" value="skipper" onChange={(skipper) => { this.setState({ skipper }) }} styled>
                                                <span>I need a Skipper</span>
                                            </Form.Radio>
                                        </Form.Container>
                                        <div className="requestform-modal__subtitle">Personal Information</div>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <Form.Container>
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Input placeholder="John" />
                                        </Form.Container>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <Form.Container>
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Input placeholder="Doa" />
                                        </Form.Container>
                                    </div><div className="col-md-6 col-sm-6 col-xs-12">
                                        <Form.Container>
                                            <Form.Label>Telefon number *</Form.Label>
                                            <Form.Input placeholder=" e.g. 00491715268632" />
                                        </Form.Container>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <Form.Container>
                                            <Form.Label>E-Mail Address *</Form.Label>
                                            <Form.Input placeholder="john@doe.com" />
                                        </Form.Container>
                                    </div>
                                    <div className="col-xs-12">
                                        <Form.Container bottom={25}>
                                            <Form.Label>Notes (Optional)</Form.Label>
                                            <Form.Input textarea placeholder="Ask us about, extras, itineries or other things you want to know " />
                                        </Form.Container>
                                    </div>
                                    <div className="col-xs-12 center-xs">
                                        <Button color="blue" loading={loading} size="medium" block onClick={() => { this.request(); }}>Request offer</Button>
                                        <span className="requestform-modal__info">You will receive a not binding offer. You won’t be charged</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })()}
                <style jsx>{`  
                    :global(.requestform-modal) {  }
                    .requestform-modal__first { padding: 15px 20px 25px 20px; }
                    .requestform-modal__close { position: absolute; bottom: 100%; right: 0; color: #fff; font-size: 15px; line-height: 19px; margin-bottom: 10px; }
                    .requestform-modal__header { width: 100%; padding-bottom: 20px; display: flex; flex-direction: row; align-items: center; justify-content: flex-start }
                    .requestform-modal__header .img { background-color: ${COLORS.primary}; width: 49px; height: 49px; background-size: cover; margin-right: 10px; }
                    .requestform-modal__header .m {  }
                    .requestform-modal__header .price { align-self: flex-end; margin-left: auto; font-size: 17px;	line-height: 22px; color: ${COLORS.primary} }
                    .requestform-modal__header .price span { font-weight: bold; }
                    .requestform-modal__header .title { font-size: 17px; font-weight: bold;	line-height: 22px; color: ${COLORS.primary} }
                    .requestform-modal__header .review { padding-top: 3px; }
                    .requestform-modal__header .review .review__value { margin-right: 6px; padding: 2px 5px; background-color: ${COLORS.primary}; color: #fff; font-size: 14px;	font-weight: bold; border-radius: 2px; line-height: 19px; }
                    .requestform-modal__header .review .review__count { font-size: 15px;	line-height: 19px; color: ${COLORS.primary}}
                    .requestform-modal__warning { margin-bottom: 25px; font-size: 17px; color: ${COLORS.primary}; line-height: 22px; border-radius: 4px; padding: 15px; background: ${COLORS.light} }
                    .requestform-modal :global(.button) { width: 70%; margin: auto }
                    .requestform-modal__info { font-size: 15px;	line-height: 19px; color: ${COLORS.primary}; padding-top: 10px; display: block }
                    .requestform-modal__subtitle { font-size: 15px;	font-weight: bold; line-height: 19px; color: ${COLORS.primary}; opacity: 0.4; padding: 15px 0 25px 0; border-top: 1px solid #CEDADD; text-transform: uppercase; }
                    .requestform-modal__thankyou { position: relative; overflow: hidden; border-radius: 5px; background-color: #fafbfc; }
                    .requestform-modal__thankyou > img { position: absolute; z-index: 1; right: 0; bottom: 0; width: 100%; }
                    .requestform-modal__thankyou > div { position: relative; z-index: 2; padding: 60px 240px 0 60px; }
                    .requestform-modal__thankyou__t { padding-bottom: 20px; color: ${COLORS.primary}; font-size: 48px; font-weight: bold;	line-height: 62px; }
                    .requestform-modal__thankyou__d { color: ${COLORS.primary}; font-size: 17px; line-height: 22px; padding-bottom: 30px; }
                    @media all and (max-width: 768px) {
                        .requestform-modal__thankyou > div { padding-right: 60px; }
                    }
                `}</style>
            </ModalSkeleton>
        )
    }

}

const MapsToProps = (state) => {
    return {
        filters: state.boat.filters
    }
}

export default connect(MapsToProps)(RequestFormModal);