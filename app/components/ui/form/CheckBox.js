// libraries
import React, { Component } from 'react';

// THEME
import { COLORS } from '../../../global/Theme';

export default class Checkbox extends Component {

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
        const { name, block = true, children, value, onChange, size = "medium", styled = false } = this.props;
        const { selected } = this.state;
        return (
            <span className={`custom-checkbox custom-checkbox--${size} ${block && "block"} ${selected && "selected"}`}>
                <label>
                    <input type="checkbox" checked={selected} value={value} name={name} onChange={(e) => { this.setState({ selected: e.target.checked }); if (onChange) { onChange(e.target.checked); } }} />
                    <span></span>
                    <div className={`custom-checkbox__container ${styled && "styled"}`}>
                        {children}
                    </div>
                </label>
                <style jsx>{`
                .custom-checkbox { user-select: none; margin-bottom: 10px; }
                .custom-checkbox.block { display: block; }
                .custom-checkbox > label { cursor: pointer; display: flex; flex-direction: row; justify-content: flex-start; align-items: center; }
                .custom-checkbox input[type=checkbox] { position: absolute; left: -99999px;  }
                .custom-checkbox input[type=checkbox] + span:before { content: ''; opacity: 0; transition: all 200ms; position: absolute; width: 60%; height: 60%; background: ${COLORS.primary}; left: 50%; top: 50%; transform: translate(-50%, -50%); }
                .custom-checkbox input[type=checkbox] + span { transition: all 200ms; display: inline-block; position: relative; border: 1px solid rgba(54,62,64,0.23); background-color: #FFFFFF; }
                .custom-checkbox input[type=checkbox]:checked + span { border-color: ${COLORS.primary} }
                .custom-checkbox input[type=checkbox]:checked + span:before { opacity: 1; }
                .custom-checkbox--small input[type=checkbox] + span { height: 14px; width: 14px; }
                .custom-checkbox--medium input[type=checkbox] + span { height: 22px; width: 22px; }
                .custom-checkbox__container { margin-left: 10px; flex: 1;  }
                .custom-checkbox__container.styled { color: ${COLORS.primary}; line-height: 19px; }
                .custom-checkbox--small .custom-checkbox__container.styled { font-size: 14px; }
                .custom-checkbox--medium .custom-checkbox__container.styled { font-size: 15px; }
            `}</style>
            </span>
        )
    }
}
