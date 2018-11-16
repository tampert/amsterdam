// Libraries
import React, { Component } from 'react';
import { Range } from 'rc-slider';

// Style
import { COLORS } from '../../global/Theme';

// Style
import 'rc-slider/assets/index.css';

export default class FilterRange extends Component {

    constructor(props) {
        super(props);

        // Default states
        this.state = {
            minValue: props.min,
            maxValue: props.max
        }
    }

    checkMinMax(value, isMin = false) {
        const { min, max } = this.props;
        return parseInt(value) || 0;
    }

    onChange(props) {
        const [minValue, maxValue] = props;
        this.setState({ minValue, maxValue });
    }

    render() {
        const { min = 0, max = 1000, unit } = this.props;
        const { minValue, maxValue } = this.state;
        return (
            <div className="filter-range">
                <Range min={min} max={max} value={[minValue, maxValue]} defaultValue={[min, max]} onChange={(props) => { this.onChange(props) }} />
                <div className="filter-range__marks">
                    <span>{`${min} ${unit}`}</span>
                    <span>{`${max} ${unit}`}</span>
                </div>
                <div className="filter-range__input">
                    <span className="i">
                        <input type="text" value={minValue} onChange={(e) => { this.setState({ minValue: this.checkMinMax(e.target.value, true) }) }} />
                        <span>{unit}</span>
                    </span>
                    <span className="m">to</span>
                    <span className="i">
                        <input type="text" value={maxValue} onChange={(e) => { this.setState({ maxValue: this.checkMinMax(e.target.value) }) }} />
                        <span>{unit}</span>
                    </span>
                </div>
                <style jsx>{`
                    .filter-range__marks { padding-top: 15px; display: flex; flex-direction: row; justify-content: flex-start; align-items: center; }
                    .filter-range__marks span { color: rgba(54,62,64,0.8); font-size: 14px;	line-height: 22px; }
                    .filter-range__marks span:last-child { margin-left: auto; }
                    .filter-range { user-select: none; }
                    .filter-range :global(.rc-slider-handle) { border: 0; height: 21px; width: 21px; border: 2px solid #F8F8F8; background-color: ${COLORS.primary}; margin-top: -8px; }
                    .filter-range :global(.rc-slider-handle-1) { margin-left: 0 }
                    .filter-range :global(.rc-slider-handle-2) { margin-left: -15px }
                    .filter-range :global(.rc-slider-track) { background-color: #CAC9C9; } 
                    .filter-range :global(.rc-slider-handle:focus) { box-shadow: 0 0 0 5px ${COLORS.light}  }
                    .filter-range__input { padding-top: 25px; color: rgba(54,62,64,0.8); display: flex; flex-direction: row; justify-content: flex-start; align-items: center; font-size: 14px; line-height: 22px; }
                    .filter-range__input .i { flex:1; height: 30px; border: 1px solid rgba(54,62,64,0.23); position: relative; }
                    .filter-range__input .i input { padding: 0 30px 0 10px; display: block; width: 100%; color: rgba(54,62,64,0.8); border: 0; outline: 0; height: 100%; }
                    .filter-range__input .i span { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: rgba(54,62,64,0.5); }
                    .filter-range__input .m { padding: 0 22px; } 
                `}</style>
            </div>
        )
    }

}