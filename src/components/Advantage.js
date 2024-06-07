import Icon from "./Icon";
import cn from 'classnames'

const Advantage = ({icon, title, text}) => {
  return (
    <li className={cn('advantage', {'sm-loading': !(icon && title)})}>
      <div className="advantage__icon sm-item-primary">
        <Icon name={icon} />
      </div>
      <div className="advantage__info">
        <div className="advantage__name sm-item-secondary">{title}</div>
        <div className="advantage__description sm-item-secondary">{text}</div>
      </div>
    </li>
  )
}
export default Advantage