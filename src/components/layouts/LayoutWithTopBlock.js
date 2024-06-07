import TopBlock from "@components/TopBlock";
import {useEffect, useState} from "react";
import cn from 'classnames'

const LayoutWithTopBlock = ({isTopBlockFixed, children}) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(()=>{
    setLoaded(true)
  }, [])

  return (
    <div className={cn('page-loading-animation', {'on':loaded})}>
      <TopBlock isFixed={isTopBlockFixed}/>
      {children}
    </div>
  );
}

export default LayoutWithTopBlock;