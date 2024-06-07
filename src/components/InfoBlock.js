import Icon from "./Icon";

const InfoBlock = () => {
  return (
    <div className="info-block">
      <div className="info-block__title">Будет доступно после авторизации</div>
      <ul className="info-block__list">
        <li className="info-block__item">
          <Icon name="auth-sale"/>
          <span className="info-block__text">Скидка на диагностику</span>
        </li>
        <li className="info-block__item">
          <Icon name="auth-call"/>
          <span className="info-block__text">Бесплатные звонки</span>
        </li>
        <li className="info-block__item">
          <Icon name="auth-chat-bot"/>
          <span className="info-block__text">Бесплатные консультации в чате</span>
        </li>
      </ul>
    </div>
  )
}
export default InfoBlock