const PinButton = ({value, handleClick}) => {
  return (
    <button
      type="button"
      className="number-panel__button"
      onClick={() => handleClick(value)}
    >
      {value}
    </button>
  )
}
export default PinButton