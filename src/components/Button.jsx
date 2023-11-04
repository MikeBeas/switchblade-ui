import { classNames } from 'lib/util';
import styles from 'styles/Button.module.css';

const Button = ({ children, size, block, color, ghost, inputButton, ...props }) => (
  <button
    className={classNames([
      styles.button,
      size,
      color,
      block && styles.block,
      ghost && styles.ghost,
      inputButton && styles.inputButton
    ])}
    {...props}
  >
    {children}
  </button>
)

Button.Colors = {
  White: styles.white,
  Blue: styles.blue,
  Red: styles.red,
  Green: styles.green
}

Button.Sizes = {
  Default: styles.default,
  Large: styles.large
}

Button.defaultProps = {
  color: Button.Colors.Blue,
  size: Button.Sizes.Default
}

export default Button;