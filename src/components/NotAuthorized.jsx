import Button from 'components/Button';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import Stack from 'components/Stack';

import AlertIcon from 'icons/alert.svg?react';
import { useNavigate } from 'react-router';

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <Modal
      open
      footer={[
        <Button
          key="close"
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      ]}
    >
      <div style={{ margin: 20 }}>
        <Stack block center gap={20}>
          <Icon icon={AlertIcon} size={100} maxSize="95%" color="grey" />
          <div style={{ fontSize: 24, color: 'grey' }}>You don't have permission to view this page.</div>
        </Stack>
      </div>
    </Modal>
  )
}

export default NotAuthorized;