// Libraries
import React, { Component } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';

// Style
import { COLORS } from '../../global/Theme';

export default class SearchForm extends Component {

    static defaultProps = {
        format: "DD MMM",
        dateFormat: "YYYY-MM-DD",
        withInput: true,
        placeholder: "Dates",
        isVertical: false,
        block: false,
        value: {
            startDate: null,
            endDate: null
        }
    }

    constructor(props) {
        super(props);

        // states  
        this.state = {
            orientation: props.isVertical ? "vertical" : "horizontal",
            fullscreen: false,
            focused: !this.props.withInput ? "startDate" : null,
            startDate: null,
            endDate: null,
            withInput: this.props.withInput
        }
    }

    componentWillMount() {
        const { dateFormat } = this.props;
        const { endDate, startDate } = this.props.value;
        this.setState({
            startDate: startDate ? moment(startDate, dateFormat) : null,
            endDate: endDate ? moment(endDate, dateFormat) : null
        });
    }

    componentDidMount() {
        if (window.innerWidth <= 1024) {
            this.setState({ orientation: "vertical", fullscreen: this.state.withInput ? true : false });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value != this.props.value) {
            const { value: { endDate, startDate }, dateFormat } = nextProps;
            this.setState({
                startDate: startDate ? moment(startDate, dateFormat) : null,
                endDate: endDate ? moment(endDate, dateFormat) : null
            });
        }
    }

    clear() {
        if (this.props.withInput) {
            this.setState({ focused: null });
        }
        this.props.onChange({ startDate: null, endDate: null });
    }

    render() {
        const { focused, orientation, fullscreen, endDate, startDate, withInput } = this.state;
        const { block, placeholder, shadow = true, format, dateFormat } = this.props;
        return (
            <div className={`datepicker ${!withInput && "show"} ${block && "block"}`}>
                {(() => {
                    if (withInput) {
                        return (
                            <div className={`datepicker__custom ${focused && "active"} ${!shadow && 'noshadow'} ${startDate != endDate ? "selected" : ""}`} onClick={() => { this.setState({ focused: "startDate" }); }}>
                                <i className="icon-date"></i>
                                <span className="datepicker__custom__label">
                                    {(() => {
                                        if (startDate != endDate) {
                                            return `${startDate.format(format)} - ${endDate ? endDate.format(format) : "..."}`;
                                        }
                                        return placeholder;
                                    })()}
                                </span>
                            </div>
                        )
                    }
                })()}
                <DateRangePicker
                    withFullScreenPortal={fullscreen}
                    renderCalendarInfo={() => {
                        return (
                            <div className="datepicker__custom__footer">
                                <span className="l" onClick={() => { this.clear(); }}>Clear</span>
                                {/*<span className="r">Apply</span>*/}
                            </div>
                        )
                    }}
                    orientation={orientation}
                    hideKeyboardShortcutsPanel
                    startDate={startDate}
                    startDateId="start"
                    endDate={endDate}
                    endDateId="end"
                    onDatesChange={({ startDate, endDate }) => {
                        this.props.onChange({
                            startDate: startDate ? startDate.format(dateFormat) : null,
                            endDate: (endDate && startDate && (this.props.value.startDate == startDate.format(dateFormat))) ? endDate.format(dateFormat) : null
                        })
                    }}
                    focusedInput={focused}
                    onFocusChange={(focused) => { if (withInput || (!withInput && focused)) { this.setState({ focused }); } }}
                />
                <style jsx>{`
                    .datepicker { position: relative; z-index: 9 } 
                    .datepicker :global(.DateRangePicker) { position: unset; }
                    .datepicker :global(.DateRangePickerInput) { display: none!important; }
                    .datepicker :global(.DateRangePicker_picker) { z-index: 9; background: transparent; left: 50%!important; transform: translateX(-50%); top: 100%!important; margin-top: 10px!important; }
                    .datepicker.show :global(.DateRangePicker_picker) { position: relative!important; }
                    .datepicker.show :global(.DayPicker__withBorder) { box-shadow: none!important; }
                    .datepicker :global(.DayPicker__withBorder) { box-shadow: 0 2px 5px 0 rgba(0,0,0,0.10); border-radius: 5px }
                    .datepicker :global(.CalendarMonth_caption) { color: ${COLORS.primary}; font-size: 15px; font-weight: bold; }
                    .datepicker :global(.CalendarDay__default) { border: 0 }
                    .datepicker :global(.DayPickerNavigation_button__horizontalDefault) { border: 0 }
                    .datepicker :global(.CalendarDay__selected), .datepicker :global(.CalendarDay__selected:active), .datepicker :global(.CalendarDay__selected:hover) { background: ${COLORS.primary} }
                    .datepicker :global(.CalendarDay__selected_span), .datepicker :global(.CalendarDay__hovered_span) { background: rgba(3, 72, 87, 0.72); color: #fff }
                    .datepicker :global(.DayPickerNavigation_svg__horizontal) { fill:${COLORS.primary} }
                    :global(.DateRangePicker_picker__portal) { z-index: 999999; }
                    .datepicker.block .datepicker__custom { width: 100%; }
                    .datepicker__custom { user-select: none; white-space: nowrap; transition: all 200ms; cursor: pointer; color: ${COLORS.primary}; font-size: 14px; line-height: 19px; box-shadow: 0 2px 5px 0 rgba(0,0,0,0.10); border-radius: 5px; height: 45px; background: #fff; padding: 0 10px; display: inline-flex; flex-direction: row; justify-content: flex-start; align-items: center }
                    .datepicker__custom.noshadow { box-shadow: none; border: 1px solid #CEDADD; }
                    .datepicker__custom i { margin-right: 8px; }
                    .datepicker__custom i:before { display: block }
                    .datepicker__custom.active, .datepicker__custom.selected { color: #ffffff; background-color: ${COLORS.primary}!important; }
                    .datepicker__custom:hover { background-color: #f9f9f9; }
                    .datepicker__custom__label { }
                    .datepicker__custom__footer { display: flex; flex-direction: row; justify-content: flex-start; align-items: center; color: ${COLORS.primary}; font-size: 14px; padding: 0 15px 15px 15px }
                    .datepicker__custom__footer span { cursor: pointer; }
                    .datepicker__custom__footer span:hover { text-decoration: underline; }
                    .datepicker__custom__footer .r { margin-left: auto; }
                `}</style>
            </div>
        )
    }

}