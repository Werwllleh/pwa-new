import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";

import Icon from "../Icon";
import InfoBlock from "../InfoBlock";
import MaskedInput from "../MaskedInput";
import {useUserStore} from "../../store/user-store";

const ScreenPhone = ({mode, toPrevStep, toNextStep}) => {
  const [setPhone, sendPhoneNumber] = useUserStore((state) => [state.setPhone, state.sendPhoneNumber])
  const {register, handleSubmit, formState, setError} = useForm();

  const onSubmit = (phone) => {
    const clearPhone = phone.replace(/\D/g, "")
    if(clearPhone.length!== 11) {
      setError("phone", {message: "Неверный номер телефона"})
      return
    }
    setPhone(clearPhone)
    if(mode==='verifyStart') {
      sendPhoneNumber(clearPhone)
    }
    toNextStep()
  }

  return (
    <form className="container auth-step" onSubmit={handleSubmit((data) => onSubmit(data.phone))}>
      <button className="auth__back" onClick={toPrevStep}>
        <Icon name="angle-left"/>
      </button>
      <div className="content-block">
        <div className="auth__title">
          <h1 className="h1">Введите номер телефона</h1>
        </div>
        <fieldset className="fieldset">
          <MaskedInput
            labelText="Номер телефона"
            mask="+7 (000) 000-00-00"
            error={formState.errors.phone?.message}
            {...register("phone", {required: "Введите телефон"})}
          />
        </fieldset>
        <InfoBlock/>
      </div>
      <div className="bottom-block">
        <button className="button" type="submit" disabled={formState.isSubmitting}>Продолжить</button>
      </div>
    </form>
  )
}
export default ScreenPhone