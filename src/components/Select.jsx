import { classNames } from 'lib/util';
import styles from 'styles/Select.module.css';

const Select = ({ onChange, size, block, returnObject, options, value, ...props }) => (
  <select
    value={returnObject ? JSON.stringify(value) : value}
    className={classNames([styles.select, size, block && styles.block])}
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

Select.Sizes = {
  Default: styles.default,
  Large: styles.large
}

Select.defaultProps = {
  options: [],
  size: Select.Sizes.Default
}

export default Select;