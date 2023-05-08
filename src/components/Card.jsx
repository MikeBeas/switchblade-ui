import { isMobile } from 'lib/config';
import { classNames } from 'lib/util';
import styles from 'styles/Card.module.css';

const Card = ({ title, footer, children, onClick, ...props }) => {
  return (
    <div
      className={classNames([
        styles.card,
        (onClick && !isMobile) && styles.clickable
      ])}
      onClick={onClick}
      {...props}
    >
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.content}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  )
}

export default Card;