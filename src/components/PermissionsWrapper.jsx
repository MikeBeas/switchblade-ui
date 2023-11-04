import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'state/server';

const PermissionsWrapper = ({ permissionKey, children, fallback, or }) => {
  const { permissions } = useSelector(selectCurrentUser);

  return (
    permissions[`${permissionKey}`] || or ?
      children
      : fallback
  )
}

export default PermissionsWrapper;