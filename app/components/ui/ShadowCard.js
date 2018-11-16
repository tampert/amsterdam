// Libraries
import Link from 'next/link';

// Global
import { COLORS } from '../../global/Theme';

const ShadowCard = ({ className = "", data: { image, title, subTitle, url } }) => {
    return (
        <Link href={url}>
            <a className={`shadow-card ${className}`} style={image && { backgroundImage: `url(${image})` }}>
                <div>
                    <span className="shadow-card__title">{title}</span>
                    <span className="shadow-card__sub">{subTitle}</span>
                </div>
                <style jsx>{`
                    .shadow-card { position: relative; background-color: ${COLORS.grayLight}; margin-bottom: 24px; background-size: cover; background-position: center  }
                    .shadow-card:before { content: ''; display: block; padding-bottom: 128%; height: 0  }
                    .shadow-card:after { content: ''; display: block; position: absolute; z-index: 1; left: 0; top: 0; width: 100%; height: 100%; background: linear-gradient(-180deg, rgba(0,0,0,0.00) 74%, #000000 100%); }
                    .shadow-card > div { transition: all 300ms; z-index: 2; position: absolute; left: 0; top: 0; width: 100%; height: 100%; padding-bottom: 20px; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; }
                    .shadow-card:hover > div { transform: translateY(-10px); }
                    .shadow-card__title { font-size: 17px; font-weight: bold; line-height: 22px; color: #ffffff; }
                    .shadow-card__sub { font-size: 13px; color: #ffffff; line-height: 18px; }
                `}</style>
            </a>
        </Link>
    )
}

export default ShadowCard;