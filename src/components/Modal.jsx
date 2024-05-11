import { useEffect, useMemo } from 'react';
import Button from 'components/Button';
import { classNames } from 'lib/util';
import Icon from 'components/Icon';
import CloseIcon from 'icons/close.svg?react';
import styles from 'styles/Modal.module.css';

const Modal = ({ open, header, footer, hide, canClose, showCloseButton, children }) => {
  const ESC = "Escape";

  const modalHandleKey = useMemo(() => (e) => { if (e.code === ESC && canClose) hide() }, []);

  useEffect(() => {
    if (open) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      document.addEventListener("keydown", modalHandleKey);
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "scroll";
      document.removeEventListener("keydown", modalHandleKey);
    }
  }, [open, modalHandleKey])

  return (
    <div
      className={classNames([styles.modalBackground, open && styles.modalBackgroundOpen])}
      onClick={() => { if (canClose) hide() }}
    >
      <div
        className={classNames([styles.modalBody, open && styles.modalBodyOpen])}
        onClick={(e) => e.stopPropagation()}
      >

        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <span>{header}</span>
            {canClose && showCloseButton && (
              <Icon
                icon={CloseIcon}
                size={16}
                maxSize={16}
                color="lightgrey"
                onClick={hide}
                style={{ padding: 10 }}
              />
            )}
          </div>
        </div>

        <div
          className={styles.content}
        >
          {children}
        </div>

        {footer &&
          <div className={styles.footerWrapper}>
            <div className={styles.footer}>
              {footer.map((item, i) => (
                <span
                  key={i}
                  className={styles.footerItem}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        }

        {!footer && !showCloseButton && canClose &&
          <div className={styles.footerWrapper}>
            <div className={styles.footer}>
              <Button onClick={hide}>Close</Button>
            </div>
          </div>
        }

      </div>
    </div>
  )
}

Modal.defaultProps = {
  canClose: true
}

export default Modal;