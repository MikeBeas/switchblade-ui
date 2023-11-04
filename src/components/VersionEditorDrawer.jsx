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

const VersionEditorDrawer = ({ viewOnly }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [data, setData] = useState(defaultData);

  const updateData = (value) => setData((prev) => ({ ...prev, ...value }));

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

  const tabIndex = !!shortcut.name && (!!params.versionNumber || newVersion) ? undefined : -1;

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
            {!newVersion && !viewOnly && (
              <Button
                block
                tabIndex={tabIndex}
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
              tabIndex={tabIndex}
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
                  tabIndex={tabIndex}
                  onChange={(version) => updateData({ version })}
                  placeholder="Version Number"
                  value={data.version}
                  viewOnly={viewOnly}
                />
              </LabeledInput>
            )}

            {params.versionNumber && currentVersion?.creator?.name && (
              <div style={{ alignSelf: 'flex-start' }}>
                Version created by <span style={{ fontWeight: 900 }}>{currentVersion.creator.name}</span>
              </div>
            )}

            <LabeledInput block label="iCloud URL*">
              <Input
                block
                tabIndex={tabIndex}
                placeholder="iCloud URL"
                value={data.url}
                onChange={(url) => updateData({ url })}
                viewOnly={viewOnly}
              />
            </LabeledInput>

            <LabeledInput block label="Release Notes">
              <Input
                block
                tabIndex={tabIndex}
                mode={Input.Modes.TextArea}
                placeholder="Release Notes"
                value={data.notes}
                onChange={(notes) => updateData({ notes })}
                viewOnly={viewOnly}
              />
            </LabeledInput>

            <LabeledInput block label="Publishing Mode">
              <Select
                block
                tabIndex={tabIndex}
                placeholder="Publishing Mode"
                options={VERSION_STATES.filter((state) => state.value !== VERSION_STATE_ALL)}
                value={data.state}
                onChange={(state) => updateData({ state })}
                viewOnly={viewOnly}
              />
            </LabeledInput>

            <LabeledInput block label="Release Date">
              <Input
                block
                tabIndex={tabIndex}
                type="datetime-local"
                placeholder="Release Date"
                value={data.date}
                onChange={(date) => updateData({ date })}
                style={{ WebkitAppearance: 'none', height: 32 }}
                viewOnly={viewOnly}
              />
            </LabeledInput>

            <Stack block horizontal>
              <LabeledInput block label="Minimum iOS">
                <Input
                  block
                  tabIndex={tabIndex}
                  placeholder="Minimum iOS"
                  value={data.minimumiOS}
                  onChange={(minimumiOS) => updateData({ minimumiOS })}
                  inputMode="numeric"
                  viewOnly={viewOnly}
                />
              </LabeledInput>

              <LabeledInput block label="Minimum Mac">
                <Input
                  block
                  tabIndex={tabIndex}
                  placeholder="Minimum Mac"
                  value={data.minimumMac}
                  onChange={(minimumMac) => updateData({ minimumMac })}
                  inputMode="numeric"
                  viewOnly={viewOnly}
                />
              </LabeledInput>

            </Stack>

            <Stack block horizontal style={{ justifyContent: 'left' }}>
              <Checkbox
                tabIndex={tabIndex}
                label="Require users to install update"
                checked={data.required}
                onChange={(required) => updateData({ required })}
                disabled={viewOnly}
              />
            </Stack>
          </Stack>
        )}
    </Drawer>
  )
}

export default VersionEditorDrawer;