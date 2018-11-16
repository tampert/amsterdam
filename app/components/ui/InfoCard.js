// Global
import { COLORS } from '../../global/Theme';

// Libraries
import React from 'react';
import Link from 'next/link';
import css from 'styled-jsx/css';

const style = css`
.info-card { transition: all 200ms; display: flex; flex-direction: row; align-items: center; justify-content: flex-start; padding: 12px; height: 96px; background-color: #ffffff; border-radius: 5px; margin-bottom: 24px; box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10); }
.info-card--hover:hover { transform: translateY(-10px); }
.info-card__img { height: 72px;	width: 72px; flex: 0 0 72px; background-size: cover }
.info-card__right { color: ${COLORS.primary}; padding-left: 15px; }
.info-card__title { display: block; font-size: 15px; font-weight: bold;	line-height: 16px; }
.info-card__desc { font-size: 13px; line-height: 16px; padding-top: 2px; }
`;

const InfoCard = ({ title, description, image = "", url = null }) => {
    const HTML = (
        <React.Fragment>
            <div className={`info-card ${url ? "info-card--hover" : ""}`}>
                <span className="info-card__img" style={{ backgroundImage: `url(${image})` }} />
                <div className="info-card__right">
                    <span className="info-card__title">{title}</span>
                    <span className="info-card__desc">{description}</span>
                </div>
            </div>
            <style jsx>{style}</style>
        </React.Fragment>
    );
    if (url) {
        return (
            <Link href={url}>
                <a>{HTML}</a>
            </Link>
        )
    }
    return (
        <>
            <div>{HTML}</div>
        </>
    )
}

export default InfoCard;