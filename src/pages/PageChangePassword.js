import Icon from "../components/Icon";
import {Link} from "react-router-dom";

const PageChangePassword = () =>{
  return(
    <>
      <form className="container auth-step auth-phone-form active" data-step="1">
        <Link className="auth__back" to="javascript: void(0);">
          <Icon name="angle-left"/>
        </Link>
        <div className="content-block">
          <div className="auth__title">
            <h1 className="h1">Введите номер телефона</h1>
          </div>
          <fieldset className="fieldset">
            <field className="field">
              <div className="input-text">
                <div className="input-text__placeholder">Номер телефона</div>
                <input className="input-text__input mask-phone validate-field" type="text" name="phone"
                       inputMode="numeric"/>
              </div>
              <div className="field__error"></div>
            </field>
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
      <form className="container auth-step" data-step="2">
        <Link className="auth__back js-goto-step" to="javascript: void(0);" data-step="1">
          <Icon name="angle-left"/>
        </Link>
        <div className="content-block">
          <div className="auth__title">
            <h1 className="h1">Вам поступит звонок</h1>
            <p className="text">Введите последние 4 цифры входящего номера</p>
          </div>
          <fieldset className="fieldset">
            <field className="field field_center">
              <div className="input-code">
                <input className="input-code__number validate-field" type="text" inputMode="numeric" name="numCode1"
                       data-index="1" maxLength="1" autoComplete="off"/>
                <input className="input-code__number validate-field" type="text" inputMode="numeric" name="numCode2"
                       data-index="2" maxLength="1" autoComplete="off"/>
                <input className="input-code__number validate-field" type="text" inputMode="numeric" name="numCode3"
                       data-index="3" maxLength="1" autoComplete="off"/>
                <input className="input-code__number validate-field" type="text" inputMode="numeric" name="numCode4"
                       data-index="4" maxLength="1" autoComplete="off"/>
              </div>
              <div className="field__error"></div>
            </field>
          </fieldset>
        </div>
        <div className="bottom-block">
          <div className="bottom-block__details">Ваш номер: <span>+7 (927) 992-46-29</span></div>
          <button className="button js-send-code" data-timer="sms">Позвонить повторно</button>
        </div>
      </form>
      <form className="container auth-step" data-step="3" data-pass-step="1">
        <Link className="auth__back js-goto-step" to="javascript: void(0);" data-step="2">
          <Icon name="angle-left"/>
        </Link>
        <div className="content-block">
          <div className="auth__title auth__title_password">
            <h1 className="h1">Придумайте 4-значный пароль на вход</h1>
          </div>
          <fieldset className="fieldset">
            <field className="field field_center">
              <div className="input-password">
                <input className="input-password__input" type="text" name="password" maxLength="4"/>
                <div className="input-password__number"></div>
                <div className="input-password__number"></div>
                <div className="input-password__number"></div>
                <div className="input-password__number"></div>
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
                <div className="number-panel__button number-panel__button_empty"></div>
                <button className="number-panel__button" data-val="0">0</button>
                <button className="number-panel__backspace" disabled>
                  <Icon name="backspace"/>
                </button>
              </div>
            </field>
          </fieldset>
        </div>
      </form>
      <form className="container auth-step" data-step="4" data-pass-step="2">
        <Link className="auth__back js-goto-step" to="javascript: void(0);" data-step="3">
          <Icon name="angle-left"/>
        </Link>
        <div className="content-block">
          <div className="auth__title auth__title_password">
            <h1 className="h1">Повторите пароль<br/></h1>
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
                <div className="number-panel__button number-panel__button_empty"></div>
                <button className="number-panel__button" data-val="0">0</button>
                <button className="number-panel__backspace" disabled>
                  <Icon name="backspace"/>
                </button>
              </div>
            </field>
          </fieldset>
        </div>
      </form>
    </>
  )
}

export default PageChangePassword