const Container = ({ children, bottom = 15 }) => {
    return (
        <div className="form-container" style={{ paddingBottom: bottom }}>
            {children}
            <style jsx>{`
                
            `}</style>
        </div>
    )
}

export default Container;