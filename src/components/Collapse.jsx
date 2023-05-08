import { useState } from 'react';

import { ReactComponent as CollapseIcon } from 'icons/collapse.svg';
import Icon from 'components/Icon';

import styles from 'styles/Collapse.module.css';

const Collapse = ({ title, defaultOpen, children }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={styles.collapse} onClick={() => setOpen(!open)}>
      <div className={styles.collapseHeader}>
        {title}
        <Icon icon={CollapseIcon} maxSize={20} className={open ? styles.flip : styles.icon} onClick={() => setOpen(!open)} />
      </div>
      {open && (
        <div className={styles.collapseBody} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      )}
    </div>
  )
}

Collapse.defaultProps = {
  defaultOpen: false
}

export default Collapse;