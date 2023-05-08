import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { loadVersionsForShortcut, selectVersionFilters, selectVersions, selectVersionsLoading, selectCurrentShortcut } from 'state/versions';
import { resetShortcut } from 'state/shortcuts';
import { setHeader } from 'state/app';

import { VERSION } from 'router/paths';

import { VERSION_STATUS_COLORS } from 'constants/statusColors';
import { truncate } from 'lib/util';

import Card from 'components/Card';
import Grid from 'components/Grid';
import Stack from 'components/Stack';
import Loader from 'components/Loader';
import Tag from 'components/Tag';
import VersionEditorDrawer from 'components/VersionEditorDrawer';
import NoContent from 'components/NoContent';
import Button from 'components/Button';

const isValidDownloadLink = (url) => {
  try {
    new URL(url);
  } catch {
    return false;
  }

  return true;
}

const openUrl = (downloadLink) => {
  const url = new URL(downloadLink);
  if (url.host.includes("icloud.com")) {
    window.location.href = url;
  } else {
    window.open(url)
  }
}

const ShortcutVersionList = ({ openDrawer }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const versions = useSelector(selectVersions);
  const currentShortcut = useSelector(selectCurrentShortcut);
  const loading = useSelector(selectVersionsLoading);
  const filters = useSelector(selectVersionFilters);

  useEffect(() => {
    dispatch(setHeader(currentShortcut.name))
  }, [currentShortcut.name])

  useEffect(() => {
    dispatch(loadVersionsForShortcut(params.shortcutId));
  }, [params.shortcutId, JSON.stringify(filters)]);

  useEffect(() => () => dispatch(resetShortcut()), []);

  return (
    <Stack gap={30} style={{ width: '100%' }}>
      <Grid>
        {loading ?
          <Stack center>
            <Loader size="100" maxSize="100%" />
          </Stack>
          : (
            <NoContent condition={versions.length === 0}>
              {versions.map((version) => {
                const validUrl = isValidDownloadLink(version.url);
                return (
                  <Card
                    key={version.version}
                    title={(
                      <Stack horizontal style={{ justifyContent: 'space-between' }} gap={20}>
                        <div>{version.version}</div>
                        <Stack horizontal style={{ fontWeight: 500, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                          {version.required && (
                            <Tag ghost color={Tag.Colors.Purple}>
                              Required
                            </Tag>
                          )}

                          {version.deleted && (
                            <Tag ghost color={Tag.Colors.Red}>
                              Deleted
                            </Tag>
                          )}

                          {version.prerelease && (
                            <Tag ghost color={Tag.Colors.Green}>
                              Pre-Release
                            </Tag>
                          )}

                          {VERSION_STATUS_COLORS[version.state.value] && (
                            <Tag ghost color={VERSION_STATUS_COLORS[version.state.value]}>
                              {version.state.label}
                            </Tag>
                          )}
                        </Stack>
                      </Stack>
                    )}
                    footer={(
                      <Stack
                        horizontal
                        style={{ justifyContent: 'space-between' }} gap={10}
                      >
                        <Button
                          block
                          color={Button.Colors.White}
                          onClick={() => navigate(VERSION(params.shortcutId, version.version))}
                        >
                          Edit
                        </Button>

                        <Button
                          block
                          color={Button.Colors.Green}
                          onClick={() => openUrl(version.url)}
                          disabled={!validUrl}
                        >
                          {validUrl ? 'Install' : 'Invalid URL'}
                        </Button>
                      </Stack>
                    )}
                  >
                    {truncate(version.notes) ?? <span style={{ fontStyle: 'italic' }}>No change log provided.</span>}
                  </Card>
                )
              })}
            </NoContent>
          )
        }
      </Grid>

      <VersionEditorDrawer open={openDrawer} />
    </Stack >
  )
}

export default ShortcutVersionList;