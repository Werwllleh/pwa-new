import Icon from "../components/Icon";
import {Link} from "react-router-dom";

const PageCall = () => {
    return (
      <div className="page-loading-animation">
          <div className="call bg_3">
              <div className="call__info container">
                  <div className="call__status">Соединение...</div>
                  <div className="call__name">Горячая линия «Микрохирургия глаза»</div>
              </div>
              <div className="call__actions container">
                  <div className="call__action toggle-active">
                      <Icon name="mic-off"/>
                  </div>
                  <Link className="call__action call__action_reset" to="/index-auth">
                      <Icon name="phone"/>
                  </Link>
                  <div className="call__action toggle-active">
                      <Icon name="speakers"/>
                  </div>
              </div>
          </div>
      </div>
    );
}

export default PageCall;