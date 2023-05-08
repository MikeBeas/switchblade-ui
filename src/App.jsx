import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router';
import { loadServerConfig, selectServerConfig } from 'state/server';
import { selectTokenExpired, setTokenExpired } from 'state/auth';

import { router } from 'router/routes';
import { isDev } from 'lib/util';

import LoginPage from 'pages/Login';
import SystemInfoDrawer from 'components/SystemInfoDrawer';
import SetupDrawer from 'components/SetupDrawer';
import Modal from 'components/Modal';

const App = () => {
  const dispatch = useDispatch();
  const serverConfig = useSelector(selectServerConfig);
  const tokenExpired = useSelector(selectTokenExpired);

  useEffect(() => { dispatch(loadServerConfig()) }, []);

  useEffect(() => {
    if (isDev) {
      document.getElementById("apple-touch-icon").setAttribute("href", "/switchblade-full-dev.png")
      document.getElementById("apple-touch-icon-precomposed").setAttribute("href", "/switchblade-full-dev.png")
    }
  }, [isDev])

  return (
    <>
      <Modal
        open={tokenExpired}
        hide={() => dispatch(setTokenExpired(false))}
        header="Session Expired"
      >
        <div style={{ maxWidth: 500, display: 'flex', gap: 20, flexDirection: 'column' }}>
          <div>
            Your session has expired. To continue, please login again.
          </div>

          <div>You can adjust your session timeout length on the Switchblade server using the environment variables described in the Switchblade documentation.
          </div>
        </div>
      </Modal>

      <SystemInfoDrawer />
      <SetupDrawer />
      {serverConfig.api.authenticated ?
        <RouterProvider router={router} />
        : <LoginPage />}
    </>
  )
}

export default App;