import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router';

import { selectShowNavDrawer, setShowNavDrawer, setShowSystemInfoDrawer } from 'state/app';
import { logout } from 'state/auth';

import { ME } from 'router/paths';
import { isMobile } from 'lib/config';

import Drawer from 'components/Drawer';
import NavLink from 'components/NavLink';
import Button from 'components/Button';
import Stack from 'components/Stack';

import { ReactComponent as SwitchbladeIcon } from 'icons/switchblade.svg';
import { ReactComponent as UserIcon } from 'icons/user.svg';

const sidebarItems = [
  {
    label: "My Shortcuts",
    link: "/",
    icon: SwitchbladeIcon
  },
  {
    label: "Manage Account",
    link: ME,
    icon: UserIcon
  }
]

const NavDrawer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showNavDrawer = useSelector(selectShowNavDrawer);

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
          size={Button.Sizes.Large}
          key="logout"
          color={Button.Colors.Red}
          onClick={() => dispatch(logout())}
        >
          Logout
        </Button>
      ]}
    >
      <Stack direction={Stack.Directions.Vertical}>
        {sidebarItems.map((item) => (
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
        ))}
      </Stack>
    </Drawer>
  )
}

export default NavDrawer;