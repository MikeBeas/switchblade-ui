import { useNavigate } from 'react-router';
import { SHORTCUT } from 'router/paths';

import Icon from 'components/Icon';
import { ReactComponent as NewIcon } from 'icons/new.svg';
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