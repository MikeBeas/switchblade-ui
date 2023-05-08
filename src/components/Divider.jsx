const Divider = ({ style, size }) => (
  <hr style={{
    width: '100%',
    border: 'none',
    borderBottom: '1px lightgrey solid',
    margin: `${size}px 0`,
    ...style
  }}
  />
)

Divider.defaultProps = {
  size: 20
}

export default Divider;