import Icon from "./Icon";

const Alert = () => {
  return (
    <div className="alert" id="requestSuccess">
      <div className="alert__icon">
        <Icon name="circle-tick"/>
      </div>
      <div className="alert__text">Заявка отправлена</div>
    </div>
  )
}
export default Alert