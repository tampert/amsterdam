// Libraries
import React, { Component } from 'react';
import { components } from 'react-select';
import AsyncSelect from 'react-select/lib/Async';

// API
import { GeneralService } from '../../services';

// Style
import { COLORS } from '../../global/Theme';

const Option = (props) => {
    return (
        <div className={`${props.data.parent && "parent"}`}>
            <components.Option {...props} />
        </div>
    );
};

const NoOptionsMessage = (props) => {
    return null;
};


export default class AutoComplete extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.loadOptions = this.loadOptions.bind(this);

        // Default states
        this.state = {
            isFocused: false
        }
    }

    handleChange(value) {
        if (value) {
            this.props.onChange(value);
        }
    }

    loadOptions(inputValue, callback) {
        GeneralService.locationByKeyword(inputValue).then((results) => {
            const options = this.parseOptions(results);
            callback(options);
        })
    }

    parseOptions(results) {
        const options = [];
        if (results) {
            results.map((item, index) => {
                if (!item.group) {
                    options.push({
                        parent: item.parent ? true : false,
                        label: item.name,
                        value: item.slug,
                        slug: item.slug
                    });
                }
            });
        }
        return options;
    }

    render() {
        const { value } = this.props;
        const { isFocused } = this.state;
        return (
            <div className="location-autocomplete">
                <AsyncSelect
                    value={value}
                    placeholder={!isFocused ? "Where do you want to life?" : null}
                    components={{ Option, NoOptionsMessage }}
                    loadOptions={this.loadOptions}
                    cacheOptions
                    onChange={this.handleChange}
                    autosize={false}
                    onFocus={() => { this.setState({ isFocused: true }); }}
                    onBlur={() => { this.setState({ isFocused: false }); }}
                    styles={{
                        loadingIndicator: (base) => { return { ...base, marginRight: 35 } },
                        // boxShadow: "0 2px 5px 0 rgba(0,0,0,0.10)"
                        control: (base) => { return { ...base, backgroundColor: "#ffffff", width: "100%", border: 0, boxShadow: "0 2px 5px 0 rgba(0,0,0,0)", borderRadius: 5, height: 45 } },
                        singleValue: (base) => { return { ...base, border: 0, fontSize: 16, color: COLORS.primary } },
                        indicatorSeparator: () => { return { display: "none" } },
                        input: (base) => { return { ...base, fontSize: 16, color: COLORS.primary } },
                        placeholder: (base) => { return { ...base, fontSize: 16, color: COLORS.primary } },
                        dropdownIndicator: () => { return { display: "none" } },
                        // boxShadow: "0 2px 5px 0 rgba(0,0,0,0.10)"
                        menu: (base) => { return { ...base, border: 0, boxShadow: "0 2px 5px 0 rgba(0,0,0,0)", borderRadius: 5, '.parent > *': { paddingLeft: "20px!important" } } },
                        option: (base) => { return { ...base, textAlign: 'left', paddingTop: 15, paddingBottom: 15 } },
                        menuList: (base) => { return { ...base, padding: 0 } },
                        loadingMessage: () => { return { display: "none" } }
                    }}
                />
                {/* <i className="icon-search" onClick={this.props.onSearch}></i> */}
                <style jsx>{`
                    .location-autocomplete { position: relative; z-index: 10; text-align: left; }
                    .location-autocomplete > i { cursor: pointer; position: absolute; right: 12px; color: ${COLORS.primary}; top: 50%; transform: translateY(-50%); font-size:20px; }
                    .location-autocomplete > i:before { display: block; }
                `}</style>
            </div>
        )
    }

}