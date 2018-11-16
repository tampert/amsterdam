// Global
import { COLORS } from '../../global/Theme';

const loading = ({ show = false, className = "", size = 50, text = null }) => {
    if (!show) {
        return null;
    }
    return (
        <div className={`${className} loading`}>
            <span className="loading__icon" style={{ width: `${size}px`, height: `${size}px`, borderWidth: size / 10 }}></span>
            {text && <span className="loading__text">{text}</span>}
            <style>{`
                .loading { text-align: center;  padding: 15px 15px; }
                .loading__icon { display: block; margin: 0 auto; animation: spinning 500ms linear infinite; border-radius: 50%; border: 5px solid ${COLORS.primary}; border-left-color: ${COLORS.grayLight} }
                .loading__text { font-size: 15px; font-weight: normal; margin-top: 15px; display: inline-block; }
                @keyframes spinning {
                    to {
                        transform: rotate(360deg);
                    }
                }
            
            `}</style>
        </div>
    )
}

export default loading;