import {useEffect, useState} from "react";
import cn from "classnames";
import {useUserStore} from "../../store/user-store";
import Icon from "../Icon";
import PinButton from "../PinButton";
import ModalForgotPassword from "../modals/ModalForgotPassword";

//mode create|repeat|enter
const ScreenPin = ({mode, toPrevStep, toNextStep}) => {
  const [, code, setCode, confirmCode, setIsAuthenticated] = useUserStore((state) => [state.phone, state.pin, state.setPin, state.confirmPin, state.setIsAuthenticated])
  const [pin, setPin] = useState('')
  const [showError, setShowError] = useState(false)
  const [showModal, setShowModal]  = useState(false);

  const getPinButtons = () => {
    let content = [];
    for (let i = 1; i < 10; i++) {
      content.push(<PinButton value={i} handleClick={addDigit} key={i}/>);
    }
    return content;
  }

  const getPinDots = () => {
    let content = [];
    for (let i = 1; i < 5; i++) {
      content.push(<div className={cn('input-password__number', {'active': pin.length >= i})} key={i}></div>);
    }
    return content;
  }

  const addDigit = (digit) => {
    if (pin.length < 4) {
      setPin(pin + digit)
    }
  }

  const removeDigit = () => {
    setPin(pin.slice(0, -1))
    setShowError(false)
  }

  useEffect(() => {
    setPin('')
  }, [mode])

  useEffect(() => {
      if (pin.length === 4) {
        setShowError(false)
        if (mode === 'create') {
          setCode(pin)
          toNextStep()
        }
        if (mode === 'repeat') {
          if (pin === code) {
            confirmCode(code)
            setIsAuthenticated(true)
            toNextStep()
          } else {
            setShowError(true)
          }
        }
        if (mode === 'enter') {
          if (pin === code) {
            setIsAuthenticated(true)
            toNextStep()
          } else {
            setShowError(true)
          }
        }
      }
    }, [pin]
  )

  return (
    <>
      <form className="container auth-step">
        <button className="auth__back" onClick={() => {
          if (mode === 'create') {
            setCode('')
          }
          toPrevStep()
        }}>
          <Icon name="angle-left"/>
        </button>
        <div className="content-block">
          <div className="auth__title auth__title_password">
            <h1 className="h1">
              {mode === 'create' && (<>Придумайте 4-значный пароль на вход</>)}
              {mode === 'repeat' && (<>Повторите пароль</>)}
              {mode === 'enter' && (<>Введите пароль</>)}
            </h1>
          </div>
          <fieldset className="fieldset">
            <div className="field">
              <div className="input-password">
                {getPinDots()}
                {showError && (
                  <div className="field__error">
                    {mode === 'repeat' && (<>Пароли не совпадают</>)}
                    {mode === 'enter' && (<>Неправильный пароль</>)}
                  </div>
                )}
              </div>
              <div className="number-panel">
                {getPinButtons()}
                {mode !== 'enter' && (
                  <button className="number-panel__button number-panel__button_empty"></button>
                )}
                {mode === 'enter' && (
                  <button type="button" className="number-panel__forgot-password" onClick={()=>setShowModal(true)}>Забыли пароль?</button>
                )}
                <PinButton value="0" handleClick={addDigit}/>
                <button
                  type="button"
                  className="number-panel__backspace"
                  disabled={pin.length === 0}
                  onClick={removeDigit}
                >
                  <Icon name="backspace"/>
                </button>
              </div>
            </div>
          </fieldset>
        </div>
      </form>
      <ModalForgotPassword showModal={showModal} setShowModal={setShowModal}/>
    </>
  )
}
export default ScreenPin