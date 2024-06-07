import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useUserStore} from "../../store/user-store2";
import Input from "../Input";

const ModalSettingsCity = ({city, onClose}) => {

  const [setData] = useUserStore((state) => [state.setData])

  const {register, formState, handleSubmit, watch} = useForm({
    defaultValues: {
      city: city,
    }
  });


  return (
    /*<div className="modal modal_type-3 modal-settings modal-settings-city modal-w-inputs" data-popup="settingsCity">
      <div className="modal__inner">
        <div className="modal__wrap">
          <div className="modal__close modal-close">
            <svg>
              <use xlinkHref="./images/sprites.svg#close"></use>
            </svg>
          </div>
          <div className="modal__content">
            <h2 className="h2 mb_28">Город по прописке</h2>
            <form className="form-change-email" data-setting="city">
              <fieldset className="fieldset fieldset_gap-16">
                <field className="field">
                  <div className="input-text filled">
                    <div className="input-text__placeholder">Город по прописке</div>
                    <input className="input-text__input validate-field mask-city" type="text" name="userCity" value="Чебоксары"/>
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
      <h2 className="h2 mb_28">Город по прописке</h2>
      <form onSubmit={handleSubmit((data) => {
        setData(data);
        onClose();
      })} className="form-change-email" data-setting="city">
        <fieldset className="fieldset fieldset_gap-16">
          <Input
            value={watch('city')}
            placeholder="Город"
            error={formState.errors.city?.message}
            {...register("city", {required: 'Введите город'})}
          />
        </fieldset>
        <button type="submit" className="button save-settings">Сохранить изменения</button>
      </form>
    </div>
  )
}
export default ModalSettingsCity