import styles from 'styles/Grid.module.css';

const Grid = ({ children, itemWidth }) => (
  <div
    className={styles.grid}
    style={{
      gridTemplateColumns: `repeat(auto-fit, minmax(${itemWidth}, 1fr))`
    }}
  >
    {children}
  </div>
)

Grid.defaultProps = {
  itemWidth: '350px'
}

export default Grid;