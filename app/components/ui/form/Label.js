// THEME
import { COLORS } from '../../../global/Theme';

const Label = ({ children }) => {
    return (
        <label className="form-label">
            {children}
            <style jsx>{`
                .form-label { font-size: 13px; color: ${COLORS.primary}; font-weight: bold;	line-height: 18px; }
            `}</style>
        </label>
    )
}

export default Label;