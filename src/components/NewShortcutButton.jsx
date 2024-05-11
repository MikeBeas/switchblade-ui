import { useNavigate } from 'react-router';
import { SHORTCUT } from 'router/paths';

import Icon from 'components/Icon';
import NewIcon from 'icons/new.svg?react';
import PermissionsWrapper from 'components/PermissionsWrapper';

const NewShortcutButton = () => {
  const navigate = useNavigate();

  return (
    <PermissionsWrapper permissionKey="createShortcuts">
      <Icon icon={NewIcon} onClick={() => navigate(SHORTCUT())} size={16} />
    </PermissionsWrapper>
  )
}

export default NewShortcutButton;