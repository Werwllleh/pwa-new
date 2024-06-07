import {Link} from "react-router-dom";
import Icon from "./Icon";
import {useForm} from "react-hook-form";
import cn from "classnames";
import {useUserStore} from "../store/user-store2";
import Input from "./Input";
import MaskedInput from "./MaskedInput";

const RegisterStep3 = ({setStep}) => {
  const [setData] = useUserStore((state) => [state.setData])
  const {register, formState, handleSubmit} = useForm()
  return (
    <form className="container auth-step" onSubmit={handleSubmit((data) => {
      setData(data)
      setStep(4)
    })}>
      <button className="auth__back" onClick={() => setStep(2)}>
        <Icon name="angle-left"/>
      </button>
      <div className="content-block">
        <div className="auth__title">
          <h1 className="h1">Ваши контактные данные</h1>
        </div>
        <fieldset className="fieldset">
          <Input
            placeholder="Фамилия"
            error={formState.errors.lastName?.message}
            {...register("lastName", {required: 'Введите фамилию', minLength: {value: 2, message: 'Минимум 2 символа'}})}
          />
          <Input
            placeholder="Имя"
            error={formState.errors.firstName?.message}
            {...register("firstName", {required: 'Введите имя', minLength: {value: 2, message: 'Минимум 2 символа'}})}
          />
          <Input
            placeholder="Отчество"
            error={formState.errors.secondName?.message}
            {...register("secondName", {required: 'Введите отчество', minLength: {value: 2, message: 'Минимум 2 символа'}})}
          />
          <MaskedInput
            labelText="Дата рождения"
            mask={Date}
            error={formState.errors.birthDate?.message}
            {...register("birthDate", {required: "Введите дату рождения"})}
          />
          <Input
            placeholder="Город по прописке"
            error={formState.errors.city?.message}
            {...register("city", {required: 'Введите город'})}
          />
          <Input
            placeholder="E-mail"
            error={formState.errors.email?.message}
            {...register("email", {required: 'Введите E-mail'})}
          />
          <field className="field">
            <div className="checkbox agreement">
              <input
                className="checkbox__input"
                type="checkbox"
                id="agreement"
                name="agreement"
                {...register("agreement", {required: 'Для продолжения необходимо ваше согласие'})}
              />
              <div className="checkbox__check">
                <Icon name="check"/>
              </div>
              <label className="checkbox__label" htmlFor="agreement">Даю согласие на обработку персональных данных,
                определенных в <Link className="link" to="#">Согласии на обработку персональных данных</Link></label>
              <div className="field__error">{formState.errors.agreement?.message}</div>
            </div>
          </field>
        </fieldset>
      </div>
      <div className="bottom-block">
        <button className="button" type="submit" disabled={formState.isSubmitting}>Продолжить</button>
      </div>
    </form>
  )
}
export default RegisterStep3