import { classNames } from 'lib/util';
import animations from 'styles/animations.module.css';
import styles from 'styles/Alert.module.css';

const Colors = {
  White: "white",
  Blue: "blue",
  Red: "red",
  Yellow: "yellow",
  Green: "green"
}

const Alert = ({
  title,
  content,
  color = Colors.Blue,
  animated = true,
  centered,
  animation = animations.pullIn,
  ...props
}) => (
  <div
    className={classNames([
      styles.alert,
      styles[color],
      centered && styles.centered,
      animated && animation
    ])}
    {...props}
  >
    <div className={styles.title}>{title}</div>
    <div className={styles.content}>{content}</div>
  </div>
)

Alert.Colors = Colors;

export default Alert;