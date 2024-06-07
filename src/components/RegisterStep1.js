import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import Icon from "./Icon";
import InfoBlock from "./InfoBlock";
import {useUserStore, getUserByPhoneNumber} from "../store/user-store2";
import cn from "classnames";
import {useEffect} from "react";
import MaskedInput from "./MaskedInput";

const RegisterStep1 = ({setStep}) => {
  const [setPhoneNumber] = useUserStore((state) => [state.setPhoneNumber]);
  const {register, handleSubmit, formState, setError, control} = useForm();

  return (
    <form className="container auth-step" onSubmit={handleSubmit((data) => {
      const clearPhone = data.phone.replace(/\D/g, "")
      if(clearPhone.length!== 11) {
        setError("phone", {message: "Неверный номер телефона"})
        return
      }
      getUserByPhoneNumber(clearPhone).then((result) => {
        if (result) {
          setError("phone", {message: "Пользователь с таким номером уже существует"})
        }
        else {
          setPhoneNumber(clearPhone)
          setStep(2)
        }
      })

    })}>
      <Link className="auth__back" to="/">
        <Icon name="angle-left"/>
      </Link>
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
export default RegisterStep1