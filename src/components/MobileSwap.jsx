import { isMobile } from 'lib/config';

const MobileSwap = ({ desktop, mobile }) => isMobile ? mobile() : desktop();

export default MobileSwap;