const Icon = ({ icon, size, maxSize, color, style, onClick, ...props }) => icon({
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: size,
    width: size,
    maxHeight: maxSize,
    maxWidth: maxSize,
    cursor: onClick ? 'pointer' : undefined,
    color,
    ...style,
  },
  onClick,
  ...props
})

Icon.defaultProps = {
  size: 48
}

export default Icon;