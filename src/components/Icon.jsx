const Icon = ({ icon, size = 48, maxSize, color, style, onClick, ...props }) => icon({
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

export default Icon;