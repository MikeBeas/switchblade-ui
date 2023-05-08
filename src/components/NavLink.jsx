import Icon from 'components/Icon';
import Stack from 'components/Stack';
import styles from 'styles/NavLink.module.css';

const iconSize = 30;

const NavLink = ({ label, onClick, icon }) => (
  <div className={styles.navLink} onClick={onClick}>
    <Stack horizontal gap={15}>
      <Icon icon={icon} size={iconSize} maxSize={iconSize} />
      {label}
    </Stack>
  </div>
)

export default NavLink;