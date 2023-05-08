import Icon from 'components/Icon';
import Stack from 'components/Stack';
import { ReactComponent as NotFoundIcon } from 'icons/not-found.svg';

const NoContent = ({ condition, children }) => condition ? (
  <Stack center gap={30} style={{ margin: 40 }}>
    <Icon icon={NotFoundIcon} size={200} maxSize="95%" color="grey" />
    <div style={{ fontSize: 28, color: 'grey' }}>Nothing here!</div>
  </Stack>)
  : children

export default NoContent;