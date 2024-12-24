import styles from 'styles/Grid.module.css';

const Grid = ({ children, itemWidth = '350px' }) => (
  <div
    className={styles.grid}
    style={{
      gridTemplateColumns: `repeat(auto-fit, minmax(${itemWidth}, 1fr))`
    }}
  >
    {children}
  </div>
)

export default Grid;