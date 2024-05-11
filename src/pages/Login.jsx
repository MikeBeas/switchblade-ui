import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setShowSetupDrawer, setShowSystemInfoDrawer } from 'state/app';
import { logout, selectAuthLoading, setAuthLoading, selectTokenExpired } from 'state/auth';
import { loadServerConfig, selectServerConfig } from 'state/server';

import { isMobile } from 'lib/config';
import { switchblade } from 'lib/switchblade';

import Button from 'components/Button';
import Input from 'components/Input';
import Stack from 'components/Stack';
import Panel from 'components/Panel';
import Alert from 'components/Alert';
import Loader from 'components/Loader';
import Icon from 'components/Icon';
import Checkbox from 'components/Checkbox';
import FeatureFlag from 'components/FeatureFlag';

import SwitchbladeIcon from 'icons/switchblade.svg?react';

import animations from 'styles/animations.module.css';

const iconSize = 100;
const iconSizes = {
  size: iconSize,
  maxSize: iconSize
}

const LoginPage = () => {
  useEffect(() => {
    document.getElementById("theme-color").setAttribute("content", "whitesmoke");
  }, [isMobile])

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const [mfaJwt, setMfaJwt] = useState();
  const [showMfaForm, setShowMfaForm] = useState();

  const [hostname, setHostname] = useState(localStorage.getItem('hostname') ?? import.meta.env.SWITCHBLADE_API_HOST ?? '');
  const [rememberHost, setRememberHost] = useState(localStorage.getItem('remember') === "true");

  const [error, setError] = useState();

  const tokenExpired = useSelector(selectTokenExpired);
  const loading = useSelector(selectAuthLoading);
  const serverConfig = useSelector(selectServerConfig);

  const dispatch = useDispatch();

  const saveHost = () => {
    if (!hostname) return;
    if (rememberHost) {
      localStorage.setItem('hostname', hostname);
      localStorage.setItem('remember', rememberHost);
    } else {
      localStorage.removeItem('hostname')
      localStorage.removeItem('remember')
    }
    switchblade.setHost(hostname);
    dispatch(loadServerConfig());
  }

  const reset = () => {
    setUsername('')
    setPassword('');
    setOtp('');
    setError('');
  }

  const resetMfa = () => {
    reset();
    setShowMfaForm(false);
    setMfaJwt();
  }

  useEffect(() => {
    if (!tokenExpired) {
      if (showMfaForm) {
        // idk why this works but it doesn't work without the timeout
        setTimeout(() => {
          document.getElementById("otp")?.focus();
        }, .0000000001)
      } else {
        document.getElementById("username")?.focus();
      }
    }
  }, [showMfaForm, serverConfig.api.host, tokenExpired])

  const login = useCallback(async () => {
    try {
      dispatch(setAuthLoading(true))
      setError('');

      switchblade.authenticate();
      localStorage.removeItem("token");
      const { token, mfaRequired, mfaToken } = await switchblade.core.login({ username, password, otp, mfaToken: mfaJwt });

      if (token) {
        localStorage.setItem("token", token);
        switchblade.authenticate(token, () => dispatch(logout(true)));
        dispatch(loadServerConfig());
        reset();
      } else if (mfaRequired) {
        setShowMfaForm(true);
        setMfaJwt(mfaToken);
        switchblade.setExpiredTokenHandler(() => {
          setError(`Your login expired while waiting for the security code. Please try again.`);
          setShowMfaForm(false);
          setOtp('');
          setMfaJwt();
        })
        reset();
      }
    } catch (e) {
      setError(e.message);
    } finally {
      dispatch(setAuthLoading(false))
    }
  }, [username, password, otp, mfaJwt])

  const handleKey = useCallback((e) => {
    if (loading) return;
    if (e.key === 'Enter') {
      login();
    }
  }, [login, loading])

  const handleKeyHostConfig = useCallback((e) => {
    if (serverConfig.loading) return;
    if (e.key === 'Enter') {
      saveHost();
    }
  }, [saveHost, serverConfig.loading])

  const renderMfaInput = useCallback(() => (
    <Input
      block
      id="otp"
      key="o"
      size={Input.Sizes.Large}
      placeholder="One-Time Password"
      disabled={loading}
      onChange={(value) => setOtp(value)}
      value={otp}
      autoComplete="one-time-code"
      inputMode="numeric"
      onKeyDown={handleKey}
    />
  ), [handleKey, loading])

  if (serverConfig.loading && !switchblade.hasHost()) {
    return (
      <Stack center style={{ height: '100vh' }}>
        <Loader
          size="50%"
          maxSize={200}
        />
      </Stack>
    )
  }

  return (
    <Stack center style={{ width: '100%', height: '100%', position: 'absolute' }}>
      <Panel animation={animations.bouncePopIn}>
        <Stack center block gap={30}>
          <Stack
            style={{ fontSize: 28, fontWeight: 900 }}
          >
            {loading || serverConfig.loading ?
              <Loader {...iconSizes} />
              : <Icon icon={SwitchbladeIcon} {...iconSizes} />
            }
            Switchblade
          </Stack>

          {(switchblade.hasHost() && serverConfig.api.host) ? (
            <>
              {error && (
                <Alert
                  centered
                  title="Login Error"
                  content={error}
                  color={Alert.Colors.Red}
                  style={{ maxWidth: '90%', position: 'absolute', top: 20 }}
                  animation={animations.bouncePopIn}
                />
              )}

              {showMfaForm ? (
                <Stack>
                  {renderMfaInput()}
                </Stack>
              ) : (
                <Stack>
                  <Input
                    block
                    id="username"
                    key="username"
                    size={Input.Sizes.Large}
                    placeholder='Username'
                    disabled={loading}
                    onChange={(value) => setUsername(value)}
                    value={username}
                    onKeyDown={handleKey}
                  />
                  <Input
                    block
                    key="password"
                    type="password"
                    size={Input.Sizes.Large}
                    placeholder='Password'
                    disabled={loading}
                    onChange={(value) => setPassword(value)}
                    value={password}
                    onKeyDown={handleKey}
                  />
                  <FeatureFlag flip flag="MULTI_STEP_MFA" alternate={renderMfaInput()} />
                </Stack>
              )}

              <Stack style={{ width: '100%' }}>
                <Button
                  block
                  size={Button.Sizes.Large}
                  disabled={loading}
                  onClick={login}
                  color={Button.Colors.Blue}
                >
                  Login
                </Button>

                {showMfaForm && (
                  <Button
                    block
                    size={Button.Sizes.Large}
                    disabled={loading}
                    onClick={resetMfa}
                    color={Button.Colors.Red}
                  >
                    Cancel
                  </Button>
                )}
              </Stack>
            </>
          ) : (
            <Stack center block>
              {serverConfig.error && !serverConfig.loading && (
                <Alert
                  centered
                  style={{ maxWidth: 273, marginBottom: 30 }}
                  title="API Error"
                  content="There was an error connecting to your Switchblade server. Please check the domain name and ensure there are no slashes at the end."
                  color={Alert.Colors.Red}
                  animation={animations.bouncePopIn}
                />
              )}

              <div style={{ maxWidth: 273, marginBottom: 10 }}>
                {serverConfig.loading ? 'Connecting to your Switchblade server...' : `Enter your Switchblade API's domain name to begin.`}
              </div>

              <Input
                block
                size={Input.Sizes.Large}
                placeholder="Switchblade API Host"
                value={hostname}
                onChange={(value) => setHostname(value)}
                disabled={serverConfig.loading}
                onKeyDown={handleKeyHostConfig}
              />

              <Button
                block
                size={Button.Sizes.Large}
                value={hostname}
                onClick={saveHost}
                disabled={serverConfig.loading}
              >
                Continue
              </Button>

              <Checkbox
                label="Remember on this browser"
                checked={rememberHost}
                onChange={setRememberHost}
                disabled={serverConfig.loading}
              />
            </Stack>
          )}
        </Stack>
      </Panel>

      <Stack
        horizontal
        style={{ color: 'lightgrey', userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        <div
          onClick={() => dispatch(setShowSystemInfoDrawer(true))}
          style={{ cursor: 'pointer' }}
        >
          System Info
        </div>
        {switchblade.hasHost() && (
          <>
            |
            <div
              onClick={() => dispatch(setShowSetupDrawer(true))}
              style={{ cursor: 'pointer' }}
            >
              Setup Server
            </div>
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default LoginPage;