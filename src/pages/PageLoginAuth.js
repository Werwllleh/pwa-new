import {useState} from "react";
import {AnimatePresence} from 'framer-motion';
import {motion} from 'framer-motion';

import ScreenPhone from "../components/screens/ScreenPhone";
import ScreenPin from "../components/screens/ScreenPin";
import LayoutAuth from "../components/layouts/LayoutAuth";
import {useNavigate} from "react-router-dom";
import {useUserStore} from "../store/user-store";
import ScreenCode from "../components/screens/ScreenCode";
import ScreenData from "../components/screens/ScreenData";
import StepWrapper from "../components/StepWrapper";

const PageLoginAuth = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  return (
      <LayoutAuth>
        <div className="auth__progressbar progressbar">
          <div className="progressbar__progress" style={{width: `${step * 20}%`}}></div>
        </div>
        <AnimatePresence mode="wait" initial="false">

          {/* ------------------ Step 1  ------------------ */}
          {step === 1 && (
              <StepWrapper stepKey="ScreenPhone">
                <ScreenPhone
                    mode={'verifyStart'}
                    toPrevStep={() => navigate('/')}
                    toNextStep={() => setStep(2)}
                />
              </StepWrapper>
          )}

          {/* ------------------ Step 2 ------------------ */}
          {step === 2 && (
              <StepWrapper stepKey="ScreenCode">
                <ScreenCode
                    toPrevStep={() => setStep(1)}
                    toNextStep={() => setStep(3)}
                />
              </StepWrapper>
          )}

            {/* ------------------ Step 3 ------------------ */}
            {step === 3 && (
                <StepWrapper stepKey="ScreenPin">
                    <ScreenPin
                        mode="create"
                        toPrevStep={() => setStep(2)}
                        toNextStep={() => setStep(4)}
                    />
                </StepWrapper>
            )}

            {/* ------------------ Step 4 ------------------ */}
            {step === 4 && (
                <StepWrapper stepKey="ScreenPin">
                    <ScreenPin
                        mode="repeat"
                        toPrevStep={() => setStep(3)}
                        toNextStep={() => navigate('/main')}
                    />
                </StepWrapper>
            )}
        </AnimatePresence>
      </LayoutAuth>
  )
}
export default PageLoginAuth