// Libraries
import Link from 'next/link';

// Global
import { COLORS } from '../../../../global/Theme';

// Image
import logo from '../../../../assets/images/logo.svg';

const Footer = (props) => (
    <footer className="footer">
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12 footer__links">
                            <strong>Zizoo</strong>
                            <ul>
                                <li>
                                    <a href="#">About Zizoo</a>
                                </li>
                                <li>
                                    <a href="#">Careers at Zizoo</a>
                                </li>
                                <li>
                                    <a href="#">Team Zizoo</a>
                                </li>
                                <li>
                                    <a href="#">Press</a>
                                </li>
                                <li>
                                    <a href="#">Why Book With Us?</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12 footer__links">
                            <strong>Inspiration</strong>
                            <ul>
                                <li>
                                    <a href="">Destination Guides</a>
                                </li>
                                <li>
                                    <a href="#">Zizoo magazine</a>
                                </li>
                                <li>
                                    <a href="#">Sailing Routes</a>
                                </li>
                                <li>
                                    <a href="#">Zizoo Deals</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12 footer__links">
                            <strong>Terms of Service</strong>
                            <ul>
                                <li>
                                    <a href="#">FAQ</a>
                                </li>
                                <li>
                                    <a href="#">Cookies</a>
                                </li>
                                <li>
                                    <a href="#">Data Policy</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12 footer__links">
                            <strong>Contact Us</strong>
                            <span>Mon-Fri: 8-10pm CET</span>
                            <span>Sat-Sun: 10-8pm CET</span>
                            <span>USA: +1 727-258-5406</span>
                            <span>Germany: +49 30 56796038</span>
                            <span>United Kingdom: +44 20 3318 3641</span>
                        </div>
                    </div>
                    <div className="footer__bottom">
                        <Link href="/">
                            <a className="footer__logo">
                                <img src={logo} />
                            </a>
                        </Link>
                        <span className="footer__copyright">2014—2018 Zizooboats GmbH™ | All rights reserved.</span>
                    </div>
                </div>
            </div>
        </div>
        <style jsx>{`
            .footer { padding-top: 100px; }
            .footer__links { color: ${COLORS.primary}; font-size: 15px;	line-height: 21px; padding-bottom: 20px }
            .footer__links a { color: ${COLORS.primary}; }
            .footer__links span { display: block; }
            .footer__links strong { display: block; }
            .footer__bottom { padding: 24px 0; border-top: 1px solid rgba(9,72,86,0.1); display: flex; flex-direction: row; align-items: center; }
            .footer__copyright { font-size: 12px; line-height: 14px; color: ${COLORS.primary}; padding-left: 30px; }
            @media all and (max-width: 768px) {
                .footer__bottom { padding: 40px 0; flex-direction: column; align-items: center; justify-content: flex-start; } 
                .footer__logo { margin-bottom: 20px; }
            }
        `}</style>
    </footer>
)

export default Footer;