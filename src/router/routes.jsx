import { createBrowserRouter } from 'react-router-dom';
import { ME, SHORTCUT, SHORTCUT_VIEW, USER, USERS, VERSION, VERSION_VIEW } from './paths';

import AppChrome from '../AppChrome';
import AccountPage from 'pages/Account';
import ManageUsers from 'pages/ManageUsers';

import ShortcutVersionList from 'pages/ShortcutVersionList';
import ShortcutList from 'pages/ShortcutList';

import FilterVersions from 'components/FilterVersions';
import FilterShortcuts from 'components/FilterShortcuts';
import FilterUsers from 'components/FilterUsers';
import NewShortcutButton from 'components/NewShortcutButton';
import NewVersionButton from 'components/NewVersionButton';
import NewUserButton from 'components/NewUserButton';
import NotAuthorized from 'components/NotAuthorized';
import PermissionsWrapper from 'components/PermissionsWrapper';

const shortcutRoute = (openDrawer, viewOnly = false) => ({
  element: <ShortcutList viewOnly={viewOnly} openDrawer={openDrawer} />,
  handle: {
    header: FilterShortcuts,
    button: NewShortcutButton
  }
})

const userRoute = (openDrawer) => ({
  handle: {
    header: FilterUsers,
    button: NewUserButton
  },
  element: (
    <PermissionsWrapper permissionKey="viewUsers" fallback={<NotAuthorized />}>
      <ManageUsers openDrawer={openDrawer} />
    </PermissionsWrapper>
  )
})

export const routes = [
  {
    path: "",
    element: <AppChrome />,
    children: [
      {
        path: "/",
        ...shortcutRoute()
      },
      {
        path: `${SHORTCUT(":shortcutId?")}`,
        ...shortcutRoute(true)
      },
      {
        path: `${SHORTCUT_VIEW(":shortcutId?")}`,
        ...shortcutRoute(true, true)
      },
      {
        path: VERSION(":shortcutId", ":versionNumber?"),
        handle: {
          header: FilterVersions,
          button: NewVersionButton
        },
        element: <ShortcutVersionList />
      },
      {
        path: VERSION_VIEW(":shortcutId", ":versionNumber?"),
        handle: {
          header: FilterVersions,
          button: NewVersionButton
        },
        element: <ShortcutVersionList viewOnly />
      },
      {
        path: ME,
        element: <AccountPage />
      },
      {
        path: USERS,
        ...userRoute()
      },
      {
        path: `${USER(":userId?")}`,
        ...userRoute(true)
      }
    ]
  }
];

export const router = createBrowserRouter(routes);
