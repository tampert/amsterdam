// Libraries
import React, { Component } from 'react';

// Libraries
import Link from 'next/link';

// Global
import { COLORS } from '../../../../global/Theme';

// Components
import { SearchForm, MobileMenu } from './';

// Image
//import logo from '../../../../assets/images/logo.svg';

export default class Header extends Component {

    constructor(props) {
        super(props);

        // Default states
        this.state = {
            menu: false
        }
    }

    render() {
        const { menu } = this.state;
        const { showSearch } = this.props;
        return (
            <header className={`header ${!showSearch ? "header--white" : ""}`}>
                <MobileMenu opened={menu} closeMenu={() => { this.setState({ menu: false }); }} />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="header__container ">
                                <Link href="/">
                                    <a className="header__logo">
                                        GMNH
                                        {/* <img src={logo} /> */}
                                    </a>
                                </Link>
                                <div className="header__mobile">
                                    <Link href="/">
                                        <a className="header__logo">
                                        GMNH
                                        </a>
                                    </Link>
                                    <i className="icon-menu header__mobile__hamburger" onClick={() => { this.setState({ menu: true }); }}></i>
                                </div>
                                {(() => {
                                    if (showSearch) {
                                        return (
                                            <div className="header__form">
                                                <SearchForm isSearchPage={showSearch} />
                                            </div>
                                        )
                                    }
                                })()}
                                <nav className="header__nav">
                                    <ul>
                                        <li>
                                            <Link href="/magazin">
                                                <a>Magazin</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/register">
                                                <a>Register</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/log-in">
                                                <a>Log In</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .header { background-color: #F0F0F0; }
                    .header--white { background-color: #ffffff }
                    .header__container { height: 80px; display: flex; flex-direction: row; justify-content: flex-start; align-items: center; }
                    .header__container a { font-size: 30px; }
                    .header__container a:visited { color: #000000; }
                    .header__logo { width: 94px; flex: 0 0 94px; margin-right: 18px; font-weight:bold;}
                    .header__logo img { width: 100%; display: block; }
                    .header__form { flex: 1; }
                    .header__nav { margin-left: auto; }
                    .header__nav ul { display: flex; flex-direction: row; justify-content: flex-start; align-items: center  }
                    .header__nav ul li:not(:first-child) { padding-left: 20px; }
                    .header__nav ul li a { color: ${COLORS.primary}; font-size: 15px; position: relative; }
                    .header__nav ul li a:before { content: ''; display: block; width: 0%; height: 1px; position: absolute; left: 0; top: 100%; margin-top: 3px; background-color: ${COLORS.primary}; transition: all 300ms; }
                    .header__nav ul li a:hover:before { width: 100%; }
                    .header__mobile { width: 100%; height: 60px; display: none; flex-direction: row; justify-content: flex-start; align-items: center; }
                    .header__mobile__hamburger { color: ${COLORS.primary}; font-size: 23px; margin-left: auto; cursor: pointer }
                    .header__mobile__hamburger:before { display: block }
                    @media all and (max-width: 1024px) {
                        .header__container { flex-direction: column; justify-content: flex-start; align-items: flex-start; height: auto }
                        .header__container > .header__logo { display: none }
                        .header__mobile { display: flex; font-size: 20px; } 
                        .header__nav { display: none }
                        .header__form { width: 100%; }
                    }
                `}</style>
            </header>
        )
    }
}