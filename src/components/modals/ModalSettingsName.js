import {useForm} from "react-hook-form";
import {useState} from "react";
import Input from "../Input";
import {useUserStore} from "../../store/user-store";

const ModalSettingsName = ({firstName, secondName, lastName, onClose}) => {

  const [setData] = useUserStore((state) => [state.setData])

  const {register, formState, handleSubmit, watch} = useForm({
    defaultValues: {
      firstName: firstName,
      secondName: secondName,
      lastName: lastName
    }
  });


  return (
    /*<div className="modal modal_type-3 modal-settings modal-settings-name modal-w-inputs" data-popup="settingsName">
      <div className="modal__inner">
        <div className="modal__wrap">
          <div className="modal__close modal-close">
            <svg>
              <use xlinkHref="./images/sprites.svg#close"></use>
            </svg>
          </div>
          <div className="modal__content">
            <h2 className="h2 mb_28">Имя</h2>
            <form className="form-change-name" data-setting="user-name">
              <fieldset className="fieldset fieldset_gap-16">
                <field className="field">
                  <div className="input-text filled">
                    <div className="input-text__placeholder">Фамилия</div>
                    <input className="input-text__input validate-field" type="text" name="name" value="Васильев"/>
                  </div>
                  <div className="field__error"></div>
                </field>
                <field className="field">
                  <div className="input-text filled">
                    <div className="input-text__placeholder">Имя</div>
                    <input className="input-text__input validate-field" type="text" name="surname" value="Владимир"/>
                  </div>
                  <div className="field__error"></div>
                </field>
                <field className="field">
                  <div className="input-text filled">
                    <div className="input-text__placeholder">Отчество</div>
                    <input className="input-text__input validate-field" type="text" name="secondname" value="Серафимович"/>
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
      <h2 className="h2 mb_28">Имя</h2>
      <form onSubmit={handleSubmit((data) => {
        setData(data);
        onClose();
      })}
            className="form-change-name" data-setting="user-name">
        <fieldset className="fieldset fieldset_gap-16">
          <Input
            value={watch('secondName')}
            placeholder="Фамилия"
            error={formState.errors.secondName?.message}
            {...register("secondName", {
              required: 'Введите фамилию',
              minLength: {value: 2, message: 'Минимум 2 символа'}
            })}
          />
          <Input
            value={watch('firstName')}
            placeholder="Имя"
            error={formState.errors.firstName?.message}
            {...register("firstName", {required: 'Введите имя', minLength: {value: 2, message: 'Минимум 2 символа'}})}
          />
          <Input
            value={watch('lastName')}
            placeholder="Отчество"
            error={formState.errors.lastName?.message}
            {...register("lastName", {
              required: 'Введите отчество',
              minLength: {value: 2, message: 'Минимум 2 символа'}
            })}
          />
        </fieldset>
        <button type="submit" className="button save-settings">Сохранить изменения</button>
      </form>
    </div>
  )
}

export default ModalSettingsName