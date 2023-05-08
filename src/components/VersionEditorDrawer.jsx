import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import dayjs from 'dayjs';

import { VERSION } from 'router/paths';

import { VERSION_STATES, VERSION_STATE_ALL, VERSION_STATE_PUBLISHED } from 'constants/versionStates';
import Stack from 'components/Stack';
import Drawer from 'components/Drawer';
import Select from 'components/Select';
import LabeledInput from 'components/LabeledInput';
import Input from 'components/Input';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Alert from 'components/Alert';
import Checkbox from 'components/Checkbox';

import { newVersionForShortcut, loadCurrentVersion, modifyVersionForShortcut, selectNewVersion, selectCurrentVersion, selectCurrentVersionError, selectCurrentVersionLoading, setNewVersion, setVersionError, selectCurrentShortcut } from 'state/versions';

const defaultData = {
  version: '',
  notes: '',
  url: '',
  state: VERSION_STATE_PUBLISHED,
  required: false,
  date: '',
  minimumiOS: '',
  minimumMac: ''
};

const VersionEditorDrawer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [data, setData] = useState(defaultData);

  const updateData = (value) => setData((prev) => ({ ...prev, ...value }))

  const shortcut = useSelector(selectCurrentShortcut);

  const currentVersion = useSelector(selectCurrentVersion);
  const loading = useSelector(selectCurrentVersionLoading);
  const error = useSelector(selectCurrentVersionError);
  const newVersion = useSelector(selectNewVersion);

  useEffect(() => {
    if (params.shortcutId && params.versionNumber) {
      dispatch(loadCurrentVersion(params.shortcutId, params.versionNumber));
    }
  }, [params.shortcutId, params.versionNumber]);

  useEffect(() => {
    if (params.versionNumber && currentVersion.version === params.versionNumber) {
      setData({
        version: currentVersion.version,
        notes: currentVersion.notes,
        url: currentVersion.url,
        state: currentVersion.state.value,
        required: currentVersion.required,
        date: currentVersion.released ? dayjs(currentVersion.released).format("YYYY-MM-DDTHH:mm") : '',
        minimumiOS: currentVersion.minimumiOS,
        minimumMac: currentVersion.minimumMac
      })
    } else if (newVersion) {
      setData(defaultData)
    }
  }, [JSON.stringify(currentVersion), params.versionNumber, newVersion]);

  const deleteOrRestoreVersion = async (deleted) => {
    if (confirm(`Are you sure you want to ${deleted ? 'delete' : 'restore'} ${shortcut.name} version ${currentVersion.version}?`)) {
      await dispatch(modifyVersionForShortcut(params.shortcutId, currentVersion.version, { deleted }))
      navigate(VERSION(params.shortcutId));
    }
  }

  const saveVersion = async () => {
    try {
      if (newVersion) {
        await dispatch(newVersionForShortcut(params.shortcutId, data));
      } else {
        await dispatch(modifyVersionForShortcut(params.shortcutId, currentVersion.version, data));
      }
      navigate(VERSION(params.shortcutId));
    } catch (e) {
      dispatch(setVersionError(e.message));
    }
  }

  useEffect(() => {
    dispatch(setVersionError());
  }, [JSON.stringify(data)])

  return (
    <Drawer
      header={newVersion ? `New ${shortcut.name} Version` : `${shortcut.name} ${params.versionNumber}`}
      hide={newVersion ?
        () => dispatch(setNewVersion(false))
        : () => navigate(VERSION(params.shortcutId))
      }
      open={!!shortcut.name && (!!params.versionNumber || newVersion)}
      footer={[
        <Stack key="footer" style={{ width: '100%' }}>
          <div style={{ alignSelf: 'flex-start' }}>*required field</div>
          <Stack block horizontal>
            {!newVersion && (
              <Button
                block
                disabled={loading}
                size={Button.Sizes.Large}
                key="deleteOrRestore"
                color={currentVersion.deleted ? Button.Colors.White : Button.Colors.Red}
                onClick={() => deleteOrRestoreVersion(!currentVersion.deleted)}
              >
                {currentVersion.deleted ? 'Restore' : 'Delete'}
              </Button>
            )}

            <Button
              block
              disabled={loading}
              size={Button.Sizes.Large}
              key="save"
              color={Button.Colors.Blue}
              onClick={saveVersion}
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
          <Stack style={{ width: '100%' }} gap={20}>

            {error && (
              <Alert color={Alert.Colors.Red} title="There was a problem with your request." content={error} />
            )}

            {newVersion && (
              <LabeledInput block label="Version Number*">
                <Input
                  block
                  onChange={(version) => updateData({ version })}
                  placeholder="Version Number"
                  value={data.version}
                />
              </LabeledInput>
            )}


            <LabeledInput block label="iCloud URL*">
              <Input
                block
                placeholder="iCloud URL"
                value={data.url}
                onChange={(url) => updateData({ url })}
              />
            </LabeledInput>

            <LabeledInput block label="Release Notes">
              <Input
                block
                mode={Input.Modes.TextArea}
                placeholder="Release Notes"
                value={data.notes}
                onChange={(notes) => updateData({ notes })}
              />
            </LabeledInput>

            <LabeledInput block label="Publishing Mode">
              <Select
                block
                placeholder="Publishing Mode"
                options={VERSION_STATES.filter((state) => state.value !== VERSION_STATE_ALL)}
                value={data.state}
                onChange={(state) => updateData({ state })}
              />
            </LabeledInput>

            <LabeledInput block label="Release Date">
              <Input
                block
                type="datetime-local"
                placeholder="Release Date"
                value={data.date}
                onChange={(date) => updateData({ date })}
                style={{ WebkitAppearance: 'none', height: 32 }}
              />
            </LabeledInput>

            <Stack block horizontal>
              <LabeledInput block label="Minimum iOS">
                <Input
                  block
                  placeholder="Minimum iOS"
                  value={data.minimumiOS}
                  onChange={(minimumiOS) => updateData({ minimumiOS })}
                  inputMode="numeric"
                />
              </LabeledInput>

              <LabeledInput block label="Minimum Mac">
                <Input
                  block
                  placeholder="Minimum Mac"
                  value={data.minimumMac}
                  onChange={(minimumMac) => updateData({ minimumMac })}
                  inputMode="numeric"
                />
              </LabeledInput>

            </Stack>

            <Stack block horizontal style={{ justifyContent: 'left' }}>
              <Checkbox
                label="Require users to install update"
                checked={data.required}
                onChange={(required) => updateData({ required })}
              />
            </Stack>
          </Stack>
        )}
    </Drawer>
  )
}

export default VersionEditorDrawer;