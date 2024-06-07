import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import Input from "../Input";
import {useUserStore} from "../../store/user-store2";

const ModalSettingsEmail = ({email, onClose}) => {

  const [setData] = useUserStore((state) => [state.setData])

  const {register, formState, handleSubmit, watch} = useForm({
    defaultValues: {
      email: email,
    }
  });

  return (
    /*<div className="modal modal_type-3 modal-settings modal-settings-email modal-w-inputs" data-popup="settingsEmail">
      <div className="modal__inner">
        <div className="modal__wrap">
          <div className="modal__close modal-close">
            <svg>
              <use xlinkHref="./images/sprites.svg#close"></use>
            </svg>
          </div>
          <div className="modal__content">
            <h2 className="h2 mb_28">E-mail</h2>
            <form className="form-change-email" data-setting="email">
              <fieldset className="fieldset fieldset_gap-16">
                <field className="field">
                  <div className="input-text filled">
                    <div className="input-text__placeholder">E-mail</div>
                    <input className="input-text__input validate-field" type="email" name="email" inputmode="email" value="vv@mworx.ru"/>
                  </div>
                  <div className="field__error"></div>
                </field>
              </fieldset>
              <button className="button save-settings">Сохранить изменения</button>
            </form>
          </div>
        </div>
      </div>
    </div>*/
    <div className="modal__content">
      <h2 className="h2 mb_28">E-mail</h2>
      <form onSubmit={handleSubmit((data) => {
        setData(data);
        onClose();
      })} className="form-change-email" data-setting="email">
        <fieldset className="fieldset fieldset_gap-16">
          <Input
            value={watch('email')}
            placeholder="E-mail"
            error={formState.errors.email?.message}
            {...register("email", {required: 'Введите E-mail'})}
          />
        </fieldset>
        <button type="submit" className="button save-settings">Сохранить изменения</button>
      </form>
    </div>
  )
}
export default ModalSettingsEmail