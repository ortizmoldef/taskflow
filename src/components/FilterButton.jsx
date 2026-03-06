import { btnBase, btnActive, btnInactive } from "../constants/styles"

function FilterButton({ label, isActive, onClick, style = {} }) {
  return (
    <button
      className={`${btnBase} ${isActive ? btnActive : btnInactive}`}
      onClick={onClick}
      style={style}
    >
      {label}
    </button>
  )
}

export default FilterButton