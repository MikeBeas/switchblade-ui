import { useDispatch } from 'react-redux';
import { setNewVersion } from 'state/versions';

import Icon from 'components/Icon';
import {ReactComponent as NewIcon} from 'icons/new.svg';

const NewVersionButton = () => {
  const dispatch = useDispatch();

  return <Icon icon={NewIcon} onClick={() => dispatch(setNewVersion(true))} size={16} />
}

export default NewVersionButton;