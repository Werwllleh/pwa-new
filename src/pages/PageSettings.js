import LayoutWithTopBlock from "@components/layouts/LayoutWithTopBlock";
import Icon from "@components/Icon";
import {useUserStore} from "../store/user-store";
import Switch from "../components/buttons/switch";
import LayoutSettingsModal from "../components/layouts/LayoutSettingsModal";
import ModalSettingsName from "../components/modals/ModalSettingsName";
import {useState} from "react";
import ModalSettingsBirthday from "../components/modals/ModalSettingsBirthday";
import ModalSettingsCity from "../components/modals/ModalSettingsCity";
import ModalSettingsPhone from "../components/modals/ModalSettingsPhone";
import ModalSettingsEmail from "../components/modals/ModalSettingsEmail";
import ModalSettingsPassword from "../components/modals/ModalSettingsPassword";

const PageSettings = () => {

  const user = useUserStore((state) => state);

  const {phoneNumber, firstName, secondName, lastName, birthDate, email, city, code} = user;

  const [settingNameActive, setSettingNameActive] = useState(false);
  const [settingBirthdayActive, setSettingBirthdayActive] = useState(false);
  const [settingCityActive, setSettingCityActive] = useState(false);
  const [settingPhoneActive, setSettingPhoneActive] = useState(false);
  const [settingEmailActive, setSettingEmailActive] = useState(false);
  const [settingPasswordActive, setSettingPasswordActive] = useState(false);

  const closeModals = () => {
    setSettingNameActive(false);
    setSettingBirthdayActive(false)
    setSettingCityActive(false)
    setSettingPhoneActive(false)
    setSettingEmailActive(false)
    setSettingPasswordActive(false)
  }

  return (
    <>
      <LayoutWithTopBlock isTopBlockFixed={true}>
        {user && (
          <div className="main settings bg_2">
            <div className="sections container container_16">
              <section className="section">
                <div className="settings__avatar"><img src="/assets/images/avatar.svg" alt=""/>
                  <div className="settings__add-photo">
                    <Icon name="camera"/>
                    <input type="file" name="avatar" accept="image/jpeg, image/png"/>
                  </div>
                </div>
                <div className="settings-list container container_16">
                  <div onClick={() => setSettingNameActive(true)} className="setting" data-popup="settingsName">
                    <div className="setting__info">
                      <div className="setting__name">ФИО</div>
                      <div className="setting__value" data-setting="user-name">
                        {`${secondName} ${firstName} ${lastName}`}
                      </div>
                    </div>
                    <span className="setting__arrow">
                      <Icon name="angle-right"/>
                    </span>
                  </div>
                  <div onClick={() => setSettingBirthdayActive(true)} className="setting" data-popup="settingsBirthday">
                    <div className="setting__info">
                      <div className="setting__name">Дата рождения</div>
                      <div className="setting__value" data-setting="birthday">{birthDate}</div>
                    </div>
                    <span className="setting__arrow">
                                  <Icon name="angle-right"/>
                              </span>
                  </div>
                  <div onClick={() => setSettingCityActive(true)} className="setting" data-popup="settingsCity">
                    <div className="setting__info">
                      <div className="setting__name">Город по прописке</div>
                      <div className="setting__value" data-setting="city">{city}</div>
                    </div>
                    <span className="setting__arrow">
                  <Icon name="angle-right"/>
                </span>
                  </div>
                  <div onClick={() => setSettingPhoneActive(true)} className="setting" data-popup="settingsPhone">
                    <div className="setting__info">
                      <div className="setting__name">Номер телефона</div>
                      <div className="setting__value"
                           data-setting="phone">{phoneNumber?.replace(/(\+7)(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")}</div>
                    </div>
                    <span className="setting__arrow">
                                  <Icon name="angle-right"/>
                              </span>
                  </div>
                  <div onClick={() => setSettingEmailActive(true)} className="setting" data-popup="settingsEmail">
                    <div className="setting__info">
                      <div className="setting__name">e-mail</div>
                      <div className="setting__value" data-setting="email">{email}</div>
                    </div>
                    <span className="setting__arrow">
                                  <Icon name="angle-right"/>
                              </span>
                  </div>
                </div>
              </section>
              <section className="section">
                <div className="settings-list container container_16">
                  <div className="setting" data-setting="push-notifications">
                    <div className="setting__info">Пуш-уведомления</div>
                    <div className="setting__switch">
                      <Switch/>
                    </div>
                  </div>
                </div>
              </section>
              <section className="section">
                <div className="settings-list container container_16">
                  <div onClick={() => setSettingPasswordActive(true)} className="setting" data-popup="settingsPassword">
                    <div className="setting__info">Изменить пароль</div>
                    <span className="setting__arrow"><Icon name="angle-right"/></span>
                  </div>
                  <div className="setting">
                    <div className="setting__info">Вход по Face или Touch ID</div>
                    <div className="setting__switch">
                      <Switch/>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </LayoutWithTopBlock>
      <LayoutSettingsModal
        className={"modal_type-3 modal-settings modal-settings-name modal-w-inputs"}
        onClose={closeModals}
        closeButton={true}
        active={settingNameActive}
      >
        <ModalSettingsName firstName={firstName} secondName={secondName} lastName={lastName} onClose={closeModals}/>
      </LayoutSettingsModal>
      <LayoutSettingsModal
        className={"modal_type-3 modal-settings modal-settings-birthday modal-w-inputs"}
        onClose={closeModals}
        closeButton={true}
        active={settingBirthdayActive}
      >
        <ModalSettingsBirthday birthDate={birthDate} onClose={closeModals}/>
      </LayoutSettingsModal>
      <LayoutSettingsModal
        className={"modal_type-3 modal-settings modal-settings-city modal-w-inputs"}
        onClose={closeModals}
        closeButton={true}
        active={settingCityActive}
      >
        <ModalSettingsCity city={city} onClose={closeModals}/>
      </LayoutSettingsModal>
      <LayoutSettingsModal
        className={"modal_type-2 modal-settings modal-settings-phone"}
        onClose={closeModals}
        closeButton={true}
        active={settingPhoneActive}
      >
        <ModalSettingsPhone code={code} onClose={closeModals}/>
      </LayoutSettingsModal>
      <LayoutSettingsModal
        className={"modal_type-3 modal-settings modal-settings-email modal-w-inputs"}
        onClose={closeModals}
        closeButton={true}
        active={settingEmailActive}
      >
        <ModalSettingsEmail email={email} onClose={closeModals}/>
      </LayoutSettingsModal>
      <LayoutSettingsModal
        className={"modal_type-2 modal-settings modal-settings-password"}
        onClose={closeModals}
        closeButton={true}
        active={settingPasswordActive}
      >
        <ModalSettingsPassword code={code} onClose={closeModals}/>
      </LayoutSettingsModal>
    </>
  );
}

export default PageSettings;
