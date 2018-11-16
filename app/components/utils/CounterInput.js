// Libraries
import React, { Component } from 'react';

// Style
import { COLORS } from '../../global/Theme';

export default class Counter extends Component {

    constructor(props) {
        super(props);

        // Default States
        this.state = {
            value: props.defaultValue
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.defaultValue != nextProps.defaultValue) {
            this.setState({ value: nextProps.defaultValue });
        }
    }

    change(increase = false) {
        let { value } = this.state;
        value = increase ? (value + 1) : (value - 1);
        this.setState({ value });
        this.props.onChange(value);
    }

    render() {
        const { label, minValue = 0, maxValue = 5, className = "" } = this.props;
        const { value } = this.state;
        const minDisable = value == minValue;
        const maxDisable = value == maxValue;
        return (
            <div className={`counter ${className}`}>
                <span className="counter__label">{label}</span>
                <div className="counter__input">
                    <span className={`counter__input__left ${minDisable && "disable"}`} onClick={() => { this.change(false) }}>-</span>
                    <input type="text" value={value} onChange={(e) => { if (e.target.value >= minValue && e.target.value <= maxValue) { this.setState({ value: (parseInt(e.target.value) || 0) }); this.props.onChange(parseInt(e.target.value) || 0); } }} />
                    <span className={`counter__input__right ${maxDisable && "disable"}`} onClick={() => { this.change(true) }}>+</span>
                </div>
                <style jsx>{`
                    .counter { user-select: none; padding: 21px 0; display: flex; flex-direction: row; justify-content: flex-start; align-items: center; }
                    .counter__label { font-size: 14px; line-height: 22px; color: ${COLORS.primary} }
                    .counter__input { margin-left: auto;  }
                    .counter__input__left, .counter__input__right { text-align: center; cursor: pointer; display: inline-block; width: 16px; height: 16px; border-radius: 50%; border: 1px solid ${COLORS.primary}; color: ${COLORS.primary}; line-height: 14px; font-weight: bold; }
                    .counter__input__left.disable, .counter__input__right.disable { opacity: 0.5; pointer-events: none; cursor: auto; }
                    .counter__input input { margin: 0 15px; border: 1px solid rgba(54,62,64,0.23); background-color: #FFFFFF; outline: 0; height: 28px; width: 52px; color: rgba(54,62,64,0.8); font-size: 14px; line-height: 22px; text-align: center }
                    .counter__input__right {  }
                `}</style>
            </div>
        )
    }

}