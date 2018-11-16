// Global
import { COLORS } from '../../global/Theme';

const Pagination = () => {
    return (
        <div className="pagination">
            <div className="pagination__container">
                <a href="" className="active">1</a>
                <a href="">2</a>
                <a href="">3</a>
                <a>...</a>
                <a href="">21</a>
            </div>
            <style>{`
                .pagination { padding: 15px 0; }
                .pagination__container { display: flex; flex-direction: row; align-items: center; justify-content: center; }
                .pagination__container a { margin-left: 10px; text-align: center; font-size: 15px; line-height: 36px; color: ${COLORS.primary}; width: 36px; height: 36px; border-radius: 50%; background-color: transparent; transition: all 300ms;  }
                .pagination__container a.active, .pagination__container a[href]:hover { background-color: ${COLORS.primary}; color: #fff;  }
                .pagination__container a:last-child { margin-left: 0; }
            `}</style>
        </div>
    )
}

export default Pagination;