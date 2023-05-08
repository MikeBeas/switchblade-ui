import styles from 'styles/Checkbox.module.css';

const Checkbox = ({ label, checked, id, onChange, ...props }) => (
  <>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className={styles.checkbox}
      id={id ?? label}
      {...props}
    />
    <label className={styles.label} htmlFor={id ?? label}>
      {label}
    </label>
  </>
)

export default Checkbox;