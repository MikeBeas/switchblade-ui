import { createBrowserRouter } from 'react-router-dom';
import { ME, SHORTCUT, VERSION } from './paths';

import AppChrome from '../AppChrome';
import AccountPage from 'pages/Account';

import ShortcutVersionList from 'pages/ShortcutVersionList';
import ShortcutList from 'pages/ShortcutList';

import FilterVersions from 'components/FilterVersions';
import FilterShortcuts from 'components/FilterShortcuts';
import NewShortcutButton from 'components/NewShortcutButton';
import NewVersionButton from 'components/NewVersionButton';

export const routes = [
  {
    path: "",
    element: <AppChrome />,
    children: [
      {
        path: "/",
        element: <ShortcutList />,
        handle: {
          header: FilterShortcuts,
          button: NewShortcutButton
        }
      },
      {
        path: `${SHORTCUT(":shortcutId?")}`,
        element: <ShortcutList openDrawer />,
        handle: {
          header: FilterShortcuts,
          button: NewShortcutButton
        }
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
        path: ME,
        element: <AccountPage />
      }
    ]
  }
];

export const router = createBrowserRouter(routes);
