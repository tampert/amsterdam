// Libraries
import React, { Component } from 'react';

// Components
import { Button } from '../ui';

// THEME
import { COLORS } from '../../global/Theme';

export default class Filterselect extends Component {

    constructor(props) {
        super(props);

        // Default States
        this.state = {
            show: false
        }
    }

    componentDidMount() {
        window.addEventListener("click", (e) => {
            if (this.state.show && this.item && !this.item.contains(e.target)) {
                this.close();
            }
        });
    }

    close() {
        const { show } = this.state;
        this.setState({ show: !show });
        if (show) {
            this.props.onClose();
        }
    }

    render() {
        const { show } = this.state;
        const { title, children, placeholder, active, shadow = true, block = false } = this.props;
        return (
            <div className={`filter-select ${show && 'opened'} ${block && 'block'} ${active && 'active'}`} ref={(item) => { this.item = item; }}>
                <span className={`filter-select__placeholder ${!shadow && "noshadow"}`} onClick={() => { this.close(); }}>{placeholder}</span>
                <div className="filter-select__container">
                    <div className="filter-select__container__header">
                        <i className="icon-close" onClick={() => { this.close() }}></i>
                    </div>
                    <div className="filter-select__container__content">
                        {title && <span className="filter-select__title">{title}</span>}
                        {children}
                    </div>
                    <div className="filter-select__container__footer">
                        <Button onClick={() => { this.close(); }}>Apply</Button>
                    </div>
                </div>
                <style jsx>{`
                    .filter-select { position: relative; }
                    .filter-select.opened .filter-select__container { transform: translate(-50%, 0); opacity: 1; visibility: visible; }
                    .filter-select__placeholder { white-space: nowrap; text-overflow: ellipsis; overflow: hidden; max-width: 150px; display: block; transition: all 200ms; user-select: none; cursor: pointer; box-shadow: 0 2px 5px 0 rgba(0,0,0,0.10); border-radius: 5px; height: 45px; padding: 0 10px; background-color: #ffffff; font-size: 14px; line-height: 45px; color: ${COLORS.primary} }
                    .filter-select__placeholder.noshadow { box-shadow: none; border: 1px solid #CEDADD; }
                    .filter-select.block .filter-select__placeholder { width: 100%; max-width: 100%; }
                    .filter-select__placeholder:hover { background-color: #f9f9f9; }
                    .filter-select.opened .filter-select__placeholder, .filter-select.active .filter-select__placeholder { background-color: ${COLORS.primary}; color: #fff; }
                    .filter-select__container { display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; transform: translate(-50%, 20px); opacity: 0; visibility: hidden; transition: all 300ms; margin-top: 10px; width: 375px; position: absolute; left: 50%; top: 100%; background-color: #fff; z-index: 9; border-radius: 5px; box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1); }
                    .filter-select__container__content { padding: 25px 25px; overflow: auto; flex: 1; width: 100%; }
                    .filter-select__container__header { border-bottom: 1px solid #EEF1F2; width: 100%; padding: 20px 15px; display: none; flex-direction: row; justify-content: flex-start; align-items: center; }
                    .filter-select__container__header > i { cursor: pointer; margin-left: auto; font-size: 20px; color: ${COLORS.primary} }
                    .filter-select__container__header > i:before { display: block; }
                    .filter-select__container__footer { border-top: 1px solid #EEF1F2; width: 100%; padding: 20px 15px; display: flex; flex-direction: row; justify-content: flex-start; align-items: center; }
                    .filter-select__container__footer :global(.button) { margin-left: auto; }
                    .filter-select__title { text-align: left; display: block; padding-bottom: 10px; font-size: 14px; font-weight: bold; line-height: 22px; color: ${COLORS.primary} }
                    @media all and (max-width: 1024px) {
                        .filter-select__container__header { display: flex }
                        .filter-select__container { z-index: 9999999; transform: translate(0, 0)!important; position: fixed; left: 0%; top: 0; width: 100%; height: 100%; margin: 0 }
                    }
                `}</style>
            </div>
        )
    }

}