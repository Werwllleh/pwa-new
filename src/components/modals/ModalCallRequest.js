import {useForm} from "react-hook-form";
import Icon from "../Icon";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Input from "../Input";
import MaskedInput from "../MaskedInput";
import {useUserStore} from "../../store/user-store";

const ModalCallRequest = ({active, onClose}) => {

  const [classVisible, setClassVisible] = useState('');
  const [classFade, setClassFade] = useState('');

  const [consent, setConsent] = useState(false);

  const user = useUserStore((state) => state);

  const {phoneNumber, firstName, secondName, lastName, birthDate, email, city, code} = user;

  useEffect(() => {
    if (active) {
      setClassVisible('modal_visible');
      setTimeout(() => {
        setClassFade('modal_fade');
      }, 1);
    } else {
      setClassFade('');
      setTimeout(() => {
        setClassVisible('');
      }, 300);
    }
  }, [active]);

  const {register, formState, handleSubmit, watch, resetField} = useForm({
    defaultValues: {
      firstName: firstName,
    }
  });

  return (
    <div className={`modal modal_type-3 modal-call-request ${classVisible} ${classFade}`} data-popup="callRequest">
      <div className="modal__inner">
        <div className="modal__wrap">
          <div onClick={onClose} className="modal__close modal-close">
            <Icon name="close"/>
          </div>
          <div className="modal__content">
            <h2 className="h2 mb_28">Заказать звонок</h2>
            <form onSubmit={handleSubmit((data) => {
              if (consent && watch('phone').replace(/\D/g, "").length === 11) {
                console.log(data)
                onClose();
                setConsent(false);
                resetField("phone", { keepTouched: true })
              }
            })} className="form-call-request">
              <fieldset className="fieldset">
                <Input
                  value={watch('firstName')}
                  placeholder="Имя"
                  error={formState.errors.firstName?.message}
                  {...register("firstName", {
                    required: 'Введите имя',
                    minLength: {value: 2, message: 'Минимум 2 символа'}
                  })}
                />
                <MaskedInput
                  value={watch('phone')}
                  labelText="Номер телефона"
                  mask="+7 (000) 000-00-00"
                  error={formState.errors.phone?.message}
                  {...register("phone", {required: "Введите телефон"})}
                />
                <field className="field">
                  <div className="checkbox agreement">
                    <input onChange={() => setConsent(!consent)} checked={consent} className="checkbox__input validate-field" type="checkbox" id="agreement" name="agreement"/>
                    <div className="checkbox__check">
                      <Icon name={'check'}/>
                    </div>
                    <label className="checkbox__label" htmlFor="agreement">
                      Даю согласие на обработку персональных данных, определенных в <Link className="link" to="#">Согласии
                      на обработку персональных данных</Link>
                    </label>
                    <div className="field__error"/>
                  </div>
                </field>
              </fieldset>
              <button disabled={!consent} className="button call-request-btn">Заказать звонок</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ModalCallRequest