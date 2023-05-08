import { classNames } from 'lib/util';
import styles from 'styles/Stack.module.css';

const Directions = {
  Vertical: "vertical",
  Horizontal: "horizontal"
}

const Stack = ({ horizontal, gap, block, children, center, style, className, ...props }) => (
  <div
    className={classNames([
      styles.stack,
      horizontal ? styles.horizontal : styles.vertical,
      center && styles.center,
      block && (horizontal ? styles.blockHorizontal : styles.blockVertical),
      className
    ])}
    style={{ gap, ...style }}
    {...props}
  >
    {children}
  </div>
)

Stack.Directions = Directions;

Stack.defaultProps = {
  gap: 10
}

export default Stack;