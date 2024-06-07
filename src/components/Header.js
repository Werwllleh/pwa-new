import Icon from "@components/Icon";
import {Link} from "react-router-dom";
const Header = ({isAuth = false}) => {
  return (
    <header className="header">
      <div className="header__flex container">
        {isAuth && (
          <div className="header__logo"></div>
        )}
        <div className="header__actions">
          {isAuth && (
            <>
              <Link className="header__call" to="/call">
                <Icon name="phone" />
              </Link>
              <Link className="header__notifications" to="/notifications">
                <Icon name="notifications" />
                <span>15</span>
              </Link>
            </>
          )}
          {!isAuth && (
            <span className="header__call" data-popup="callsAccess">
							<Icon name="phone" />
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;