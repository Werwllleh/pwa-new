import {Link} from "react-router-dom";
import Icon from "./Icon";
import {getAuthCode, useUserStore} from "../store/user-store2";
import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import cn from "classnames";

const RECALL_DELAY = 60
const RegisterStep2 = ({setStep}) => {
  const [phoneNumber] = useUserStore((state) => [state.phoneNumber])

  const [timer, setTimer] = useState(RECALL_DELAY)
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(timer - 1)
    }, 1000)
    if (timer === 0) {
      clearInterval(countdown)
    }
    return () => clearInterval(countdown);
  })

  const [authCode, setAuthCode] = useState(false)
  useEffect(() => {
    getAuthCode().then((res) => {
      setAuthCode(res.code)
    })
  }, [])

  const [code, setCode] = useState(Array(4).fill(''))
  const updateCode = (digit, position) => {
    const newCode = [...code]
    newCode[position] = digit
    setCode(newCode)
  }

  const fieldRef1 = useRef(null)
  const fieldRef2 = useRef(null)
  const fieldRef3 = useRef(null)
  const fieldRef4 = useRef(null)

  const {register, formState, setError, clearErrors} = useForm()

  useEffect(() => {
    if(code.join('').length === 4) {
      if(code.join('') !== authCode){
        setError('code', {message: 'Неправильный код'})
      }
      else {
        clearErrors('code')
        setStep(3)
      }
    }
  }, [code, authCode])

  return (
    <form className="container auth-step">
      <button className="auth__back" onClick={() => setStep(1)}>
        <Icon name="angle-left"/>
      </button>
      <div className="content-block">
        <div className="auth__title">
          <h1 className="h1">Вам поступит звонок</h1>
          <p className="text">Введите последние 4 цифры входящего номера</p>
        </div>
        <fieldset className="fieldset">
          <input type="hidden" {...register("code")}/>
          <field className="field field_center">
            <div className={cn('input-code', {'error': formState.errors.code})}>
              <input
                className="input-code__number"
                type="text"
                inputMode="numeric"
                name="numCode1"
                maxLength="1"
                autoComplete="off"
                autoFocus
                onChange={(e) => {
                  if (e.target.value.trim().length > 0) {
                    updateCode(e.target.value, 0)
                    fieldRef2.current.focus()
                  }
                }}
                onFocus={(e) => e.target.value = ''}
                ref={fieldRef1}
              />
              <input
                className="input-code__number"
                type="text"
                inputMode="numeric"
                name="numCode2"
                maxLength="1"
                autoComplete="off"
                onChange={(e) => {
                  if (e.target.value.trim().length > 0) {
                    updateCode(e.target.value, 1)
                    fieldRef3.current.focus()
                  }
                }}
                onFocus={(e) => e.target.value = ''}
                ref={fieldRef2}
              />
              <input
                className="input-code__number"
                type="text"
                inputMode="numeric"
                name="numCode3"
                maxLength="1"
                autoComplete="off"
                onChange={(e) => {
                  if (e.target.value.trim().length > 0) {
                    updateCode(e.target.value, 3)
                    fieldRef4.current.focus()
                  }
                }}
                onFocus={(e) => e.target.value = ''}
                ref={fieldRef3}
              />
              <input
                className="input-code__number"
                type="text"
                inputMode="numeric"
                name="numCode4"
                maxLength="1"
                autoComplete="off"
                onChange={(e) => {
                  if (e.target.value.trim().length > 0) {
                    updateCode(e.target.value, 4)
                  }
                }}
                onFocus={(e) => e.target.value = ''}
                ref={fieldRef4}
              />
            </div>
            <div className="field__error">{formState.errors.code?.message}</div>
          </field>
        </fieldset>
      </div>
      <div className="bottom-block">
        <div className="bottom-block__details">Ваш номер: <span>{phoneNumber}</span></div>
        <button className="button" type="button" disabled={timer > 0} onClick={() => setTimer(RECALL_DELAY)}>
          {timer === 0 && <>Позвонить повторно</>}
          {timer > 0 && <>Повторный звонок через&nbsp;<span className="code-timer">{timer}</span>&nbsp;сек.</>}
        </button>
      </div>
    </form>
  )
}
export default RegisterStep2