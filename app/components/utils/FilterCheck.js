// Components
import { Form } from '../ui';

// Style
import { COLORS } from '../../global/Theme';

const FilterCheck = ({ checked, value, onChange, label, labelValue }) => {
    return (
        <>
            <Form.Checkbox checked={checked} value={value} onChange={onChange}>
                <span className="filter-check">
                    <span className="ttl">{label}</span>
                    {labelValue && <span className="cnt">{labelValue}</span>}
                </span>
            </Form.Checkbox>
            <style>{`
                .filter-check { display: flex; flex-direction: row; justify-content: flex-start; align-items: center; }
                .filter-check .ttl { color: ${COLORS.primary}; font-size: 14px;	line-height: 22px; }
                .filter-check .cnt { margin-left: auto; color: rgba(54,62,64,0.5); font-size: 10px;	line-height: 22px; }
            `}</style>
        </>
    )
}

export default FilterCheck;