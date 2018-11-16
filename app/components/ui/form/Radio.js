// libraries
import React, { Component } from 'react';

// THEME
import { COLORS } from '../../../global/Theme';

export default class Radio extends Component {

    constructor(props) {
        super(props);

        // Default States
        this.state = {
            selected: this.props.checked || false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.checked != this.props.checked) {
            this.setState({ selected: nextProps.checked || false })
        }
    }

    render() {
        const { name, block = true, children, value, onChange, styled = false } = this.props;
        const { selected } = this.state;
        return (
            <span className={`custom-radio ${block && "block"} ${selected && "selected"}`}>
                <label>
                    <input type="radio" checked={selected} value={value} name={name} onChange={(e) => { this.setState({ selected: e.target.checked }); if (onChange) { onChange(e.target.checked); } }} />
                    <span></span>
                    <div className={`custom-radio__container ${styled && "styled"}`}>
                        {children}
                    </div>
                </label>
                <style jsx>{`
                    .custom-radio { cursor: pointer; user-select: none; margin-bottom: 10px; }
                    .custom-radio.block { display: block; }
                    .custom-radio > label { cursor: pointer; display: flex; flex-direction: row; justify-content: flex-start; align-items: center; }
                    .custom-radio input[type=radio] { position: absolute; left: -99999px;  }
                    .custom-radio input[type=radio] + span:before { content: ''; opacity: 0; transition: all 200ms; position: absolute; width: 9px; height: 9px; background: ${COLORS.primary}; border-radius: 50%; left: 50%; top: 50%; transform: translate(-50%, -50%); }
                    .custom-radio input[type=radio] + span { transition: all 200ms; display: inline-block; height: 16px; width: 16px; position: relative; border: 1px solid ${COLORS.primary}; border-radius: 50%; background-color: #FFFFFF; }
                    .custom-radio input[type=radio]:checked + span { border-color: ${COLORS.primary} }
                    .custom-radio input[type=radio]:checked + span:before { opacity: 1; }
                    .custom-radio__container { margin-left: 10px; flex: 1; }
                    .custom-radio__container.styled { font-size: 15px; line-height: 19px; color: ${COLORS.primary}
                `}</style>
            </span>
        )
    }
}
