import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectShowSetupDrawer, setShowSetupDrawer } from 'state/app';

import Stack from 'components/Stack';
import Drawer from 'components/Drawer';
import Button from 'components/Button';

import { switchblade } from 'lib/switchblade';
import Input from 'components/Input';
import Alert from 'components/Alert';

const SetupDrawer = () => {
  const dispatch = useDispatch();

  const showSetupDrawer = useSelector(selectShowSetupDrawer);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!showSetupDrawer) {
      setUsername('');
      setPassword('');
      setError(null);
      setMessage(null);
    }
  }, [showSetupDrawer])

  const save = async () => {
    setMessage(null);
    setError(false);
    setLoading(true);
    const body = {}
    if (username.trim() !== "") body.username = username;
    if (password.trim() !== "") body.password = password;

    try {
      await switchblade.setup.setup({
        username,
        password
      })

      setUsername('');
      setPassword('');
      dispatch(setShowSetupDrawer(false));
    } catch (e) {
      setMessage(e.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const tabIndex = showSetupDrawer ? undefined : -1;

  return (
    <Drawer
      canClose={!loading}
      header="Switchblade Setup"
      position={Drawer.Positions.Right}
      open={showSetupDrawer}
      showCloseButton={false}
      hide={() => dispatch(setShowSetupDrawer(false))}
      footer={[
        <Button block key="close" size={Button.Sizes.Large} color={Button.Colors.White} onClick={() => dispatch(setShowSetupDrawer(false))}>
          Close
        </Button>
      ]}
    >
      <Stack style={{ alignItems: 'flex-start', flexWrap: 'wrap' }} gap={40}>
        <div>
          This function will immediately create a new user on your Switchblade server. This will only be successful if there are no users setup on your server already.
        </div>

        {message && (
          <Alert
            title={error ? 'Setup Error' : 'Setup Complete'}
            content={message}
            color={error ? Alert.Colors.Red : Alert.Colors.Blue}
          />
        )}

        <Stack block style={{ width: '100%' }}>
          <Input
            id="u"
            block
            tabIndex={tabIndex}
            size={Input.Sizes.Large}
            disabled={loading}
            placeholder="Username"
            autoComplete="username"
            name="u"
            value={username}
            onChange={(value) => setUsername(value)}
          />

          <Input
            id="p"
            block
            tabIndex={tabIndex}
            size={Input.Sizes.Large}
            disabled={loading}
            placeholder="Set Password"
            autoComplete="new-password"
            name="p"
            value={password}
            type="password"
            onChange={(value) => setPassword(value)}
          />

          <Button
            block
            tabIndex={tabIndex}
            key="save"
            disabled={loading}
            size={Button.Sizes.Large}
            onClick={save}
          >
            Create User
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  )
}

export default SetupDrawer;