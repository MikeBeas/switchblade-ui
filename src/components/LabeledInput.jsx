import Stack from 'components/Stack';
import { isMobile } from 'lib/config';

const LabeledInput = ({ label, children, block, style }) => (
  <Stack
    gap={5}
    style={{
      alignItems: 'flex-start',
      flexGrow: isMobile ? 1 : 0,
      width: block ? '100%' : undefined,
      ...style
    }}
  >
    <div>{label}</div>
    {children}
  </Stack>
)

LabeledInput.defaultProps = {
  style: {}
}

export default LabeledInput;