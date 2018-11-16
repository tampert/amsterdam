// libraries
import React, { Component } from 'react';

// Global
import { COLORS } from '../../../../../global/Theme';

export default class MobileMenu extends Component {

    componentDidMount() {
        this.container.addEventListener("click", (e) => {
            if (this.props.opened && this.menu && !this.menu.contains(e.target)) {
                this.props.closeMenu();
            }
        });
    }

    render() {
        const { opened } = this.props;
        return (
            <div className={`mobile-menu ${opened && "opened"}`} ref={(ref) => { this.container = ref; }}>
                <nav className="mobile-menu__container" ref={(ref) => { this.menu = ref; }}>
                    
                </nav>
                <style jsx>{`
                    .mobile-menu__container { pointer-event: none; visibility: hidden; transition: all 300ms cubic-bezier(0.860, 0.000, 0.070, 1.000); box-shadow: -3px 0 5px 0 rgba(0,0,0,0.10); transform: translateX(100%); z-index: 999; position: fixed; right: 0; top: 0; width: 60%; height: 100%; background-color: ${COLORS.primary} }
                    .mobile-menu { }
                    .mobile-menu:before { transition: 300ms; opacity: 0; visibility: hidden; pointer-event: none; content: ''; display: block; position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 998 }
                    .mobile-menu.opened {  }
                    .mobile-menu.opened:before { opacity: 1; pointer-event: auto; visibility: visible; }
                    .mobile-menu.opened .mobile-menu__container { transform: translateX(0); pointer-event: auto; visibility: visible; }
                    @media all and (min-width: 1025px) {
                        .mobile-menu { display: none }
                    }
                `}</style>
            </div>
        )
    }

}