// Libraries
import React, { Component } from 'react';

export default class CustomSelect extends Component {

    constructor(props) {
        super(props);

        // Default States
        this.state = {
            placeholder: ''
        }
    }

    componentDidMount() {
        this.setPlaceHolder();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value != this.props.value) {
            this.setPlaceHolder(nextProps.value);
        }
    }

    setPlaceHolder(value = this.props.value) {
        const options = this.select.options;
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            if (option.value == value) {
                this.setState({ placeholder: option.text });
            }
        }
    }

    render() {
        const { children, value, onChange } = this.props;
        const { placeholder } = this.state;
        return (
            <span className={`custom-select ${value != -1 ? "active" : ""}`}>
                <select ref={(ref) => { this.select = ref; }} onChange={(e) => { onChange(e.target.value); }} value={value}>{children}</select>
                <span className="custom-select__placeholder">
                    <span>{placeholder}</span>
                    <i className="icon-down"></i>
                </span>
                <style jsx>{`
                    .custom-select { position: relative; display: inline-block; cursor: pointer; }
                    .custom-select select { position: absolute; left: 0; top:0; opacity: 0; width: 100%; height: 100%; z-index: 1; display: block  }
                    .custom-select__placeholder { position: relative; z-index: 2; display: flex; pointer-events: none; flex-direction: row; justify-content: flex-start; align-items: center; }
                    .custom-select__placeholder i { margin-left: 5px; font-size: 20px; }
                    .custom-select__placeholder i:before { display: block; }
                `}</style>
            </span>
        )
    }

}