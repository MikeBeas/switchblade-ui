import { useSelector } from 'react-redux';
import { selectServerConfig } from 'state/server';

const FeatureFlag = ({ flag, children, alternate }) => {
  const serverConfig = useSelector(selectServerConfig);

  return serverConfig?.features?.[flag] ? children : alternate;
}

export default FeatureFlag;