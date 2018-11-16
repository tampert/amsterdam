// Style
import { COLORS } from '../../global/Theme';

const PageLoading = ({ show = false, progress = 0 }) => {
    return (
        <div style={{ opacity: (show ? 1 : 0), pointerEvents: "none", visibility: (show ? "visible" : "hidden") }}>
            <div className={`page-loading`}>
                <span style={{ width: `${progress}%` }} />
            </div>
            <style jsx>{`
                .page-loading { width: 100%; height: 3px; z-index: 99999999; position: fixed; width: 100%; top: 0; left: 0; background-color: #f0f0f0; }
                .page-loading > span { transition: all 1000ms ease; position: absolute; left: 0; top: 0; width: 0%; height: 100%; background-color: ${COLORS.primary}; }
            `}</style>
        </div>
    )
}

export default PageLoading;