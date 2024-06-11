import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import cn from "classnames";

import Icon from "../Icon";
import {useUserStore} from "../../store/user-store";


const RECALL_DELAY = 60

const CodeInput = ({position, currentRef, nextRef, onChange})  =>  {
  const [prev, setPrev]  =  useState('')
  return (
    <input
      className="input-code__number"
      type="text"
      inputMode="numeric"
      name="numCode1"
      maxLength="1"
      autoComplete="off"
      autoFocus={position === 0}
      onChange={(e) => {
        let value = parseInt(e.target.value.trim())
        if (!isNaN(value)) {
          if(nextRef) nextRef.current.focus()
        } else {
          value = ''
          e.target.value = ''
        }
        onChange(value, position)
      }}
      onFocus={(e) => {
        setPrev(e.target.value)
        e.target.value = ''
      }}
      onBlur={(e)  =>  {
        if (e.target.value === '') {
          e.target.value = prev
        }
      }}
      ref={currentRef}
    />
  )
}

const ScreenCode = ({toPrevStep, toNextStep}) => {
  const [phone, sendPhoneNumber, verifyPhoneNumber] = useUserStore((state) => [state.phone, state.sendPhoneNumber, state.verifyPhoneNumber])
  const {register, formState, setError, clearErrors} = useForm()
  const [timer, setTimer] = useState(RECALL_DELAY)
  const [code, setCode] = useState('')

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(timer - 1)
    }, 1000)
    if (timer === 0) {
      clearInterval(countdown)
    }
    return () => clearInterval(countdown);
  })
  const updateCode = (digit, position) => {
    const newCode = code.split('')
    newCode[position] = digit
    setCode(newCode.join(''))
  }

  const fieldRef1 = useRef(null)
  const fieldRef2 = useRef(null)
  const fieldRef3 = useRef(null)
  const fieldRef4 = useRef(null)

  useEffect(() => {
    if(code.length === 4) {
      verifyPhoneNumber(phone, code).then((res)  =>  {
        if(res) {
          toNextStep()
        }
        else {
          setError('code', {message: 'Неправильный код'})
          clearFields()
        }
      })
    }
  }, [code])

  const clearFields = () => {
    setCode('')
    fieldRef1.current.value = ''
    fieldRef2.current.value = ''
    fieldRef3.current.value = ''
    fieldRef4.current.value = ''
    fieldRef1.current.focus()
  }

  const recall = () => {
    //onRecall(phone)
    setTimer(RECALL_DELAY)
    clearFields()
    clearErrors()
  }
  const onFieldChange = (value, position) => {

    clearErrors()
    updateCode(value, position)
  }

  return (
    <form className="container auth-step">
      <button className="auth__back" onClick={toPrevStep}>
        <Icon name="angle-left"/>
      </button>
      <div className="content-block">
        <div className="auth__title">
          <h1 className="h1">Вам поступит звонок</h1>
          <p className="text">Введите последние 4 цифры входящего номера</p>
        </div>
        <fieldset className="fieldset">
          <input type="hidden" {...register("code")}/>
          <div className="field field_center">
            <div className={cn('input-code', {'error': formState.errors.code})}>
              <CodeInput position={0} currentRef={fieldRef1} nextRef={fieldRef2} onChange={onFieldChange}/>
              <CodeInput position={1} currentRef={fieldRef2} nextRef={fieldRef3} onChange={onFieldChange}/>
              <CodeInput position={2} currentRef={fieldRef3} nextRef={fieldRef4} onChange={onFieldChange}/>
              <CodeInput position={3} currentRef={fieldRef4} onChange={onFieldChange}/>
            </div>
            <div className="field__error">{formState.errors.code?.message}</div>
          </div>
        </fieldset>
      </div>
      <div className="bottom-block">
        <div className="bottom-block__details">Ваш номер: <span>{phone}</span></div>
        <button className="button" type="button" disabled={timer > 0} onClick={()=>sendPhoneNumber(phone)}>
          {timer === 0 && <>Позвонить повторно</>}
          {timer > 0 && <>Повторный звонок через&nbsp;<span className="code-timer">{timer}</span>&nbsp;сек.</>}
        </button>
      </div>
    </form>
  )
}
export default ScreenCode