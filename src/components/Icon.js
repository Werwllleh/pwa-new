import spriteHref from "@assets/images/sprites.svg"
const Icon = ({name,...props}) => {
  return (
    <svg {...props}>
      <use href={`${spriteHref}#${name}`} />
    </svg>
  )
}
export default Icon