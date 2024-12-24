import { classNames } from 'lib/util';
import styles from 'styles/Button.module.css';

const Colors = {
  White: styles.white,
  Blue: styles.blue,
  Red: styles.red,
  Green: styles.green
}

const Sizes = {
  Default: styles.default,
  Large: styles.large
}

const Button = ({
  children,
  size = Sizes.Default,
  block,
  color = Colors.Blue,
  ghost,
  inputButton,
  ...props
}) => (
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

Button.Colors = Colors;
Button.Sizes = Sizes;

export default Button;