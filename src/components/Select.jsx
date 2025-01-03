import { classNames } from 'lib/util';
import styles from 'styles/Select.module.css';

const Sizes = {
  Default: styles.default,
  Large: styles.large
}

const Select = ({
  onChange,
  size = Sizes.Default,
  block,
  returnObject,
  options = [],
  value,
  viewOnly,
  disabled,
  ...props
}) => (
  <select
    disabled={disabled || viewOnly}
    value={returnObject ? JSON.stringify(value) : value}
    className={classNames([styles.select, size, block && styles.block, viewOnly && styles.viewOnly])}
    onChange={(e) => onChange(returnObject ? JSON.parse(e.target.value) : e.target.value)}
    {...props}
  >
    {options.map((opt) => (
      <option key={opt.value} value={returnObject ? JSON.stringify(opt) : opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
)

Select.Sizes = Sizes;

export default Select;