import Icon from 'components/Icon';
import Stack from 'components/Stack';
import NotFoundIcon from 'icons/not-found.svg?react';

const NoContent = ({ condition, children }) => condition ? (
  <Stack center gap={30} style={{ margin: 40 }}>
    <Icon icon={NotFoundIcon} size={200} maxSize="95%" color="grey" />
    <div style={{ fontSize: 28, color: 'grey' }}>Nothing here!</div>
  </Stack>)
  : children

export default NoContent;