import { useNavigate } from 'react-router';

import Icon from 'components/Icon';
import { ReactComponent as NewIcon } from 'icons/new.svg';
import PermissionsWrapper from 'components/PermissionsWrapper';
import { USER } from 'router/paths';

const NewUserButton = () => {
  const navigate = useNavigate();

  return (
    <PermissionsWrapper permissionKey="createVersionForAnyShortcut">
      <Icon icon={NewIcon} onClick={() => navigate(USER())} size={16} />
    </PermissionsWrapper>
  )
}

export default NewUserButton;