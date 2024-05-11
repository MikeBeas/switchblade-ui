import { useMatches } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { setShowNavDrawer, selectHeader } from 'state/app';

import Stack from 'components/Stack';
import Icon from 'components/Icon';
import Divider from 'components/Divider';

import MenuIcon from 'icons/menu.svg?react';
import styles from 'styles/Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const matches = useMatches();

  const handle = matches?.[matches.length - 1]?.handle;
  const HeaderComponent = handle?.header;
  const ButtonComponent = handle?.button;

  const appHeader = useSelector(selectHeader);

  return (
    <div className={styles.header}>
      <Stack gap={20}>
        <Stack block horizontal style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack horizontal className={styles.headerContent} style={{ cursor: 'pointer' }} onClick={() => dispatch(setShowNavDrawer(true))}>
            <Icon
              size={16}
              maxSize={16}
              icon={MenuIcon}
            />
            {appHeader ?? 'Switchblade'}
          </Stack>
          {ButtonComponent && <ButtonComponent />}
        </Stack>

        {HeaderComponent && <Divider size={0} />}
        {HeaderComponent && <HeaderComponent />}
      </Stack>
    </div>
  )
}

export default Header;