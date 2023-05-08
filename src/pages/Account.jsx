import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadMe, modifyMe, selectMe, selectMeLoading, disableMfa } from 'state/me';
import { setHeader } from 'state/app';

import Input from 'components/Input';
import Stack from 'components/Stack';
import Button from 'components/Button';
import Alert from 'components/Alert';
import MfaModal from 'components/MfaModal';
import Loader from 'components/Loader';
import Panel from 'components/Panel';
import MobileSwap from 'components/MobileSwap';

const AccountPage = () => {
  const dispatch = useDispatch();

  const me = useSelector(selectMe);
  const loading = useSelector(selectMeLoading);

  const [username, setUsername] = useState(me?.username ?? '');
  const [password, setPassword] = useState('');
  const [saved, setSaved] = useState(false);

  const [showMfaModal, setShowMfaModal] = useState(false);

  useEffect(() => {
    dispatch(setHeader('Account'))
    dispatch(loadMe())
  }, [])

  useEffect(() => {
    if (!me?.username) return;
    setUsername(me.username);
  }, [me]);

  useEffect(() => {
    setSaved(false);
  }, [username, password])

  const save = async () => {
    const body = {}
    if (username.trim() !== "") body.username = username;
    if (password.trim() !== "") body.password = password;

    await dispatch(modifyMe(body));
    setPassword('');
    setSaved(true);
  }

  const doDisableMfa = async () => {
    if (confirm('Are you sure you want to disable MFA for your account?')) {
      await dispatch(disableMfa());
    }
  }

  if (loading) {
    return (
      <Stack center style={{ position: 'absolute', bottom: 0, top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loader size="50%" maxSize="200" />
      </Stack>
    )
  }

  const render = () => (
    <Stack style={{ width: 400, maxWidth: '95%' }} gap={30}>
      {saved && <Alert title="Account Updated" content="Your account details have been saved." />}

      <Stack block style={{ width: '100%' }}>
        <Input
          id="u"
          block
          size={Input.Sizes.Large}
          disabled={loading}
          placeholder="Username"
          autoComplete="off"
          name="u"
          value={username}
          onChange={(value) => setUsername(value)}
        />

        <Input
          id="p"
          block
          size={Input.Sizes.Large}
          disabled={loading}
          placeholder="Change Password"
          autoComplete="new-password"
          name="p"
          value={password}
          type="password"
          onChange={(value) => setPassword(value)}
        />
      </Stack>

      <Stack block style={{ width: '100%' }}>
        <Button
          block
          size={Button.Sizes.Large}
          onClick={me?.mfaEnabled ? doDisableMfa : () => setShowMfaModal(true)}
          disabled={loading}
          color={me?.mfaEnabled ? Button.Colors.Red : Button.Colors.White}
        >
          {me?.mfaEnabled ? 'Disable' : 'Enable'} MFA
        </Button>

        <Button
          block
          size={Button.Sizes.Large}
          onClick={save}
          disabled={loading}
        >
          Save Changes
        </Button>
      </Stack>
    </Stack>
  )

  return (
    <>
      <Stack>
        <MobileSwap
          desktop={() => (
            <Panel style={{ width: '100%', maxWidth: '100%' }}>
              <Stack>
                {render()}
              </Stack>
            </Panel>
          )}
          mobile={render}
        />
      </Stack>

      <MfaModal
        open={showMfaModal}
        setOpen={setShowMfaModal}
        onSuccess={() => {
          dispatch(loadMe());
        }}
      />
    </>
  )
}

export default AccountPage;