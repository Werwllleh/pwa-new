import {useForm} from "react-hook-form";
import {useUserStore} from "../../store/user-store2";
import MaskedInput from "../MaskedInput";

const ModalSettingsBirthday = ({birthDate, onClose}) => {

  const [setData] = useUserStore((state) => [state.setData])

  const {register, formState, handleSubmit, watch} = useForm({
    defaultValues: {
      birthDate: birthDate,
    }
  });


  return (
    /*<div className="modal modal_type-3 modal-settings modal-settings-birthday modal-w-inputs" data-popup="settingsbirthday">
      <div className="modal__inner">
        <div className="modal__wrap">
          <div className="modal__close modal-close">
            <Icon name="close" />
          </div>
          <div className="modal__content">
            <h2 className="h2 mb_28">Дата рождения</h2>
            <form className="form-change-email" data-setting="birthday">
              <fieldset className="fieldset fieldset_gap-16">
                <field className="field">
                  <div className="input-text filled">
                    <div className="input-text__placeholder">Дата рождения</div>
                    <input className="input-text__input mask-date validate-field" type="input" name="birthday" value="26.03.1996"/>
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
      <h2 className="h2 mb_28">Дата рождения</h2>
      <form onSubmit={handleSubmit((data) => {
        setData(data);
        onClose();
      })} className="form-change-email" data-setting="birthday">
        <fieldset className="fieldset fieldset_gap-16">
          <MaskedInput
            value={watch('birthDate')}
            labelText="Дата рождения"
            mask={Date}
            error={formState.errors.birthDate?.message}
            {...register("birthDate", {required: "Введите дату рождения"})}
          />
        </fieldset>
        <button type="submit" className="button save-settings">Сохранить изменения</button>
      </form>
    </div>
  )
}

export default ModalSettingsBirthday