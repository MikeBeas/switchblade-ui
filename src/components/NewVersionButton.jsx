import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentShortcut, setNewVersion } from 'state/versions';
import { selectCurrentUser } from 'state/server';

import Icon from 'components/Icon';
import { ReactComponent as NewIcon } from 'icons/new.svg';
import PermissionsWrapper from 'components/PermissionsWrapper';

const NewVersionButton = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentShortcut = useSelector(selectCurrentShortcut);

  return (
    <PermissionsWrapper
      permissionKey="createVersionForAnyShortcut"
      or={currentShortcut?.creator?.id === currentUser.id}
    >
      <Icon icon={NewIcon} onClick={() => dispatch(setNewVersion(true))} size={16} />
    </PermissionsWrapper>
  )
}

export default NewVersionButton;