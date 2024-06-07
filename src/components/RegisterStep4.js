import {Link, useNavigate} from "react-router-dom";
import Icon from "./Icon";
import PinButton from "./PinButton";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import cn from "classnames";
import {useUserStore} from "../store/user-store2";

const RegisterStep4 = ({setStep}) => {
  const [setCode, register] = useUserStore((state) => [state.setCode, state.register])
  const navigate = useNavigate();
  const [pinStep, setPinStep] = useState(1)
  const [pin, setPin] = useState('')
  const [pinArray, setPinArray] = useState([])
  const [showError, setShowError] = useState(false)

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
      content.push(<div className={cn('input-password__number', {'active': pinArray.length >= i})} key={i}></div>);
    }
    return content;
  }

  const addDigit = (digit) => {
    if (pinArray.length < 4) {
      setShowError(false)
      setPinArray([...pinArray, digit])
    }
  }
  const removeDigit = () => {
    const newPinArray = [...pinArray]
    newPinArray.pop()
    setPinArray(newPinArray)
  }

  useEffect(() => {
    if (pinArray.length === 4) {
      if (pinStep === 1) {
        setPin(pinArray.join(''))
        setPinArray([])
        setPinStep(2)
      }
      if (pinStep === 2) {
        if (pinArray.join('') !== pin) {
          setShowError(true)
        } else {
          setShowError(false)
          setCode(pin)
          register().then(() => {
            navigate('/index-auth')
          })
        }
      }
    } else {
      setShowError(false)
    }
  }, [pinArray])

  return (
    <form className="container auth-step">
      <button className="auth__back" onClick={() => {
        if (pinStep === 1) {
          setStep(3)
        } else {
          setPinStep(1)
        }
      }}>
        <Icon name="angle-left"/>
      </button>
      <div className="content-block">
        <div className="auth__title auth__title_password">
          <h1 className="h1">
            {pinStep === 1 && (<>Придумайте 4-значный пароль на вход</>)}
            {pinStep === 2 && (<>Повторите пароль</>)}
          </h1>
        </div>
        <fieldset className="fieldset">
          <field className="field">
            <div className="input-password">
              <input className="input-password__input" type="text" value={[...pinArray].join('')} readOnly/>
              {getPinDots()}
              {showError && (<div className="field__error">Неправильный пароль</div>)}
            </div>
            <div className="number-panel">
              {getPinButtons()}
              <button className="number-panel__button number-panel__button_empty"></button>
              <PinButton value="0" handleClick={addDigit}/>
              <button
                type="button"
                className="number-panel__backspace"
                disabled={pinArray.length === 0}
                onClick={removeDigit}
              >
                <Icon name="backspace"/>
              </button>
            </div>
          </field>
        </fieldset>
      </div>
    </form>
  )
}
export default RegisterStep4