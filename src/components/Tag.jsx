import { classNames } from 'lib/util';
import styles from 'styles/Tag.module.css';

const Tag = ({ children, ghost, color, ...props }) => (
  <div
    className={classNames([
      styles.tag,
      (color && ghost) && styles.ghost,
      color
    ])}
    {...props}
  >
    {children}
  </div>
)

Tag.Colors = {
  Blue: styles.blue,
  Red: styles.red,
  Green: styles.green,
  Purple: styles.purple
}

export default Tag;