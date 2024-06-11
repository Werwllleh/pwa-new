import {useNavigate} from "react-router-dom";
import ScreenPin from "../components/screens/ScreenPin";
import LayoutAuth from "../components/layouts/LayoutAuth";
const PageLogin = () => {
  const navigate = useNavigate();

  return (
      <LayoutAuth>
          <ScreenPin
              mode="enter"
              toPrevStep={() => navigate('/')}
              toNextStep={() => navigate('/main')}
          />
      </LayoutAuth>
  )
}
export default PageLogin