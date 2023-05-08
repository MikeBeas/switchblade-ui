import { classNames } from 'lib/util';
import styles from 'styles/Input.module.css';

const Text = ({ size, block, onChange, value, ...props }) => (
  <input
    className={`${styles.input} ${size} ${block ? styles.block : ''}`}
    onChange={(e) => onChange(e.target.value)}
    value={value ?? ''}
    {...props}
  />
)

const TextArea = ({ size, block, onChange, value, ...props }) => (
  <textarea
    rows={5}
    className={classNames([
      styles.input,
      styles.textarea,
      size,
      block && styles.block
    ])}
    onChange={(e) => onChange(e.target.value)}
    value={value ?? ''}
    {...props}
  />
)

const Modes = {
  Text,
  TextArea
}

const Input = ({ mode, ...props }) => mode(props);

Input.Sizes = {
  Default: styles.default,
  Large: styles.large
}

Input.Modes = Modes;

Input.defaultProps = {
  size: Input.Sizes.Default,
  mode: Input.Modes.Text
}

export default Input;