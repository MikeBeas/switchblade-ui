import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { loadShortcuts, selectShortcutFilters, selectShortcuts, selectShortcutsLoading } from 'state/shortcuts';
import { setHeader } from 'state/app';

import { SHORTCUT, VERSION } from 'router/paths';
import { truncate } from 'lib/util';

import { SHORTCUT_STATUS_COLORS } from 'constants/statusColors';

import Grid from 'components/Grid';
import Card from 'components/Card';
import Stack from 'components/Stack';
import Tag from 'components/Tag';
import Loader from 'components/Loader';
import Button from 'components/Button';
import ShortcutEditorDrawer from 'components/ShortcutEditorDrawer';
import NoContent from 'components/NoContent';

const ShortcutList = ({ openDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shortcuts = useSelector(selectShortcuts);
  const filters = useSelector(selectShortcutFilters);
  const loading = useSelector(selectShortcutsLoading);

  useEffect(() => {
    dispatch(loadShortcuts());
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    dispatch(setHeader('Switchblade'));
  }, [])

  return (
    <Stack gap={30} style={{ width: '100%' }}>
      {loading ? (
        <Stack center>
          <Loader size="100" maxSize="100%" />
        </Stack>
      ) : (
        <Grid>
          <NoContent condition={shortcuts.length === 0}>
            {shortcuts.map((shortcut) => (
              <Card
                key={shortcut.id}
                title={(
                  <Stack horizontal style={{ justifyContent: 'space-between' }} gap={20}>
                    <div>{shortcut.name}</div>
                    <Stack horizontal style={{ fontWeight: 500 }}>
                      {shortcut.deleted && (
                        <Tag ghost color={Tag.Colors.Red}>
                          Deleted
                        </Tag>
                      )}

                      {SHORTCUT_STATUS_COLORS[shortcut.state.value] && (
                        <Tag ghost color={SHORTCUT_STATUS_COLORS[shortcut.state.value]}>
                          {shortcut.state.label}
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
                      onClick={() => navigate(SHORTCUT(shortcut.id))}
                    >
                      Edit
                    </Button>

                    <Button
                      block
                      color={Button.Colors.Blue}
                      onClick={() => navigate(VERSION(shortcut.id))}
                    >
                      Versions
                    </Button>
                  </Stack>
                )}
              >
                {shortcut.headline ?? truncate(shortcut.description) ?? <span style={{ fontStyle: 'italic' }}>No description provided.</span>}
              </Card>
            ))}
          </NoContent>
        </Grid>
      )}

      <ShortcutEditorDrawer open={openDrawer} />
    </Stack>
  )
}

export default ShortcutList;