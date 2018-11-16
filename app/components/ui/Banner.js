// Global
import { COLORS } from '../../global/Theme';

// Components
import { Button } from './';

const Banner = ({ title, button, image, onClick }) => {
    return (
        <div className="banner" style={{ backgroundImage: `url(${image})` }}>
            <span className="banner__title" dangerouslySetInnerHTML={{ __html: title }} />
            {button && <Button color="blue" size="medium" onClick={onClick}>{button}</Button>}
            <style jsx>{`
                .banner { position: relative; text-align: center; user-select: none; color: #ffffff; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 390px; box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1); margin-bottom: 24px; background-size: cover; background-position: center }
                .banner__title { font-size: 58px; font-weight: bold; line-height: 64px; }
                .banner :global(.button) { margin-top: 30px; padding-left: 58px; padding-right: 58px; }
                @media all and (max-width: 1024px) { 
                    .banner { height: auto; padding: 100px 15px; } 
                    .banner__title { font-size: 26px; line-height: 30px; }
                }
            `}</style>
        </div>
    )
}

export default Banner;