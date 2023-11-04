import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { setHeader } from 'state/app';

import { USER } from 'router/paths';

import Grid from 'components/Grid';
import Card from 'components/Card';
import Stack from 'components/Stack';
import Tag from 'components/Tag';
import Loader from 'components/Loader';
import Button from 'components/Button';
import NoContent from 'components/NoContent';
import PermissionsWrapper from 'components/PermissionsWrapper';
import { loadUsers, selectUserFilters, selectUsers, selectUsersLoading } from 'state/users';
import UserEditorDrawer from 'components/UserEditorDrawer';
import { selectCurrentUser } from 'state/server';

const kv = (k, v) => <div key={k}><span style={{ fontWeight: 'bold' }}>{k}:</span> {v}</div>
const kvMap = (kvs) => kvs.map(([k, v]) => kv(k, v))

const ManageUsers = ({ openDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(selectUsers);
  const filters = useSelector(selectUserFilters);
  const loading = useSelector(selectUsersLoading);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(loadUsers());
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    dispatch(setHeader('Users'));
  }, [])

  return (
    <Stack gap={30} style={{ width: '100%' }}>
      {loading ? (
        <Stack center>
          <Loader size="100" maxSize="100%" />
        </Stack>
      ) : (
        <Grid>
          <NoContent condition={users.length === 0}>
            {users.map((user) => (
              <Card
                key={user.id}
                title={(
                  <Stack horizontal style={{ justifyContent: 'space-between' }} gap={20}>
                    <div>{user.username}</div>
                    <Stack horizontal style={{ fontWeight: 500 }}>
                      {user.deleted ? (
                        <Tag ghost color={Tag.Colors.Red}>
                          Deleted
                        </Tag>
                      )
                        : (
                          <Tag ghost color={Tag.Colors.Green}>
                            Active
                          </Tag>
                        )}
                    </Stack>
                  </Stack>
                )}
                footer={currentUser.permissions.modifyUsers ? (
                  <PermissionsWrapper permissionKey="modifyUsers">
                    <Stack
                      horizontal
                      style={{ justifyContent: 'space-between' }} gap={10}
                    >
                      <Button
                        block
                        color={Button.Colors.White}
                        onClick={() => navigate(USER(user.id))}
                      >
                        Edit
                      </Button>
                    </Stack>
                  </PermissionsWrapper>
                ) : undefined}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {kvMap([
                    ["User ID", user.id],
                    ["Enabled Permissions",
                      `${Object.keys(user.permissions).filter((key) => user.permissions[key]).length} of ${Object.keys(user.permissions).length}`]
                    ,
                    ["Owner", user.isOwner ? 'Yes' : 'No'],
                    ["Created By", user.creator.username ?? 'N/A']
                  ])}
                </div>
              </Card>
            ))}
          </NoContent>
        </Grid>
      )}

      <UserEditorDrawer openDrawer={openDrawer} />
    </Stack>
  )
}

export default ManageUsers;