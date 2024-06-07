import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LayoutBase from "@components/layouts/LayoutBase";
import PageMain from "@pages/PageMain";
import PageAuthorization from "@pages/PageAuthorization";
import PageNotifications from "@pages/PageNotifications";
import PageCall from "@pages/PageCall";
import PageChat from "@pages/PageChat";
import PageMainAuth from "@pages/PageMainAuth";
import PageAuthorizationNewPassword from "@pages/PageAuthorizationNewPassword";
import PageRegistration from "@pages/PageRegistration";
import PageSettings from "@pages/PageSettings";
import {useUserStore} from "./store/user-store2";
import {use100vh} from 'react-div-100vh'



function App() {
  const height = use100vh()

  const user = useUserStore((state) => state.currentUser)
  const getUser = useUserStore((state) => state.getUser);


  useEffect(() => {
    getUser()
  }, [getUser]);

  return (
    <>
      <div style={{'--vh': height + 'px'}}>
        <LayoutBase>
          <Router>
            <Routes>
              <Route index element={<PageMain/>}/>
              <Route path='/index-auth' element={<PageMainAuth/>}/>
              <Route path='/authorization' element={<PageAuthorization/>}/>
              <Route path='/authorization-new-password' element={<PageAuthorizationNewPassword/>}/>
              <Route path='/notifications' element={<PageNotifications/>}/>
              <Route path='/call' element={<PageCall/>}/>
              <Route path='/chat' element={<PageChat/>}/>
              <Route path='/registration' element={<PageRegistration/>}/>
              <Route path='/settings' element={<PageSettings/>}/>
            </Routes>
          </Router>
        </LayoutBase>
      </div>
      <svg className="mask-svg" width="0" height="0" fill="#0171DD" xmlns="http://www.w3.org/2000/svg">
        <clipPath id="mask">
          <path
            d="M54.5436 25.887V28.5749C49.0016 28.5761 44.6189 28.6889 41.1639 29.2294C37.6899 29.7729 35.1429 30.7504 33.2957 32.4916C31.4481 34.2332 30.312 36.728 29.6369 40.2821C28.9652 43.8177 28.7479 48.4112 28.7458 54.3727H26.0579C26.0558 48.4112 25.8385 43.8177 25.1669 40.2821C24.4917 36.728 23.3556 34.2332 21.508 32.4916C19.6608 30.7504 17.1138 29.7729 13.6398 29.2294C10.1849 28.6889 5.80213 28.5761 0.260092 28.5749V25.887C5.8578 25.886 10.2685 25.7889 13.7339 25.2681C17.2182 24.7444 19.7586 23.7907 21.5921 22.065C23.426 20.3389 24.5409 17.8515 25.1985 14.2858C25.8527 10.7385 26.056 6.11344 26.0579 0.0891934H28.7458C28.7478 6.11294 28.9509 10.7377 29.6049 14.285C30.2623 17.8505 31.3771 20.338 33.2108 22.0642C35.0442 23.7901 37.5846 24.7439 41.069 25.2678C44.5344 25.7888 48.9454 25.886 54.5436 25.887Z"
            fill="white" stroke="white" strokeWidth="0.178387"></path>
        </clipPath>
      </svg>
    </>
  );
}

export default App;
