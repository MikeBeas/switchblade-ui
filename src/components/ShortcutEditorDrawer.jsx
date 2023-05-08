import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import Stack from 'components/Stack';
import Drawer from 'components/Drawer';
import Select from 'components/Select';
import LabeledInput from 'components/LabeledInput';
import Input from 'components/Input';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Alert from 'components/Alert';

import { createShortcut, loadShortcut, modifyShortcut, selectShortcut, selectShortcutError, selectShortcutLoading, setShortcutError } from 'state/shortcuts';
import { SHORTCUT_STATES, SHORTCUT_STATE_ALL, SHORTCUT_STATE_PUBLISHED } from 'constants/shortcutStates';

const defaultData = {
  name: '',
  headline: '',
  description: '',
  website: '',
  state: SHORTCUT_STATE_PUBLISHED,
  deleted: false
};

const ShortcutEditorDrawer = ({ open }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [data, setData] = useState(defaultData);
  const updateData = (value) => setData((prev) => ({ ...prev, ...value }))

  const shortcut = useSelector(selectShortcut);
  const loading = useSelector(selectShortcutLoading);
  const error = useSelector(selectShortcutError);

  useEffect(() => {
    if (params.shortcutId) {
      dispatch(loadShortcut(params.shortcutId));
    }
  }, [params.shortcutId]);

  useEffect(() => {
    if (shortcut.id && shortcut.id == params.shortcutId) {
      setData({
        name: shortcut.name,
        headline: shortcut.headline,
        description: shortcut.description,
        website: shortcut.website,
        state: shortcut.state.value,
        deleted: shortcut.deleted
      })
    } else if (!params.shortcutId) {
      setData(defaultData)
    }
  }, [JSON.stringify(shortcut), params.shortcutId, open]);

  useEffect(() => {
    dispatch(setShortcutError());
  }, [JSON.stringify(data)]);

  const deleteOrRestoreShortcut = async (deleted) => {
    if (confirm(`Are you sure you want to ${deleted ? 'delete' : 'restore'} ${shortcut?.name}?`)) {
      await dispatch(modifyShortcut(params.shortcutId, { deleted }))
      navigate("/");
    }
  }

  const saveShortcut = async () => {
    try {
      if (!params.shortcutId) {
        await dispatch(createShortcut(data));
        navigate("/")
      } else {
        await dispatch(modifyShortcut(params.shortcutId, data));
        navigate("/")
      }
    } catch (e) {
      dispatch(setShortcutError(e.message));
    }
  }

  return (
    <Drawer
      header={params.shortcutId ? `Edit ${shortcut.name}` : `New Shortcut`}
      hide={() => navigate("/")}
      open={params.shortcutId || open}
      footer={[
        <Stack key="footer" style={{ width: '100%' }}>
          <div style={{ alignSelf: 'flex-start' }}>*required field</div>
          <Stack block horizontal>
            {params.shortcutId && (
              <Button
                block
                disabled={loading}
                size={Button.Sizes.Large}
                key="deleteOrRestore"
                color={shortcut.deleted ? Button.Colors.White : Button.Colors.Red}
                onClick={() => deleteOrRestoreShortcut(!shortcut.deleted)}
              >
                {shortcut.deleted ? 'Restore' : 'Delete'}
              </Button>
            )}

            <Button
              block
              disabled={loading}
              size={Button.Sizes.Large}
              key="save"
              color={Button.Colors.Blue}
              onClick={saveShortcut}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      ]}
    >
      {loading ?
        <Stack center block>
          <Loader size="100" maxSize="100%" />
        </Stack>
        : (
          <Stack center style={{ width: '100%' }} gap={20}>
            {error && (
              <Alert color={Alert.Colors.Red} title="There was a problem with your request." content={error} />
            )}
            <Stack style={{ width: '100%' }} gap={20}>
              <LabeledInput block label="Shortcut Name*">
                <Input
                  block
                  value={data.name}
                  placeholder="Shortcut Name"
                  disabled={loading}
                  onChange={(name) => updateData({ name })}
                />
              </LabeledInput>

              <LabeledInput block label="Headline">
                <Input
                  block
                  value={data.headline}
                  placeholder="Headline"
                  disabled={loading}
                  onChange={(headline) => updateData({ headline })}
                />
              </LabeledInput>

              <LabeledInput block label="Description">
                <Input
                  block
                  mode={Input.Modes.TextArea}
                  value={data.description}
                  placeholder="Description"
                  disabled={loading}
                  onChange={(description) => updateData({ description })}
                />
              </LabeledInput>

              <LabeledInput block label="Website">
                <Input
                  block
                  value={data.website}
                  placeholder="Website"
                  disabled={loading}
                  onChange={(website) => updateData({ website })}
                />
              </LabeledInput>

              <LabeledInput block label="Publishing Mode">
                <Select
                  block
                  options={SHORTCUT_STATES.filter((state) => state.value !== SHORTCUT_STATE_ALL)}
                  value={data.state}
                  placeholder="Publishing Mode"
                  disabled={loading}
                  onChange={(state) => updateData({ state })}
                />
              </LabeledInput>
            </Stack>
          </Stack>
        )
      }
    </Drawer>
  )
}

export default ShortcutEditorDrawer;