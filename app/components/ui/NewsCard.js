// Global
import { COLORS } from '../../global/Theme';
import { IMAGES } from '../../global';

// Libraries
import Link from 'next/link';
import css from 'styled-jsx/css';

const style = css`
    .news-card { margin-bottom: 24px; cursor: pointer }
    .news-card__image { position: relative; background-image: url(${IMAGES.PLACEHOLDER}); background-size: cover; padding-bottom: 63%; display: block; margin-bottom: 15px; }
    .news-card__image span { position: absolute; left: 0; top: 0; width: 100%; height: 100%; background-size: cover; background-position: center; }
    .news-card__sub { font-size: 14px; line-height: 19px; display: block; padding-bottom: 3px; color: ${COLORS.primary} }
    .news-card__title { font-size: 24px; font-weight: bold;	line-height: 32px; color: ${COLORS.primary} }
`;

const InfoCard = ({ title, subTitle, image, url }) => {
    return (
        <Link href={url}>
            <a>
                <div className="news-card">
                    <span className="news-card__image">
                        <span style={{ backgroundImage: `url(${image})` }} />
                    </span>
                    {subTitle && <span className="news-card__sub">{subTitle}</span>}
                    {title && <span className="news-card__title" dangerouslySetInnerHTML={{ __html: title }} />}
                    <style jsx>{style}</style>
                </div>
            </a>
        </Link>
    )
}

export default InfoCard;