import Stack from 'components/Stack';
import { isMobile } from 'lib/config';

const LabeledInput = ({ label, children, block, style = {} }) => (
  <Stack
    gap={5}
    style={{
      alignItems: 'flex-start',
      flexGrow: isMobile ? 1 : 0,
      width: block ? '100%' : undefined,
      ...style
    }}
  >
    <div style={{ fontWeight: 700, fontSize: '1.1em' }}>{label}</div>
    {children}
  </Stack>
)

export default LabeledInput;