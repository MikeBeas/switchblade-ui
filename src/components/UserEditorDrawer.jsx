import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import Stack from 'components/Stack';
import Drawer from 'components/Drawer';
import LabeledInput from 'components/LabeledInput';
import Input from 'components/Input';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Alert from 'components/Alert';

import { createUser, loadUser, modifyUser, selectUser, selectUserError, selectUserLoading, setNewUser, setUserError, setUserLoading } from 'state/users';
import { selectCurrentUser, selectPermissions } from 'state/server';

import { USERS } from 'router/paths';
import Checkbox from 'components/Checkbox';
import Divider from 'components/Divider';

const defaultData = {
  username: '',
  password: '',
  deleted: false,
  permissions: {}
};

const UserEditorDrawer = ({ openDrawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [data, setData] = useState(defaultData);
  const updateData = (value) => setData((prev) => ({ ...prev, ...value }));
  const updatePermission = (value) => setData((prev) => ({ ...prev, permissions: { ...prev.permissions, ...value } }));

  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const permissions = useSelector(selectPermissions);

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (params.userId) {
      dispatch(loadUser(params.userId));
    }
  }, [params.userId]);

  useEffect(() => {
    if (user.id && user.id == params.userId) {
      setData({
        username: user.username,
        deleted: user.deleted,
        permissions: user.permissions
      })
    } else if (!params.userId) {
      setData(defaultData)
    }
  }, [JSON.stringify(user), params.userId, openDrawer]);

  useEffect(() => {
    dispatch(setUserError());
  }, [JSON.stringify(data)]);

  const deleteOrRestoreUser = async (deleted) => {
    if (confirm(`Are you sure you want to ${deleted ? 'delete' : 'restore'} ${user?.username}?`)) {
      await dispatch(modifyUser(params.userId, { deleted }))
    }
  }

  const saveUser = async () => {
    try {
      if (!params.userId) {
        await dispatch(createUser(data));
      } else {
        await dispatch(modifyUser(params.userId, data));
      }
      navigate(USERS);
    } catch (e) {
      dispatch(setUserError(e.message));
    } finally {
      dispatch(setUserLoading(false))
    }
  }

  const tabIndex = params.userId || openDrawer ? undefined : -1;

  return (
    <Drawer
      header={params.userId ? `Edit ${user.username}` : `New User`}
      hide={() => {
        navigate(USERS)
        dispatch(setNewUser(false))
      }}
      open={params.userId || openDrawer}
      footer={[
        <Stack key="footer" style={{ width: '100%' }}>
          <div style={{ alignSelf: 'flex-start' }}>*required field</div>
          <Stack block horizontal>
            {params.userId && !user.isOwner && (
              <Button
                block
                tabIndex={tabIndex}
                disabled={loading}
                size={Button.Sizes.Large}
                key="deleteOrRestore"
                color={user.deleted ? Button.Colors.White : Button.Colors.Red}
                onClick={() => deleteOrRestoreUser(!user.deleted)}
              >
                {user.deleted ? 'Restore' : 'Delete'}
              </Button>
            )}

            <Button
              block
              tabIndex={tabIndex}
              disabled={loading}
              size={Button.Sizes.Large}
              key="save"
              color={Button.Colors.Blue}
              onClick={saveUser}
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
          <>
            <Stack center style={{ width: '100%' }} gap={20}>
              {error && (
                <Alert color={Alert.Colors.Red} title="There was a problem with your request." content={error} />
              )}
              <Stack style={{ width: '100%' }} gap={20}>
                <LabeledInput block label={`Username${!params.userId ? '*' : ''}`}>
                  <Input
                    block
                    tabIndex={tabIndex}
                    value={data.username}
                    placeholder="Username"
                    disabled={loading}
                    onChange={(username) => updateData({ username })} />
                </LabeledInput>

                <LabeledInput block label={params.userId ? "Update Password" : "Set Password*"}>
                  <Input
                    block
                    tabIndex={tabIndex}
                    type="password"
                    value={data.password}
                    placeholder="Password"
                    disabled={loading}
                    onChange={(password) => updateData({ password })} />
                </LabeledInput>
              </Stack>
            </Stack>

            <Divider />

            {user.isOwner ? (
              <LabeledInput block label="User Permissions">
                Owner users always have all permissions.
              </LabeledInput>
            ) :
              (
                <LabeledInput block label="User Permissions">
                  {permissions.map((permissionsGroup) => (
                    <div key={permissionsGroup.key}>
                      <div style={{ fontWeight: 700, marginTop: 10 }}>{permissionsGroup.label}</div>
                      <div>{permissionsGroup.permissions.map((permission) => (
                        <div key={permission.key}>
                          <Checkbox
                            tabIndex={tabIndex}
                            disabled={!currentUser.permissions[permission.key]}
                            checked={data.permissions?.[permission.key] ? true : false}
                            onChange={(checked) => updatePermission({ [permission.key]: checked })}
                            label={`${permission.label}${!currentUser.permissions[permission.key] ? ' - You do not have permission to change this.' : ''}`}
                          />
                        </div>
                      ))}
                      </div>
                    </div>
                  ))}
                </LabeledInput>
              )
            }
          </>
        )
      }
    </Drawer >
  )
}

export default UserEditorDrawer;