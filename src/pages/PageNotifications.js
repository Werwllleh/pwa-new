import LayoutWithTopBlock from "../components/layouts/LayoutWithTopBlock";

const PageNotifications = () => {
    return (
      <LayoutWithTopBlock isTopBlockFixed={false}>
        <div className="main bg_2">
          <div className="container pb_152">
            <section className="notifications-section">
              <div className="notifications-section__title">Непрочитанные</div>
              <div className="notifications">
                <div className="notification">
                  <div className="notification__title">Заголовок уведомления</div>
                  <div className="notification__status-new"></div>
                  <div className="notification__text">Текст уведомления дублирует текст из пуш-уведомлений. В
                    неразвернутых пушах без картинок, умещается 170 символов на iOS и 256 символов на Android. 4 и 7
                    строк соответственно.
                  </div>
                  <div className="notification__date">29 марта</div>
                </div>
                <div className="notification">
                  <div className="notification__title">Заголовок уведомления</div>
                  <div className="notification__status-new"></div>
                  <div className="notification__text">Текст уведомления дублирует текст из пуш-уведомлений. В
                    неразвернутых пушах без картинок, умещается 170 символов на iOS и 256 символов на Android. 4 и 7
                    строк соответственно.
                  </div>
                  <div className="notification__date">29 марта</div>
                </div>
              </div>
            </section>
            <section className="notifications-section">
              <div className="notifications-section__title">Все уведомления</div>
              <div className="notifications">
                <div className="notification">
                  <div className="notification__title">Заголовок уведомления</div>
                  <div className="notification__text">Текст уведомления дублирует текст из пуш-уведомлений. В
                    неразвернутых пушах без картинок, умещается 170 символов на iOS и 256 символов на Android. 4 и 7
                    строк соответственно.
                  </div>
                  <div className="notification__date">29 марта</div>
                </div>
                <div className="notification">
                  <div className="notification__title">Заголовок уведомления</div>
                  <div className="notification__text">Текст уведомления дублирует текст из пуш-уведомлений. В
                    неразвернутых пушах без картинок, умещается 170 символов на iOS и 256 символов на Android. 4 и 7
                    строк соответственно.
                  </div>
                  <div className="notification__date">29 марта</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </LayoutWithTopBlock>
    );
}

export default PageNotifications;