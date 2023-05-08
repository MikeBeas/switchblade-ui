import { useNavigate } from 'react-router';
import { SHORTCUT } from 'router/paths';

import Icon from 'components/Icon';
import {ReactComponent as NewIcon} from 'icons/new.svg';

const NewShortcutButton = () => {
  const navigate = useNavigate();

  return <Icon icon={NewIcon} onClick={() => navigate(SHORTCUT())} size={16} />
}

export default NewShortcutButton;