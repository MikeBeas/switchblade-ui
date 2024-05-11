import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router';

import { selectShowNavDrawer, setShowNavDrawer, setShowSystemInfoDrawer } from 'state/app';
import { selectCurrentUser } from 'state/server';
import { logout } from 'state/auth';

import { ME, USERS } from 'router/paths';
import { isMobile } from 'lib/config';

import Drawer from 'components/Drawer';
import NavLink from 'components/NavLink';
import Button from 'components/Button';
import Stack from 'components/Stack';

import SwitchbladeIcon from 'icons/switchblade.svg?react';
import UserIcon from 'icons/user.svg?react';
import ManageUsersIcon from 'icons/manage-users.svg?react';

const sidebarItems = [
  {
    label: "Shortcuts",
    link: "/",
    icon: SwitchbladeIcon
  },
  {
    label: "Users",
    link: USERS,
    icon: ManageUsersIcon,
    permission: 'viewUsers'
  },
  {
    label: "My Account",
    link: ME,
    icon: UserIcon
  }
]

const NavDrawer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showNavDrawer = useSelector(selectShowNavDrawer);
  const { permissions } = useSelector(selectCurrentUser);

  const tabIndex = showNavDrawer ? undefined : -1;

  return (
    <Drawer
      header="Navigation"
      showCloseButton={isMobile}
      open={showNavDrawer}
      position={Drawer.Positions.Left}
      hide={() => dispatch(setShowNavDrawer(false))}
      width={400}
      footer={[
        <Button
          block
          tabIndex={tabIndex}
          size={Button.Sizes.Large}
          key="systemInfo"
          color={Button.Colors.White}
          onClick={() => {
            dispatch(setShowSystemInfoDrawer(true));
            dispatch(setShowNavDrawer(false));
          }}
        >
          System Info
        </Button>,
        <Button
          block
          tabIndex={tabIndex}
          size={Button.Sizes.Large}
          key="logout"
          color={Button.Colors.Red}
          onClick={() => dispatch(logout())}
        >
          Logout
        </Button>
      ]}
    >
      <Stack>
        {sidebarItems.map((item) => !item.permission || permissions?.[item.permission] ? (
          <NavLink
            key={item.label}
            label={item.label}
            icon={item.icon}
            onClick={() => {
              item.link && navigate(item.link);
              item.func && item.func();
              dispatch(setShowNavDrawer(false));
            }}
          />
        ) : null)}
      </Stack>
    </Drawer>
  )
}

export default NavDrawer;