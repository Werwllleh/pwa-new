import {useEffect, useState} from "react";
import Icon from "../Icon";
import {useUserStore} from "../../store/user-store";

const ModalSettingsPassword = ({code, onClose}) => {

  const updateCode = useUserStore((state) => state.setCode);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0];

  const [error, setError] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [inputField, setInputField] = useState('');

  const [newPass, setNewPass] = useState('');

  const goNext = () => {
    setCurrentStep(prevState => prevState + 1)
  }

  const writeCode = (e) => {
    e.preventDefault();
    if (inputField.length < 4) {
      setInputField(inputField + e.currentTarget.value)
    }
    if (inputField.length === 4 && error) {
      setInputField(e.currentTarget.value)
      setError(false)
    }
  }

  const clearCode = (e) => {
    e.preventDefault();
    setInputField(inputField.slice(0, -1))
    setError(false)
  }

  const closePasswordModal = () => {
    onClose();
    setInputField('');
    setNewPass('');
    setError(false);
    setCurrentStep(1);
  }

  useEffect(() => {
    if (inputField.length === 4 && currentStep === 1) {
      if (inputField === code) {
        goNext();
        setInputField('')
        setError(false)
      } else {
        setError(true)
      }
    }
    if (inputField.length === 4 && currentStep === 2) {
      goNext();
      setNewPass(inputField);
      setInputField('')
    }
    if (inputField.length === 4 && currentStep === 3) {
      if (inputField === newPass) {
        updateCode(newPass);
        closePasswordModal();
      } else {
        setError(true)
      }
    }

  }, [inputField]);

  return (
    /*<div className="modal modal_type-2 modal-settings modal-settings-password" data-popup="settingsPassword">
      <div className="modal__inner">
        <div className="modal__wrap modal__wrap_d-f">
          <div className="modal__header">
            <div className="modal__name">Изменить пароль</div>
            <div className="modal__close modal-close">
              <svg>
                <use xlinkHref="./images/sprites.svg#close"></use>
              </svg>
            </div>
          </div>
          <div className="modal__content modal-setting">
            <form className="modal-setting-step active modal-setting-phone-form" data-step="1" data-pass-step="0">
              <div className="content-block">
                <div className="modal-setting__title modal-setting__title_password">
                  <h2 className="h2 ta_c">Введите старый пароль<br/></h2>
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
                      <button className="number-panel__button number-panel__button_empty"></button>
                      <button className="number-panel__button" data-val="0">0</button>
                      <button className="number-panel__backspace" disabled>
                        <svg>
                          <use xlinkHref="./images/sprites.svg#backspace"></use>
                        </svg>
                      </button>
                    </div>
                  </field>
                </fieldset>
              </div>
            </form>
            <form className="modal-setting-step modal-setting-phone-form" data-step="2" data-pass-step="1">
              <div className="content-block">
                <div className="modal-setting__title modal-setting__title_password">
                  <h2 className="h2 ta_c">Новый пароль<br/></h2>
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
                      <button className="number-panel__button number-panel__button_empty"></button>
                      <button className="number-panel__button" data-val="0">0</button>
                      <button className="number-panel__backspace" disabled>
                        <svg>
                          <use xlinkHref="./images/sprites.svg#backspace"></use>
                        </svg>
                      </button>
                    </div>
                  </field>
                </fieldset>
              </div>
            </form>
            <form className="modal-setting-step" data-step="3" data-pass-step="2">
              <div className="content-block">
                <div className="modal-setting__title modal-setting__title_password">
                  <h2 className="h2 ta_c">Повторите новый пароль<br/></h2>
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
                      <button className="number-panel__button number-panel__button_empty"></button>
                      <button className="number-panel__button" data-val="0">0</button>
                      <button className="number-panel__backspace" disabled>
                        <svg>
                          <use xlinkHref="./images/sprites.svg#backspace"></use>
                        </svg>
                      </button>
                    </div>
                  </field>
                </fieldset>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>*/
    <>
      <div className="modal__header">
        <div className="modal__name">Изменить пароль</div>
        <div onClick={closePasswordModal} className="modal__close modal-close">
          <Icon name="close"/>
        </div>
      </div>
      <div className="modal__content modal-setting">
        <form className="modal-setting-step active modal-setting-phone-form" data-step="1" data-pass-step="0">
          <div className="content-block">
            <div className="modal-setting__title modal-setting__title_password">
              <h2 className="h2 ta_c">{currentStep === 1
                ? 'Введите старый пароль'
                : currentStep === 2
                  ? 'Новый пароль'
                  : 'Повторите новый пароль'}<br/></h2>
            </div>
            <fieldset className="fieldset">
              <field className="field field_center">
                <div className={`input-password ${error && 'error'}`}>
                  <input className="input-password__input" type="text" name="password"/>
                  {Array.from({length: 4}, (_, index) => (
                    <div key={index}
                         className={`input-password__number ${index < inputField.length && 'active'}`}></div>
                  ))}
                  {error && <div className="field__error">Неправильный пароль</div>}
                </div>
                <div className="number-panel">
                  {numbers.map((number, index) => {
                    return number !== '' ? <button key={index} onClick={writeCode} value={number}
                                                   className="number-panel__button">{number}</button> :
                      <div className="number-panel__button number-panel__button_empty"></div>
                  })}
                  <button onClick={clearCode} className="number-panel__backspace" disabled={!inputField.length}>
                    <Icon name="backspace"/>
                  </button>
                </div>
              </field>
            </fieldset>
          </div>
        </form>
        {/*<form className="modal-setting-step modal-setting-phone-form" data-step="2" data-pass-step="1">
        <div className="content-block">
          <div className="modal-setting__title modal-setting__title_password">
            <h2 className="h2 ta_c">Новый пароль<br/></h2>
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
                <button className="number-panel__button number-panel__button_empty"></button>
                <button className="number-panel__button" data-val="0">0</button>
                <button className="number-panel__backspace" disabled>
                  <svg>
                    <use xlinkHref="./images/sprites.svg#backspace"></use>
                  </svg>
                </button>
              </div>
            </field>
          </fieldset>
        </div>
      </form>
      <form className="modal-setting-step" data-step="3" data-pass-step="2">
        <div className="content-block">
          <div className="modal-setting__title modal-setting__title_password">
            <h2 className="h2 ta_c">Повторите новый пароль<br/></h2>
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
                <button className="number-panel__button number-panel__button_empty"></button>
                <button className="number-panel__button" data-val="0">0</button>
                <button className="number-panel__backspace" disabled>
                  <svg>
                    <use xlinkHref="./images/sprites.svg#backspace"></use>
                  </svg>
                </button>
              </div>
            </field>
          </fieldset>
        </div>
      </form>*/}
      </div>
    </>
  )
}
export default ModalSettingsPassword
