import Icon from "../Icon";
import {useEffect, useRef, useState} from "react";
import MaskedInput from "../MaskedInput";
import {useUserStore} from "../../store/user-store";
import {useForm} from "react-hook-form";

const ModalSettingsPhone = ({code, onClose}) => {

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0];

  const [smsCode, setSmsCode] = useState(null);

  //const [setPhoneNumber] = useUserStore((state) => [state.setPhoneNumber]);
  const {register, handleSubmit, formState, setError, control, watch, resetField } = useForm();

  const phoneValue = watch("phone");
  const clearPhone = phoneValue?.replace(/\D/g, "")

  useEffect(() => {
    if (clearPhone?.length === 11) {
      setStepValue2(clearPhone)
    }
  }, [phoneValue]);


  const [errorStatus, setErrorStatus] = useState(false);
  const [currentStep, setCurrentStep] = useState(1)


  const [stepValue1, setStepValue1] = useState('');
  const [stepValue2, setStepValue2] = useState('');
  const [stepValue3, setStepValue3] = useState(['', '', '', '']);

  const goNext = () => {
    setCurrentStep(prevState => prevState + 1)
  }

  useEffect(() => {
    if (stepValue1.length === 4 && stepValue1 === code && !errorStatus) {
      goNext()
      setStepValue1('')
    }
  }, [stepValue1]);

  const writeCode = (e) => {
    e.preventDefault();
    if (stepValue1.length < 4) {
      setStepValue1(stepValue1 + e.currentTarget.value)
    }
    if (stepValue1.length === 4 && errorStatus) {
      setStepValue1(e.currentTarget.value)
      setErrorStatus(false)
    }
  }

  const clearCode = (e) => {
    e.preventDefault();
    setStepValue1(stepValue1.slice(0, -1))
    setErrorStatus(false)
  }

  useEffect(() => {
    if (stepValue1.length === 4 && stepValue1 !== code) {
      setErrorStatus(true)
    } else {
      setErrorStatus(false)
    }
  }, [stepValue1]);

  useEffect(() => {
    if (stepValue2.length !== 11 && errorStatus) {
      setErrorStatus(false)
    }
  }, [stepValue2]);

  const toStep3 = (e) => {
    e.preventDefault()
    if (stepValue2.length === 11) {
      setErrorStatus(false)
      // FIXME
      /*getUserByPhoneNumber(clearPhone).then((result) => {
        if (result) {
          setError("phone", {message: "Пользователь с таким номером уже существует"})
        }
        else {
          getAuthCode().then((res) => {
            if (res.code) {
              setSmsCode(res.code);
              goNext();
            }
          })
        }
      })*/
    } else {
      setErrorStatus(true)
      setError("phone", {message: "Неверный номер телефона"});
    }
  }

  const inputRefs = useRef([]);

  const handleInputChange = (e, index) => {
    const newStepValue3 = [...stepValue3];
    newStepValue3[index] = e.target.value;
    setStepValue3(newStepValue3);

    // Move to next input
    if (e.target.value && index < stepValue3.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (value.length > 1) {
      // Ensure only single character is in the input
      e.target.value = value[0];
    }
  };

  const clearCodeInputs = () => {
    setStepValue3(['', '', '', '']);
    inputRefs.current.forEach((input) => {
      input.value = '';
    });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && !e.target.value) {
      // Move to previous input
      inputRefs.current[index - 1].focus();
    }
  };

  const recall = (e) => {
    e.preventDefault();
    // FIXME
    /*getAuthCode().then((res) => {
      if (res.code) {
        setSmsCode(res.code);
      }
    })*/
  }

  useEffect(() => {
    if (stepValue3.join('').length === 4) {
      if (stepValue3.join('') === smsCode) {
        /*setPhoneNumber(clearPhone);*/
        closePhoneModal()
      } else {
        setErrorStatus(true)
      }
    }
  }, [stepValue3]);

  const closePhoneModal = () => {
    onClose();
    setCurrentStep(1);
    setStepValue1('');
    setStepValue2('');
    resetField("phone");
    setStepValue3([]);
    setErrorStatus(false);
    clearCodeInputs();
  }


  return (
    /*<div className="modal modal_type-2 modal-settings modal-settings-phone" data-popup="settingsPhone">
      <div className="modal__inner">
        <div className="modal__wrap modal__wrap_d-f">
          <div className="modal__header">
            <div className="modal__name">Изменить номер телефона</div>
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
                  <h2 className="h2 ta_c">Введите пароль<br/></h2>
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
            <form className="modal-setting-step modal-setting-phone-form" data-step="2">
              <div className="content-block">
                <div className="modal-setting__title">
                  <h1 className="h1">Новый номер телефона</h1>
                </div>
                <fieldset className="fieldset">
                  <field className="field">
                    <div className="input-text">
                      <div className="input-text__placeholder">Номер телефона</div>
                      <input className="input-text__input mask-phone validate-field" type="text" name="phone" inputMode="numeric" data-setting="phone"/>
                    </div>
                    <div className="field__error"></div>
                  </field>
                </fieldset>
              </div>
              <div className="bottom-block">
                <button className="button js-next-step js-send-code" data-step="3">Продолжить</button>
              </div>
            </form>
            <form className="modal-setting-step" data-step="3">
              <div className="content-block">
                <div className="modal-setting__title">
                  <h1 className="h1">Вам поступит звонок</h1>
                  <p className="text">Введите последние 4 цифры входящего номера</p>
                </div>
                <fieldset className="fieldset">
                  <field className="field field_center">
                    <div className="input-code">
                      <input className="input-code__number validate-field" type="text" inputMode="numeric" name="numCode1" data-index="1" maxLength="1" autoComplete="off"/>
                        <input className="input-code__number validate-field" type="text" inputMode="numeric" name="numCode2" data-index="2" maxLength="1" autoComplete="off"/>
                          <input className="input-code__number validate-field" type="text" inputMode="numeric" name="numCode3" data-index="3" maxLength="1" autoComplete="off"/>
                            <input className="input-code__number validate-field" type="text" inputMode="numeric" name="numCode4" data-index="4" maxLength="1" autoComplete="off"/>
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
          </div>
        </div>
      </div>
    </div>*/
    /*<div className="modal__inner">
      <div className="modal__wrap modal__wrap_d-f">
        <div className="modal__header">
          <div className="modal__name">Изменить номер телефона</div>
          <div onClick={closePhoneModal} className="modal__close modal-close">
            <Icon name="close" />
          </div>
        </div>
        <div className="modal__content modal-setting">
          <form name={'step1'}
                className={`modal-setting-step ${currentStep === 1 ? 'active' : ''} modal-setting-phone-form`}
                data-step="1" data-pass-step="0">
            <div className="content-block">
              <div className="modal-setting__title modal-setting__title_password">
                <h2 className="h2 ta_c">Введите пароль<br/></h2>
              </div>
              <fieldset className="fieldset">
                <field className="field field_center">
                  <div className={`input-password ${error && currentStep === 1 && 'error'}`}>
                    <input className="input-password__input" type="text" name="password"/>
                    {Array.from({length: 4}, (_, index) => (
                      <div key={index}
                           className={`input-password__number ${index < stepValue1.length && 'active'}`}></div>
                    ))}
                    {error && currentStep === 1 && <div className="field__error">Неправильный пароль</div>}
                  </div>
                  <div className="number-panel">
                    {numbers.map((number, index) => {
                      return number !== '' ? <button key={index} onClick={writeCode} value={number}
                                                     className="number-panel__button">{number}</button> :
                        <div className="number-panel__button number-panel__button_empty"></div>
                    })}
                    <button onClick={clearCode} className="number-panel__backspace" disabled={!stepValue1.length}>
                      <Icon name="backspace"/>
                    </button>
                  </div>
                </field>
              </fieldset>
            </div>
          </form>
          <form name={'step2'}
                className={`modal-setting-step ${currentStep === 2 ? 'active' : ''} modal-setting-phone-form`}
                data-step="2">
            <div className="content-block">
              <div className="modal-setting__title">
                <h1 className="h1">Новый номер телефона</h1>
              </div>
              <fieldset className="fieldset">
                <field className="field">
                  <div className={`input-text ${error && currentStep === 2 && 'error'}`}>
                    <div className="input-text__placeholder">Номер телефона</div>
                    <input value={stepValue2} onChange={writeNewPhone}
                           className="input-text__input mask-phone validate-field" type="text" name="phone"
                           inputMode="numeric" data-setting="phone"/>
                  </div>
                  {error && currentStep === 2 && <div className="field__error">Некорректный телефон</div>}
                </field>
              </fieldset>
            </div>
            <div className="bottom-block">
              <button onClick={toStep3} className="button js-next-step js-send-code" data-step="3">Продолжить</button>
            </div>
          </form>
          <form name={'step3'} className={`modal-setting-step ${currentStep === 3 ? 'active' : ''}`} data-step="3">
            <div className="content-block">
              <div className="modal-setting__title">
                <h1 className="h1">Вам поступит звонок</h1>
                <p className="text">Введите последние 4 цифры входящего номера</p>
              </div>
              <fieldset className="fieldset">
                <field className="field field_center">
                  <div className="input-code">
                    {Array.from({length: 4}, (_, index) => (
                      <input key={index}
                             ref={el => inputRefs.current[index] = el}
                             onChange={(e) => handleInputChange(e, index)}
                             onKeyDown={(e) => handleKeyDown(e, index)}
                             onInput={(e) => handleInput(e, index)}
                             className={`input-code__number validate-field`} type="text" inputMode="numeric"
                             name={`numCode${index}`}
                             data-index={index} maxLength="1" autoComplete="off"/>
                    ))}
                  </div>
                  <div className="field__error"></div>
                </field>
              </fieldset>
            </div>
            <div className="bottom-block">
              <div className="bottom-block__details">Ваш номер: <span>{stepValue2}</span></div>
              <button onClick={recall} className="button js-send-code" data-timer="sms">Позвонить повторно</button>
            </div>
          </form>
        </div>
      </div>
    </div>*/
    /*<div className="modal__inner">
      <div className="modal__wrap modal__wrap_d-f">
      </div>
    </div>*/
    <>
      <div className="modal__header">
        <div className="modal__name">Изменить номер телефона</div>
        <div onClick={closePhoneModal} className="modal__close modal-close">
          <Icon name="close"/>
        </div>
      </div>
      <div className="modal__content modal-setting">
        <form name={'step1'}
              className={`modal-setting-step ${currentStep === 1 ? 'active' : ''} modal-setting-phone-form`}
              data-step="1" data-pass-step="0">
          <div className="content-block">
            <div className="modal-setting__title modal-setting__title_password">
              <h2 className="h2 ta_c">Введите пароль<br/></h2>
            </div>
            <fieldset className="fieldset">
              <field className="field field_center">
                <div className={`input-password ${errorStatus && currentStep === 1 && 'error'}`}>
                  <input className="input-password__input" type="text" name="password"/>
                  {Array.from({length: 4}, (_, index) => (
                    <div key={index}
                         className={`input-password__number ${index < stepValue1.length && 'active'}`}></div>
                  ))}
                  {errorStatus && currentStep === 1 && <div className="field__error">Неправильный пароль</div>}
                </div>
                <div className="number-panel">
                  {numbers.map((number, index) => {
                    return number !== '' ? <button key={index} onClick={writeCode} value={number}
                                                   className="number-panel__button">{number}</button> :
                      <div className="number-panel__button number-panel__button_empty"></div>
                  })}
                  <button onClick={clearCode} className="number-panel__backspace" disabled={!stepValue1.length}>
                    <Icon name="backspace"/>
                  </button>
                </div>
              </field>
            </fieldset>
          </div>
        </form>
        <form name={'step2'}
              className={`modal-setting-step ${currentStep === 2 ? 'active' : ''} modal-setting-phone-form`}
              data-step="2">
          <div className="content-block">
            <div className="modal-setting__title">
              <h1 className="h1">Новый номер телефона</h1>
            </div>
            <fieldset className="fieldset">
              <MaskedInput
                labelText="Номер телефона"
                mask="+7 (000) 000-00-00"
                error={formState.errors.phone?.message}
                {...register("phone", {required: "Введите телефон"})}
              />
            </fieldset>
          </div>
          <div className="bottom-block">
            <button onClick={toStep3} className="button js-next-step js-send-code" data-step="3">Продолжить</button>
          </div>
        </form>
        <form name={'step3'} className={`modal-setting-step ${currentStep === 3 ? 'active' : ''}`} data-step="3">
          <div className="content-block">
            <div className="modal-setting__title">
              <h1 className="h1">Вам поступит звонок</h1>
              <p className="text">Введите последние 4 цифры входящего номера</p>
            </div>
            <fieldset className="fieldset">
              <field className="field field_center">
                <div className={`input-code ${errorStatus && currentStep === 3 ? 'error' : ''}`}>
                  {Array.from({ length: 4 }, (_, index) => (
                    <input
                      key={index}
                      value={stepValue3[index]}
                      ref={(el) => (inputRefs.current[index] = el)}
                      onChange={(e) => handleInputChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onInput={(e) => handleInput(e, index)}
                      className={`input-code__number validate-field`}
                      type="text"
                      inputMode="numeric"
                      name={`numCode${index}`}
                      data-index={index}
                      maxLength="1"
                      autoComplete="off"
                    />
                  ))}
                </div>
                <div className="field__error"></div>
              </field>
            </fieldset>
          </div>
          <div className="bottom-block">
            <div className="bottom-block__details">Ваш номер: <span>{stepValue2}</span></div>
            <button onClick={recall} className="button js-send-code" data-timer="sms">Позвонить повторно</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ModalSettingsPhone