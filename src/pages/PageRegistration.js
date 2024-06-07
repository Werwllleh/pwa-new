import {useState} from "react";
import RegisterStep1 from "../components/RegisterStep1";
import RegisterStep2 from "../components/RegisterStep2";
import RegisterStep3 from "../components/RegisterStep3";
import RegisterStep4 from "../components/RegisterStep4";
import LayoutAuth from "../components/layouts/LayoutAuth";

const PageRegistration = () => {
  const [step, setStep] = useState(1);
  return (
    <LayoutAuth>
      <div className="auth__progressbar progressbar">
        <div className="progressbar__progress" style={{width: `${step * 20}%`}}></div>
      </div>
      {step === 1 && <RegisterStep1 setStep={setStep}/>}
      {step === 2 && <RegisterStep2 setStep={setStep}/>}
      {step === 3 && <RegisterStep3 setStep={setStep}/>}
      {step === 4 && <RegisterStep4 setStep={setStep}/>}
    </LayoutAuth>
  )
}
export default PageRegistration