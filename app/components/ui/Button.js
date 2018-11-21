// Libraries
import React from 'react';
import Link from 'next/link';
import css from 'styled-jsx/css';

// Global
import { COLORS } from '../../global/Theme';

// Loading
import Loading from '../ui/Loading';

const style = css`
    .button { text-align: center; white-space: nowrap; border: 0; outline: 0; border-radius: 5px; display: inline-block; position: relative; cursor: pointer; overflow: hidden }
    .button--block { display: block; width: 100%; }
    .button--disable { opacity: 0.8; pointer-events: none; cursor: auto; }
    .button span { display: inline-block; transform: translateY(100%); opacity: 0; visibility: hidden; transition: all 300ms; }
    .button:before { transition: all 300ms; transform: translate(-50%, -50%); content: attr(data-text); position: absolute; left: 50%; top: 50%; display: flex; flex-direction: row; justify-content: center; align-items: center }
    .button:not(.button--nohover):hover span { transform: translateY(0%); opacity: 1; visibility: visible; }
    .button:not(.button--nohover):hover:before { transform: translate(-50%, -100%); opacity: 0; visibility: hidden; }
    .button--small { padding: 11px 27px; font-size: 14px;  }
    .button--medium { padding: 14px 14px; font-size: 15px;  }
    .button--primary { background-color: ${COLORS.primary}; color: #ffffff; }
    .button--secondary { background-color: ${COLORS.secondary}; color: #ffffff; }
    .button--white { color: ${COLORS.primary}; background-color: #ffffff; }
    .button--black { color: ${COLORS.white}; background-color: #000000; }
    .button--blue { background-color: ${COLORS.blue}; color: #ffffff; }
    .button--loading { opacity: 0.88!important; pointer-events: none  }
    .button--loading span { opacity: 0!important; }
    .button--loading:before { display: none!important; }
    .button--loading:after { content: ''; display: block; position: absolute; left: 0; right: 0; top: 0; bottom: 0; margin: auto; animation: spinning 500ms linear infinite; border-radius: 50%; width: 15px; height: 15px; border: 2px solid ${COLORS.primary}; border-left-color: ${COLORS.grayLight} }
    @keyframes spinning {
        to {
            transform: rotate(360deg);
        }
    }
`;

const Button = ({ color = "primary", loading = false, href = null, disable = false, block = false, size = "small", children, className, link = true, onClick }) => {
    const cName = `button button--${size} button--${color} ${className} ${block && "button--block"} ${loading && "button--loading"} ${disable && "button--disable"}`;
    if (onClick) {
        return (
            <button onClick={onClick} className={cName} data-text={children}>
                <span>{children}</span>
                <style jsx>{style}</style>
            </button>
        )
    }
    if (link) {
        return (
            <Link href={href}>
                <a className={cName} data-text={children}>
                    <span>{children}</span>
                    <style jsx>{style}</style>
                </a>
            </Link>
        )
    }
    return (
        <span className={`${cName} ${className} button--nohover`} data-text={children}>
            <span>{children}</span>
            <style jsx>{style}</style>
        </span>
    )
}

export default Button;