import { classNames } from 'lib/util';
import styles from 'styles/Panel.module.css';

const Panel = ({ children, animation, ...props }) => (
  <div className={classNames([styles.panel, animation])} {...props}>
    {children}
  </div>
)

export default Panel;