import { ReactComponent as LoaderIcon } from 'icons/loader.svg';
import styles from 'styles/Loader.module.css';

const Loader = ({ size, maxSize, animation }) => {
  return (
    <span
      className={animation}
      style={{
        height: size,
        width: size,
        maxWidth: maxSize,
        maxHeight: maxSize,
        borderRadius: '50%'
      }}
    >
      <LoaderIcon
        className={styles.loader}
        style={{
          height: size,
          width: size,
          maxHeight: maxSize,
          maxWidth: maxSize
        }}
      />
    </span>
  )
}

Loader.defaultProps = {
  size: 48
}

export default Loader;