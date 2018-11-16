// THEME
import { COLORS } from '../../../global/Theme';

const Input = ({ placeholder, textarea = false }) => {
    return (
        <div>
            {(() => {
                if (textarea) {
                    return (
                        <textarea placeholder={placeholder} className="form-input textarea"></textarea>
                    )
                }
                return (
                    <input type="text" className="form-input" placeholder={placeholder} />
                )
            })()}
            <style jsx>{`
                .form-input { transition: all 300ms; border: 1px solid #CEDADD; border-radius: 5px; height: 45px; display: block; width: 100%; padding: 0 10px; font-size: 14px; line-height: 19px; color: ${COLORS.primary}  }
                .form-input:focus { border-color: rgba(3, 72, 87, 0.46); }
                .form-input.textarea { height: 102px; padding: 10px; }
                .form-input::placeholder { color: ${COLORS.primary}; opacity: 0.5; }
            `}</style>
        </div>
    )
}

export default Input;