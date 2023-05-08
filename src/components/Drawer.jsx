import { useCallback, useEffect } from 'react';
import Button from 'components/Button';
import { isMobile, isInstalled } from 'lib/config';
import { classNames } from 'lib/util';
import Icon from 'components/Icon';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import styles from 'styles/Drawer.module.css';

const Positions = {
  Top: "top",
  Bottom: "bottom",
  Left: "left",
  Right: "right"
}

const Drawer = ({ open, header, children, footer, hide, canClose, showCloseButton, rounded, width, height, position }) => {
  const ESC = "Escape";

  const drawerHandleKey = useCallback((e) => { if (e.code === ESC && canClose) hide() }, [hide, canClose])

  useEffect(() => {
    if (open) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      document.addEventListener("keydown", drawerHandleKey);
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "scroll";
      document.removeEventListener("keydown", drawerHandleKey)
    }
  }, [open, drawerHandleKey])

  return (
    <div
      className={classNames([styles.drawerBackground, open && styles.drawerBackgroundOpen])}
      onClick={() => { if (canClose) hide() }}
    >
      <div
        className={classNames([
          styles.drawerBody,
          styles[position],
          open && styles.drawerBodyOpen,
          rounded && styles.rounded
        ])}
        onClick={(e) => e.stopPropagation()}
        style={[Positions.Left, Positions.Right].includes(position) ? { width } : { height }}
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
          <div className={styles.footerWrapper} style={{ paddingBottom: isInstalled ? 15 : undefined }}>
            {footer}
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

Drawer.Positions = Positions;

Drawer.defaultProps = {
  canClose: true,
  rounded: !isMobile,
  width: 600,
  height: '100%',
  showCloseButton: true,
  position: Positions.Right
}

export default Drawer;