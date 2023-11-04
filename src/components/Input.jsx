import Button from 'components/Button';
import { classNames } from 'lib/util';
import styles from 'styles/Input.module.css';

const Text = ({ size, block, onChange, value, button, disabled, viewOnly, ...props }) => (
  <>
    <input
      disabled={disabled || viewOnly}
      className={classNames([
        styles.input,
        size,
        (block && !button) && styles.block,
        button && styles.hasButton,
        viewOnly && styles.viewOnly
      ])}
      onChange={(e) => onChange(e.target.value)}
      value={value ?? (viewOnly ? '-' : '')}
      {...props}
    />
    {button ? (
      <Button
        inputButton
        disabled={button.disabled || props.disabled}
        color={button.color ?? Button.Colors.White}
        {...button}
      />
    ) : null}
  </>
)

const TextArea = ({ size, block, onChange, value, disabled, viewOnly, ...props }) => (
  <textarea
    rows={5}
    disabled={disabled || viewOnly}
    className={classNames([
      styles.input,
      styles.textarea,
      size,
      block && styles.block,
      viewOnly && styles.viewOnly
    ])}
    onChange={(e) => onChange(e.target.value)}
    value={value ?? (viewOnly ? '-' : '')}
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