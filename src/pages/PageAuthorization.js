import LayoutAuth from "../components/layouts/LayoutAuth";
import Icon from "../components/Icon";
import Input from "../components/Input";
import {Link} from "react-router-dom";

const PageAuthorization = () => {


  return (
    <LayoutAuth>
      <form className="container auth-step auth-phone-form active" data-step="1">
        <Link className="auth__back" to="/">
          <Icon name="angle-left"/>
        </Link>
        <div className="content-block">
          <div className="auth__title">
            <h1 className="h1">Введите номер телефона</h1>
          </div>
          <fieldset className="fieldset">
            {/*<field className="field">
              <div className={`input-text`}>
                <div className="input-text__placeholder">Номер телефона</div>
                <input className="input-text__input mask-phone validate-field" type="text" name="phone"
                       inputMode="numeric"/>
              </div>
              <div className="field__error"></div>
            </field>*/}
            <Input inputName="fg" inputMode = 'text' isRequired labelText="Номер телефона" onChange/>
          </fieldset>
          <div className="info-block">
            <div className="info-block__title">Будет доступно после авторизации</div>
            <ul className="info-block__list">
              <li className="info-block__item">
                <Icon name="auth-sale" className="info-block__icon"/>
                <span className="info-block__text">Скидка на диагностику</span>
              </li>
              <li className="info-block__item">
                <Icon name="auth-call" className="info-block__icon"/>
                <span className="info-block__text">Бесплатные звонки</span>
              </li>
              <li className="info-block__item">
                <Icon name="auth-chat-bot" className="info-block__icon"/>
                <span className="info-block__text">Бесплатные консультации в чате</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="bottom-block">
          <button className="button js-next-step js-send-code" data-step="2">Продолжить</button>
        </div>
      </form>
      <form className="container auth-step auth-phone-form" data-step="2" data-pass-step="0">
        <Link className="auth__back js-goto-step" to="javascript: void(0);" data-step="1">
          <Icon name="angle-left"/>
        </Link>
        <div className="content-block">
          <div className="auth__title auth__title_password">
            <h1 className="h1">Введите пароль<br/></h1>
          </div>
          <fieldset className="fieldset">
            <field className="field field_center">
              <div className="input-password">
                <input className="input-password__input" type="text" name="password"/>
                <div className="input-password__number"></div>
                <div className="input-password__number"></div>
                <div className="input-password__number"></div>
                <div className="input-password__number"></div>
                <div className="field__error"></div>
              </div>
              <div className="number-panel">
                <button className="number-panel__button" data-val="1">1</button>
                <button className="number-panel__button" data-val="2">2</button>
                <button className="number-panel__button" data-val="3">3</button>
                <button className="number-panel__button" data-val="4">4</button>
                <button className="number-panel__button" data-val="5">5</button>
                <button className="number-panel__button" data-val="6">6</button>
                <button className="number-panel__button" data-val="7">7</button>
                <button className="number-panel__button" data-val="8">8</button>
                <button className="number-panel__button" data-val="9">9</button>
                <button className="number-panel__forgot-password" data-popup="forgotPassword">Забыли пароль?</button>
                <button className="number-panel__button" data-val="0">0</button>
                <button className="number-panel__backspace" disabled>
                  <Icon name="backspace"/>
                </button>
              </div>
            </field>
          </fieldset>
        </div>
      </form>
    </LayoutAuth>
  );
}

export default PageAuthorization;