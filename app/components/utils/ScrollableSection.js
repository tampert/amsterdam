const ScrollableSection = ({ column = 5, mobileColumn = 2, margin = 30, mobileMargin = 15, children, className }) => {
    const itemWidth = 100 / column;
    const spaceBetween = ((column - 1) * margin) / column;

    // Mobile Calculation
    const mobileItemW = 100 / mobileColumn;
    return (
        <div>
            <div className={`scrollable-section ${className}`}>
                {children}
            </div>
            <style>{`
                .scrollable-section { margin-bottom: ${margin}px; white-space: nowrap; }
                .scrollable-section > * { display: inline-block!important; width: calc(${itemWidth}% - ${spaceBetween}px); margin-right: ${margin}px; margin-bottom: 0!important; }
                .scrollable-section >*:last-child { margin-right: 0; }
                @media all and (max-width:768px){
                    .scrollable-section { -webkit-overflow scrolling: touch; overflow: auto; width: calc(100% + ${30}px); position: relative; left: -15px; padding: 0 15px; }
                    .scrollable-section > * { width: calc(${mobileItemW}% - ${mobileMargin}px); margin-right: ${mobileMargin}px; }
                }
            `}</style>
        </div>
    )
}

export default ScrollableSection;