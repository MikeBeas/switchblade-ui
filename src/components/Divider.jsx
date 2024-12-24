const Divider = ({ style, size = 20 }) => (
  <hr style={{
    width: '100%',
    border: 'none',
    borderBottom: '1px lightgrey solid',
    margin: `${size}px 0`,
    ...style
  }}
  />
)

export default Divider;