import { classNames } from 'lib/util';
import animations from 'styles/animations.module.css';
import styles from 'styles/Alert.module.css';

const Alert = ({ title, content, color, animated, centered, animation, ...props }) => (
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

Alert.Colors = {
  White: "white",
  Blue: "blue",
  Red: "red",
  Yellow: "yellow",
  Green: "green"
}

Alert.defaultProps = {
  color: Alert.Colors.Blue,
  animated: true,
  animation: animations.pullIn
}

export default Alert;