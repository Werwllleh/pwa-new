import {useEffect, useState} from "react";
import cn from "classnames";

const LayoutAuth = ({children}) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(()=>{
    setLoaded(true)
  }, [])
  return (
    <div className={cn('page-loading-animation', {'on':loaded})}>
      <div className="auth">
        {children}
      </div>
    </div>
  );
}

export default LayoutAuth;