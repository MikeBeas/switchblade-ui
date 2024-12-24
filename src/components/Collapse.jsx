import { useState } from 'react';

import CollapseIcon from 'icons/collapse.svg?react';
import Icon from 'components/Icon';

import styles from 'styles/Collapse.module.css';

const Collapse = ({ title, defaultOpen = false, children }) => {
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

export default Collapse;