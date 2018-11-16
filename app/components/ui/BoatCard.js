// Libraries
import Link from 'next/link';

// Global
import { COLORS } from '../../global/Theme';
import { IMAGES } from '../../global';

// Helpers
import { GeneralHelper } from '../../helpers';

// Components
import { Button } from './';


const BoatCard = ({ data }) => {
    const { thumbnail, images, id, discount, type, brand, model, year, length, cabins, guests, locality, country, oldPrice, price, url, charterType, reviews } = data;
    const isDiscount = oldPrice != price;
    //const oldPrice = price;
    //const newPrice = isDiscount ? (price - ((oldPrice * discount) / 100)) : price;
    return (
        <Link href={{ pathname: "/boat", query: { id } }}>
            <a className="boat-card" target="_blank">
                <div className="boat-card__img">
                    <span style={{ backgroundImage: `url(${thumbnail})` }} />
                </div>
                <div className="boat-card__content">
                    <div className="boat-card__title">
                        <span className="mdl">{brand} {model} </span>
                        <span className="yr">({year})</span>
                    </div>
                    <div className="boat-card__score">
                        <span className="boat-card__score__avg">{reviews.value}</span>
                        <span className="boat-card__score__total">{reviews.count} Reviews</span>
                    </div>
                    <div className="boat-card__category">
                        {(() => {
                            const categories = [];
                            categories.push(country);
                            if (type) {
                                categories.push(type);
                            }
                            categories.push(`${cabins} cabins`);
                            categories.push(`${length} m`);
                            categories.push(`${guests} guests`);
                            const __html = GeneralHelper.concatHtml(categories);
                            return (
                                <>
                                    <span>{locality} › </span>
                                    <span className="boat-card__category__seperate" dangerouslySetInnerHTML={{ __html }} />
                                </>
                            );
                        })()}
                    </div>
                    <div className="boat-card__footer">
                        <div>
                            {isDiscount && <span className="boat-card__old-price">{`${Math.floor(oldPrice)}€`}</span>}
                            <div>
                                {isDiscount && <span className="boat-card__discount">-{discount}%</span>}
                                <span className="boat-card__total-price">{`${Math.floor(price)}€`}</span>
                            </div>
                        </div>
                        <Button link={false} className="boat-card__footer__button">View Details</Button>
                    </div>
                </div>
                <style jsx>{`
                    .boat-card { transition: all 300ms; user-select: none; border-radius: 5px; margin-bottom: 30px; overflow: hidden; display: block; box-shadow: 0 1px 10px 0 rgba(0,0,0,0.10);  }
                    .boat-card:hover { box-shadow: 0 1px 10px 5px rgba(0,0,0,0.10); }
                    .boat-card:hover .boat-card__img span { transform: scale(1.1) rotate(5deg); }
                    .boat-card:hover .boat-card__img:before { opacity: 0.3 }
                    .boat-card__img { position: relative; padding-bottom: 66%; overflow: hidden; background-image: url(${IMAGES.PLACEHOLDER}); background-size: cover; background-position: center }
                    .boat-card__img span { display: block; left: -2.5%; top: -2.5%; width: 105%; height: 105%; background-size: cover; background-position: center; transition: all 250ms; position: absolute; z-index: 0; }
                    .boat-card__img:before { z-index:1; transition: all 300ms; content: ''; display: block; position: absolute; left:0; top: 0; width: 100%; height: 100%; background-color: #222222; opacity: 0; }
                    .boat-card__content { background-color: #ffffff; padding: 12px 15px; }
                    .boat-card__title { font-size: 18px; line-height: 23px; color: ${COLORS.primary}; font-weight: bold; margin-bottom: 6px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden } 
                    .boat-card__score { display: flex; flex-direction: row; justify-content: flex-start; align-items: center; }
                    .boat-card__score__avg { padding: 0 5px; border-radius: 2px; background-color: ${COLORS.primary}; color: #ffffff; font-size: 14px; line-height: 19px; }
                    .boat-card__score__total { padding-left: 6px; font-size: 15px; line-height: 19px; color: ${COLORS.primary} }
                    .boat-card__category { -webkit-line-clamp: 2; display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; margin: 15px 0 10px 0; font-size: 15px; line-height: 21px; color: ${COLORS.primary}; }
                    .boat-card__category__seperate :global(span):after{ content: '·'; display: inline-block; margin: 0 5px }
                    .boat-card__category__seperate :global(span):last-child:after { display: none }
                    .boat-card__footer { height: 48px; border-top: 1px solid #DEE3E5; padding-top: 6px; display: flex; flex-direction: row; justify-content: flex-start; align-items: flex-end; }
                    .boat-card__footer :global(.boat-card__footer__button) { margin-left: auto; }
                    .boat-card__total-price { display: inline-block; vertical-align: middle; font-size: 17px; line-height: 22px; color: ${COLORS.primary}; font-weight: bold;  }
                    .boat-card__old-price { display: inline-block; color: ${COLORS.orange}; font-size: 14px; line-height: 19px; text-decoration: line-through } 
                    .boat-card__discount { display: inline-block; margin-right: 6px; vertical-align: middle; background-color: ${COLORS.orange}; color: #ffffff; font-size: 10px; font-weight: bold; line-height: 13px; height: 15px; border-radius: 2px; padding: 2px 6px; }

                    @media all and (max-width: 768px) {
                        .boat-card { display: flex; flex-direction: row; justify-content: flex-start; align-items; center; }
                        .boat-card__img { flex: 0 0 127px; width: 127px; height: auto; padding-bottom: 0; }
                        .boat-card__content { flex: 1; overflow: hidden; padding: 8px 9px 8px 5px; }
                        .boat-card__title { display: flex; flex-direction: row; justify-content: flex-start; align-items; center; line-height: 19px; }
                        .boat-card__title .mdl { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; }
                        .boat-card__title .yr { font-size: 12px; font-weight: normal; }
                        .boat-card__footer { padding-top: 6px; height: auto; align-items: center; }
                        .boat-card__score__avg { font-size: 12px; }
                        .boat-card__score__total { font-size: 12px; }
                        .boat-card__category { font-size: 12px; line-height: 15px; margin-bottom: 7px }  
                        .boat-card__category__seperate :global(span):after{ content: '|' }
                        .boat-card__category__seperate :global(span):not(:first-child) { color: #618993 }
                        .boat-card__total-price { font-size: 14px; line-height: 19px; }
                        .boat-card__old-price { font-size: 12px; line-height: 15px; }
                        .boat-card__footer :global(.boat-card__footer__button) { font-size: 0; padding: 6px 11px; } 
                        .boat-card__footer :global(.boat-card__footer__button):after { content: '>'; font-size: 20px } 
                    }
                `}</style>
            </a>
        </Link>
    )
}

export default BoatCard;