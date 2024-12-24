import Button from 'components/Button';
import { classNames } from 'lib/util';
import styles from 'styles/Input.module.css';

const Sizes = {
  Default: styles.default,
  Large: styles.large
}

const Text = ({ size = Sizes.Default, block, onChange, value, button, disabled, viewOnly, ...props }) => (
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

const TextArea = ({ size = Sizes.Default, block, onChange, value, disabled, viewOnly, ...props }) => (
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

const Input = ({ mode = Modes.Text, ...props }) => mode(props);

Input.Sizes = Sizes;
Input.Modes = Modes;

export default Input;