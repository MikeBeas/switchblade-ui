import LoaderIcon from 'icons/loader.svg?react';
import styles from 'styles/Loader.module.css';

const Loader = ({ size = 48, maxSize, animation }) => {
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

export default Loader;