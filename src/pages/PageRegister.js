import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {AnimatePresence, motion} from 'framer-motion';

import LayoutAuth from "../components/layouts/LayoutAuth";
import ScreenPhone from "../components/screens/ScreenPhone";
import ScreenCode from "../components/screens/ScreenCode";
import ScreenData from "../components/screens/ScreenData";
import ScreenPin from "../components/screens/ScreenPin";
import StepWrapper from "../components/StepWrapper";

const PageRegister = () => {
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
          <StepWrapper stepKey="ScreenData">
            <ScreenData
              toPrevStep={() => setStep(2)}
              toNextStep={() => setStep(4)}
            />
          </StepWrapper>
        )}

        {/* ------------------ Step 4 ------------------ */}
        {step === 4 && (
          <StepWrapper stepKey="ScreenPin">
            <ScreenPin
              mode="create"
              toPrevStep={() => setStep(3)}
              toNextStep={() => setStep(5)}
            />
          </StepWrapper>
        )}

        {/* ------------------ Step 5 ------------------ */}
        {step === 5 && (
          <StepWrapper stepKey="ScreenPin">
            <ScreenPin
              mode="repeat"
              toPrevStep={() => setStep(4)}
              toNextStep={() => navigate('/main')}
            />
          </StepWrapper>
        )}
      </AnimatePresence>
    </LayoutAuth>
  )
}
export default PageRegister